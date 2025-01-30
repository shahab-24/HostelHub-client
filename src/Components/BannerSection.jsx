import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'animate.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useAxiosPublic from '../hooks/useAxiosPublic';

const BannerSection = () => {
        const axiosPublic = useAxiosPublic()
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic.get('/api/meals')
      .then(response => setBanners(response.data))
      .catch(error => console.error('Error fetching banner data:', error));
  }, [axiosPublic]);

//   console.log(banners.meals)
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    navigate(`/search?query=${query}`);
  };

  return (
    <div className="relative w-full h-screen text-white pt-20">
      {banners?.meals?.length > 0 && (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="w-full h-full"
        >
          {banners?.meals?.map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative flex items-center justify-center h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 text-center px-4 max-w-3xl">
                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate__animated animate__fadeIn"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    {banner.title}
                  </motion.h1>
                  <motion.p
                    className="text-lg sm:text-xl md:text-2xl mb-8 animate__animated animate__fadeIn animate__delay-1s"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    {banner.description}
                  </motion.p>
                  <form onSubmit={handleSearch} className="flex justify-center items-center">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search for meals, categories, or more..."
                      className="input input-bordered w-2/3 sm:w-3/4 md:w-1/2 max-w-lg py-2 px-4 rounded-l-lg focus:outline-none text-black"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary py-2 px-6 rounded-r-lg transition-all duration-300 ease-in-out hover:bg-blue-700"
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BannerSection;
