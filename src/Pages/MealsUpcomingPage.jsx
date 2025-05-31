import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import Loader from '../Components/Shared/Loader';


const MealsUpcomingPage = () => {
  const axiosSecure = useAxiosSecure();

  const fetchUpcomingMeals = async () => {
    const { data } = await axiosSecure.get("/api/upcoming-meals"); 
    return data;
  };

  const { data: meals, isLoading, isError } = useQuery({
    queryKey: ['upcomingMeals'],
    queryFn: fetchUpcomingMeals,
  });

  if (isLoading) return <Loader></Loader>
  if (isError) return <p className="text-center text-xl text-red-500">Failed to load meals.</p>;

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h2 className="text-3xl font-bold text-center mb-6">Upcoming Meals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals?.map((meal) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="card shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden">
              <figure>
                <img src={meal.image} alt={meal.name} className="w-full h-60 object-cover" />
              </figure>
              <div className="card-body p-4">
                <h3 className="text-xl font-semibold">{meal.title}</h3>

                
                <p className="text-gray-600">{meal.description}</p>

                <ul className="list-disc pl-5 mb-6">
            {meal?.ingredients?.split(",").map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
                <p className="font-bold text-lg mt-2">{meal.date}</p>
                <Link to={`/api/meals/${meal._id}`}>
                <button className="relative mt-4 px-6 py-3 font-bold text-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg 
                         transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl w-full">View Details</button>
                </Link>
                
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MealsUpcomingPage;
