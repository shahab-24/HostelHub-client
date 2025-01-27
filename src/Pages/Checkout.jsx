import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe("your-publishable-key-from-stripe"); // Replace with your Stripe public key

const Checkout = () => {
  const { packageName } = useParams(); // Dynamic route param
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // Fetch package details
  const { data: packageDetails, isLoading } = useQuery({
    queryKey: ["package", packageName],
    queryFn: async () => {
      const response = await axiosSecure.get(`/api/packages/${packageName}`);
      return response.data;
    },
  });

  // Create a payment intent when the component mounts
  useEffect(() => {
    if (packageDetails?.price > 0) {
      axiosSecure
        .post("/api/payment-intent", { amount: packageDetails.price * 100 }) // Price in cents
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((error) => console.error("Failed to create payment intent:", error));
    }
  }, [packageDetails, axiosSecure]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      toast.error("Please enter valid card details.");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: "User Name", // Replace with dynamic user data
        },
      },
    });

    if (error) {
      console.error("Payment error:", error.message);
      toast.error("Payment failed. Please try again.");
    } else if (paymentIntent?.status === "succeeded") {
      // Save payment details to the DB
      axiosSecure
        .post("/api/save-payment", {
          packageName: packageDetails.name,
          price: packageDetails.price,
          transactionId: paymentIntent.id,
        })
        .then(() => {
          toast.success("Payment successful!");
          navigate("/membership"); // Redirect to the membership page
        })
        .catch((err) => {
          console.error("Error saving payment:", err);
          toast.error("Failed to save payment details.");
        });
    }
  };

  if (isLoading) {
    return <div>Loading package details...</div>;
  }

  return (
    <section className="py-10 px-4 bg-gray-50 min-h-screen flex justify-center items-center">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Checkout for {packageDetails.name} Package
        </h2>
        <p className="text-center text-gray-700 mb-4">
          Price: <span className="font-semibold">${packageDetails.price.toFixed(2)}</span>
        </p>
        <p className="text-center text-gray-500 mb-6">
          Benefits:
          <ul className="list-disc list-inside">
            {packageDetails.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </p>

        <Elements stripe={stripePromise}>
          <form onSubmit={handlePayment} className="space-y-4">
            <CardElement
              className="p-4 border rounded-lg"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              type="submit"
              disabled={!stripe || !clientSecret}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Pay ${packageDetails.price.toFixed(2)}
            </button>
          </form>
        </Elements>
      </motion.div>
    </section>
  );
};

export default Checkout;
