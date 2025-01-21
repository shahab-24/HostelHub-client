import axios from "axios";
import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const Checkout = ({ packageName, packagePrice }) => {
        const [paymentSuccess, setPaymentSuccess] = useState(false);
      
        const handleToken = async (token) => {
          try {
            const response = await axios.post("/api/payment", {
              token,
              packageName,
              packagePrice,
            });
      
            if (response.status === 200) {
              setPaymentSuccess(true);
              // Save to database or assign user badge logic here
              axios.post("/api/user/badge", { packageName });
            }
          } catch (error) {
            console.error("Payment failed", error);
          }
        };
      
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-center mb-4">{packageName} Package</h2>
              <p className="text-lg text-center mb-6">Price: ${packagePrice.toFixed(2)}</p>
              <StripeCheckout
                stripeKey="your_public_stripe_key"
                token={handleToken}
                amount={packagePrice * 100} // Amount in cents
                name={`${packageName} Package`}
                billingAddress
                shippingAddress
              >
                <button className="w-full py-2 px-4 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition">
                  Proceed to Payment
                </button>
              </StripeCheckout>
      
              {paymentSuccess && (
                <div className="mt-4 p-4 bg-green-100 border border-green-500 text-green-700 rounded">
                  Payment successful! Your {packageName} package is activated.
                </div>
              )}
            </div>
          </div>
        );
      };
      
      export default Checkout ;