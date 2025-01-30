import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';


const MealsUpcomingPage = () => {
  const axiosSecure = useAxiosSecure();

  const fetchUpcomingMeals = async () => {
    const { data } = await axiosSecure.get('/api/upcoming-meals'); // Match with backend route
    return data;
  };

  const { data: meals, isLoading, isError } = useQuery({
    queryKey: ['upcomingMeals'],
    queryFn: fetchUpcomingMeals,
  });

  if (isLoading) return <p className="text-center text-xl">Loading meals...</p>;
  if (isError) return <p className="text-center text-xl text-red-500">Failed to load meals.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
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
                <h3 className="text-xl font-semibold">{meal.name}</h3>
                <p className="text-gray-600">{meal.description}</p>
                <p className="font-bold text-lg mt-2">{meal.date}</p>
                <Link to={`/api/meals/${meal._id}`}>
                <button className="btn btn-primary mt-4 w-full">View Details</button>
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
