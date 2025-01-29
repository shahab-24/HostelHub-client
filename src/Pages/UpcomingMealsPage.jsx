import { useState } from "react";
import { motion } from "framer-motion";
import AddMealModal from "../Components/AddMealModal";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Shared/Loader";

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const UpcomingMealsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading, error, refetch } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await axiosSecure("/api/upcoming-meals");
      return data;
    },
  });

  // Function to publish a meal
  const publishMeal = async (id) => {
    try {
      await axiosSecure.put(`/api/meals/${id}/publish`);
      refetch(); // Refetch meals to update the list and remove the published meal from the upcoming meals
    } catch (error) {
      console.error("Error publishing meal:", error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Admin Panel - Upcoming Meals</h1>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Add Upcoming Meal
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals?.meals?.map((meal) => (
          <motion.div
            key={meal._id}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={meal?.image || "/placeholder.png"}
              alt={meal?.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-blue-500 mb-2">{meal?.title}</h2>
              <p className="text-gray-400 mb-1">Category: {meal?.category}</p>
              <p className="text-gray-400 mb-3">Likes: {meal?.likes}</p>
              {meal.status === "upcoming" && (
                <button
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                  onClick={() => publishMeal(meal._id)}
                >
                  Publish
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AddMealModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} refetch={refetch} />
    </div>
  );
};

export default UpcomingMealsPage;
