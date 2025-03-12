import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
        const [error, setError] = useState("")
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message)
    } else {
      console.log("payment method", paymentMethod);
      setError('')
    }
  };
  return (
    <div className="my-20 flex justify-center items-center border-orange-400 border-2 w-1/2">
      <form onSubmit={handleSubmit}>
        <CardElement
          className="w-[500px] py-2 my-2 border-blue-400 border-2 "
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
          className="bg-green-400 w-full text-white px-4 py-2 rounded-md font-semibold"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
        <p className="text-red-400">{error}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
