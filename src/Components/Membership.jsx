import { useNavigate } from "react-router-dom";
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
      return Array.isArray(response.data) ? response.data : [];
    },
  });

  // Handle redirect to checkout page with package data
  const handleRedirect = (pkg) => {
    navigate("/checkout", { state: { packageDetails: pkg } });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Failed to load packages. Please try again later.</div>;
  }

  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
        Upgrade to Premium Membership
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 md:px-10">
        {Array.isArray(packages) &&
          packages.map((pkg, index) => (
            <motion.div
              key={pkg._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="rounded-lg shadow-xl p-6 flex flex-col justify-between bg-white hover:bg-blue-50 transition duration-300 transform hover:scale-105"
            >
              <div className="text-center">
                {/* Image Section */}
                <img
                  src={pkg?.image || "/images/default-package.jpg"} // Default image if no image is provided
                  alt={pkg?.name || "Package Image"}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  {pkg?.name || "Unknown Package"}
                </h3>
                <p className="text-3xl font-semibold text-gray-800 mb-6">
                  ${pkg?.price?.toFixed(2) || "0.00"}/month
                </p>
                <ul className="text-gray-600 mb-6 list-disc list-inside">
                  {pkg?.benefits?.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <button
                className="mt-4 py-2 px-8 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition ease-in-out duration-300 transform hover:scale-105"
                onClick={() => handleRedirect(pkg)}
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
