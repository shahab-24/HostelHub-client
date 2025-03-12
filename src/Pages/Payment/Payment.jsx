import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)
const Payment = () => {
        return (
                <div className="flex justify-center items-center gap-20 border-red-400 border-2">
                <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>
                </Elements>
                        
                </div>
        );
};

export default Payment;