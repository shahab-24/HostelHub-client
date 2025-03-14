import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = () => {
        const {user} = useAuth()
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
//   const [packages, setPackages] = useState()
  const {state} = useLocation()
  const { packageDetails } = state || {};
  console.log(packageDetails.price)

  useEffect( () => {
    axiosSecure.post("/api/payment-intent",
        {price:packageDetails.price})
    .then(res =>{
        console.log(res.data.clientSecret)
setClientSecret(res.data.clientSecret)})
  }, [axiosSecure,packageDetails.price]);



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
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

//     confime payment ==================
const {error: confirmError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
                card: card,
                billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'unknown'
                }
        }
})
if(confirmError){
        console.log('error in payment intent', confirmError)
}else{
        console.log('paymenht intent', paymentIntent)
        if(paymentIntent.status === 'succeeded'){
                setTransactionId(paymentIntent.id)
        }
}
  };
  return (
    <div className="my-20 flex justify-center items-center border-orange-400 border-2 w-1/2">
    <div className="my-10">
    <p className="text-center">Total Fee: {packageDetails.price}</p>
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
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-400">{error}</p>
      </form>
      {transactionId && <p className="text-green-500">Your transactionId is: {transactionId}</p>}
    </div>
    </div>
  );
};

export default CheckoutForm;
