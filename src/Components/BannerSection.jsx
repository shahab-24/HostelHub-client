import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import Loader from "./Shared/Loader";


const BannerSection = () => {
        const {loading, setLoading} = useAuth()
  const axiosPublic = useAxiosPublic();
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
        setLoading(true)
    axiosPublic
      .get("/api/meals")
      .then((response) => {
        setBanners(response.data?.meals || [],
        setLoading(false))})
      .catch((error) => console.error("Error fetching banner data:", error));
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [banners]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target?.search?.value;
    navigate(`/search?query=${query}`);
  };

  if(loading) return <Loader></Loader>

  return (
    <div className="relative w-full h-[90vh] text-white overflow-hidden pt-16">
      <AnimatePresence mode="popLayout">
        {banners.length > 0 && (
          <motion.div
            key={banners[currentIndex]?.id || currentIndex}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-cover bg-center shadow-lg"
            style={{ backgroundImage: `url(${banners[currentIndex]?.image})` }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/20"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl">
              {/* Title */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-wide bg-gradient-to-r from-indigo-600 to-teal-500 text-transparent bg-clip-text drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                {banners[currentIndex]?.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 tracking-wide drop-shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              >
                {banners[currentIndex]?.description}
              </motion.p>

              {/* Search Bar */}
              <motion.form
                onSubmit={handleSearch}
                className="flex justify-center items-center w-full max-w-xl mx-auto gap-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search for meals, categories..."
                  className="w-3/4 py-2 px-4 rounded-l-lg focus:outline-none text-gray-900 shadow-md"
                />
                <motion.button
                  type="submit"
                  className="py-2 px-6 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-r-lg shadow-lg transition-all duration-300 hover:opacity-90 hover:shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Search
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BannerSection;
