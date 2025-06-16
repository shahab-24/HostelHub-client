import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const CheckoutForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { state } = useLocation();
  const { packageDetails } = state || {};

  useEffect(() => {
    if (packageDetails?.price) {
      axiosSecure
        .post("/api/payment-intent", { price: packageDetails?.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, packageDetails?.price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "unknown",
          },
        },
      });

    if (confirmError) {
      console.error("Payment intent error", confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user?.email,
          id: packageDetails?._id,
          transactionId: paymentIntent?.id,
          price: parseFloat(packageDetails?.price),
          date: new Date(),
          badge: packageDetails?.name,
        };

        const res = await axiosSecure.post("/api/save-payment", payment);
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 dark:bg-gray-900 px-4 w-full">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg p-6 bg-white dark:bg-base-300 shadow-xl rounded-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Checkout
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          <span className="font-semibold">Total Fee:</span> ${packageDetails?.price || 0}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-base-100 dark:bg-gray-700 text-gray-700 rounded-md border border-blue-300 dark:border-blue-500">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#ffffff",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: {
                    color: "#fa755a",
                  },
                },
              }}
            />
          </div>

          <button
            className="btn-primary btn-success w-full text-white disabled:opacity-50"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay Now
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        {transactionId && (
          <p className="mt-4 text-green-600 dark:text-green-400 text-center font-medium">
            ✅ Transaction ID: {transactionId}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default CheckoutForm;
