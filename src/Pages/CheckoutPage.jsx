
import { useParams, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

const CheckoutPage = () => {
  const { packageName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const packageDetails = {
    silver: { name: 'Silver', price: 9.99, benefits: ['Access to Breakfast', '5% Discount on Meals'] },
    gold: { name: 'Gold', price: 19.99, benefits: ['Access to All Meals', '10% Discount on Meals', 'Priority Support'] },
    platinum: { name: 'Platinum', price: 29.99, benefits: ['Access to All Meals', '20% Discount on Meals', 'Priority Support', 'Exclusive Meal Deals'] },
  };

  const selectedPackage = packageDetails[packageName.toLowerCase()];

  if (!selectedPackage) {
    return <div className="text-center text-red-500">Invalid Package</div>;
  }

  const handleToken = async (token) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/payment', { token, packageName });
      if (response.status === 200) {
        toast.success('Payment successful!');
        navigate('/dashboard');
      }
    } catch (error) {
        console.log(error)
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">Checkout - {selectedPackage.name} Package</h2>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <ul className="mb-6">
          {selectedPackage.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-700 mb-2">- {benefit}</li>
          ))}
        </ul>
        <p className="text-lg font-semibold mb-6">Price: ${selectedPackage.price}</p>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={handleToken}
          amount={selectedPackage.price * 100}
          name={`Purchase ${selectedPackage.name} Package`}
          currency="USD"
        >
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </StripeCheckout>
      </div>
    </div>
  );
};

export default CheckoutPage;