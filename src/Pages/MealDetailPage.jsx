import React from "react";
import { motion } from "framer-motion";
import Loader from "../Components/Shared/Loader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const MealDetailPage = () => {

        const { id } = useParams();
        const { data: meal=[], isLoading, isError, error } = useQuery({
          queryKey: ["meal", id],
          queryFn: () => fetchMealById(id),
        });
      
        if (isLoading) {
          return <Loader></Loader>
        }
      
        if (isError) {
          return <p className="text-center text-red-500">{error.message}</p>;
        }
  return (
    <section className="py-10 px-4 md:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Meal Image */}
        <motion.div
          className="h-64 md:h-96 bg-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://via.placeholder.com/800x400"
            alt="Meal"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="p-6 md:p-10">
          {/* Meal Details */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-2">
                Delicious Meal Name
              </h2>
              <p className="text-gray-500 mb-4">By: Distributor Name</p>
            </div>
            <p className="text-gray-400">Posted on: Jan 17, 2025</p>
          </div>

          <p className="text-gray-700 mb-6">
            Description: This is a placeholder description for the meal. It will
            describe the taste, ingredients, and more details about the meal.
          </p>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            {/* Like Button */}
            <button
              className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={() => alert("Like button clicked!")}
            >
              👍 Like <span className="ml-2">(100)</span>
            </button>
            {/* Meal Request Button */}
            <button
              className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={() => alert("Meal requested!")}
            >
              🍽️ Request Meal
            </button>
          </div>

          {/* Review Section */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Reviews:</h3>
            {/* Review Form */}
            <div className="mb-6">
              <textarea
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Write your review..."
                rows="3"
              ></textarea>
              <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                Submit Review
              </button>
            </div>
            {/* Reviews List */}
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                <p className="text-gray-700">
                  <strong>User 1:</strong> This meal was amazing! I loved it.
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                <p className="text-gray-700">
                  <strong>User 2:</strong> Great taste and fresh ingredients!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealDetailPage;
