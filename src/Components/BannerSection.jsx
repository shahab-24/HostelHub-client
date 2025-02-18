import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosPublic from "../hooks/useAxiosPublic";

const BannerSection = () => {
  const axiosPublic = useAxiosPublic();
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .get("/api/meals")
      .then((response) => setBanners(response.data.meals || []))
      .catch((error) => console.error("Error fetching banner data:", error));
  }, [axiosPublic]);

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setFirstLoad(false);
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    navigate(`/search?query=${query}`);
  };

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {banners.length > 0 && (
          <motion.div
            key={banners[currentIndex]?.id || currentIndex}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${banners[currentIndex]?.image})` }}
            initial={
              firstLoad
                ? { opacity: 0, rotateX: -90, scaleY: 0 }
                : { opacity: 0, rotateY: 90, scale: 0.8 }
            }
            animate={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl">
              {/* Title */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
              >
                {banners[currentIndex]?.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg sm:text-xl md:text-2xl mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {banners[currentIndex]?.description}
              </motion.p>

              {/* Search Bar */}
              <motion.form
                onSubmit={handleSearch}
                className="flex justify-center items-center w-full max-w-lg mx-auto gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search for meals, categories..."
                  className="w-3/4 py-2 px-4 rounded-l-lg focus:outline-none text-gray-800"
                />
                <motion.button
                  type="submit"
                  className="py-2 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg transition-all duration-300 hover:opacity-90"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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
