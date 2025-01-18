import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Membership = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      name: "Silver",
      price: "$9.99/month",
      features: ["Access to Breakfast", "5% Discount on Meals"],
      bgColor: "bg-gray-200",
      hoverColor: "hover:bg-gray-300",
    },
    {
      id: 2,
      name: "Gold",
      price: "$19.99/month",
      features: ["Access to All Meals", "10% Discount on Meals", "Priority Support"],
      bgColor: "bg-yellow-300",
      hoverColor: "hover:bg-yellow-400",
    },
    {
      id: 3,
      name: "Platinum",
      price: "$29.99/month",
      features: [
        "Access to All Meals",
        "20% Discount on Meals",
        "Priority Support",
        "Exclusive Meal Deals",
      ],
      bgColor: "bg-blue-300",
      hoverColor: "hover:bg-blue-400",
    },
  ];

  const handleRedirect = (packageName) => {
    navigate(`/checkout/${packageName.toLowerCase()}`);
  };

  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        Upgrade to Premium Membership
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between ${pkg.bgColor} ${pkg.hoverColor} transition duration-300`}
          >
            <div>
              <h3 className="text-xl font-bold text-center mb-4">{pkg.name}</h3>
              <p className="text-center text-2xl font-semibold text-gray-700 mb-6">
                {pkg.price}
              </p>
              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-gray-700 space-x-2"
                  >
                    <span className="text-green-500">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="mt-4 w-full py-2 px-4 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition"
              onClick={() => handleRedirect(pkg.name)}
            >
              Choose {pkg.name}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Membership;
