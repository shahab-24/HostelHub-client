import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const Checkout = () => {
  const { state } = useLocation(); // Get the state passed from the Membership page
  const { packageDetails } = state || {};

  if (!packageDetails) {
    return <div>Package details not found.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10 px-4 sm:px-6 md:px-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        {/* Title with Framer Motion and Typewriter.js */}
        <motion.h2
          className="text-3xl font-semibold text-center text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typewriter
            options={{
              strings: [`${packageDetails?.name} Package`],
              autoStart: true,
              loop: false,
              delay: 100, // Controls typing speed
            }}
          />
        </motion.h2>

        {/* Price and benefits section */}
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700">
            Price: <span className="text-2xl text-blue-600">${packageDetails?.price}</span>/month
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-gray-800">Benefits:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {packageDetails?.benefits?.map((benefit, index) => (
              <li key={index} className="text-lg">{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <motion.button
            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Proceed to Payment
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
