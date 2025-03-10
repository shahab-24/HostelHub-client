import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const FeaturedHostels = () => {
  // Fetching data using React Query
  const { data: hostels = [], isLoading } = useQuery({
    queryKey: ["hostels"],
    queryFn: async () => {
      const res = await axios.get("/featuredHostels.json");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  console.log(hostels)

  if (isLoading) return <p className="text-center">Loading hostels...</p>;

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">🏠 Featured Hostels</h2>
        <p className="text-gray-600 mt-2">Discover our top-rated hostels</p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {hostels?.map((hostel) => (
          <motion.div
            key={hostel._id}
            className="bg-white p-4 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={hostel.image} 
              alt={hostel.name} 
              className="w-full h-40 object-cover rounded-lg" 
            />
            <h3 className="text-xl font-semibold mt-3">{hostel.name}</h3>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <FaMapMarkerAlt className="text-red-500" /> {hostel.location}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-green-600 font-semibold">${hostel.price}/month</span>
              <span className="flex items-center gap-1 text-yellow-500">
                <FaStar /> {hostel.rating}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedHostels;
