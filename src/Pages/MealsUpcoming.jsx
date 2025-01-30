import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";


const MealsUpcoming = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [mealDetails, setMealDetails] = useState({
    title: "Default Meal",
    category: "Default Category",
    image: "https://via.placeholder.com/150",
    description: "Default description...",
    publishDate: "",
  });
  const queryClient = useQueryClient();

  // Fetch upcoming meals
  const { data: meals = [], isLoading, error } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure("/api/upcoming-meals");
        return data.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      } catch (err) {
        console.error("Error fetching meals:", err);
        throw new Error("Failed to fetch meals");
      }
    },
  });

  // Publish meal mutation
  const publishMutation = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await axiosSecure.put(`/api/meals/${id}/publish`);
        return res.data;
      } catch (err) {
        console.error("Error publishing meal:", err);
        throw new Error("Failed to publish meal");
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["upcomingMeals"] }),
  });

  // Add new meal mutation
  const addMealMutation = useMutation({
    mutationFn: async (newMeal) => {
      try {
        const res = await axiosSecure.post("/api/upcoming-meals", newMeal);
        return res.data;
      } catch (err) {
        console.error("Error adding meal:", err);
        throw new Error("Failed to add meal");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["upcomingMeals"] });
      setShowModal(false);
    },
  });

  return (
    <div className="container mx-auto p-4">
    <Helmet>
        <title>Upcoming Meals | HotelHub-Dashboard</title>
    </Helmet>
      {/* Button to open the modal */}
      <button className="btn btn-success mt-4" onClick={() => setShowModal(true)}>
        Add Upcoming Meal
      </button>

      {/* Modal for adding new meal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Meal</h2>
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={mealDetails.title}
                onChange={(e) => setMealDetails({ ...mealDetails, title: e.target.value })}
                className="input input-bordered w-full mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Category</label>
              <input
                type="text"
                value={mealDetails.category}
                onChange={(e) => setMealDetails({ ...mealDetails, category: e.target.value })}
                className="input input-bordered w-full mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Image URL</label>
              <input
                type="text"
                value={mealDetails.image}
                onChange={(e) => setMealDetails({ ...mealDetails, image: e.target.value })}
                className="input input-bordered w-full mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                value={mealDetails.description}
                onChange={(e) => setMealDetails({ ...mealDetails, description: e.target.value })}
                className="textarea textarea-bordered w-full mb-4"
              />
            </div>
            <div>
              <label className="block mb-2">Publish Date</label>
              <input
                type="date"
                value={mealDetails.publishDate}
                onChange={(e) => setMealDetails({ ...mealDetails, publishDate: e.target.value })}
                className="input input-bordered w-full mb-4"
              />
            </div>
            <div className="flex justify-between">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={() => addMealMutation.mutate(mealDetails)}>
                Add Meal
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MealsUpcoming;
