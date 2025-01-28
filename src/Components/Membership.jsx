import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "./Shared/Loader";

const Membership = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch packages using react-query
  const { data: packages = [], isLoading, isError } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await axiosSecure.get("/api/packages");
      return response.data; // Assume the response data is an array
    },
  });

  // Handle redirect to checkout page with package data
  const handleRedirect = (pkg) => {
    navigate("/checkout", { state: { packageDetails: pkg } });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (isError) {
    return <div>Failed to load packages. Please try again later.</div>;
  }

  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        Upgrade to Premium Membership
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="rounded-lg shadow-lg p-6 flex flex-col justify-between bg-white hover:bg-gray-100 transition duration-300 border border-gray-200"
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-blue-600 mb-4">{pkg.name}</h3>
              <p className="text-2xl font-semibold text-gray-700 mb-6">
                ${pkg.price.toFixed(2)}/month
              </p>
              <ul className="text-gray-600 mb-6 list-disc list-inside">
                {pkg.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>

            <button
              className="mt-4 py-2 px-6 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition"
              onClick={() => handleRedirect(pkg)} // Pass the entire package data
            >
              Subscribe Now
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Membership;
