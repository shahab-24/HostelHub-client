import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Shared/Loader";
import useAxiosPublic from "../hooks/useAxiosPublic";

// const fetchMeals = async () => {
//   const response = await fetch("https://your-backend-api.com/meals"); // Replace with your API URL
//   if (!response.ok) throw new Error("Failed to fetch meals");
//   return response.json();
// };

const MealsPage = () => {
        const axiosPublic = useAxiosPublic()
  const { data: meals =[], isLoading, isError, error } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
        const {data} = await axiosPublic('/api/meals')
        return data
    }
  });

  if (isLoading) {
    return <Loader></Loader>
  }

  if (isError) {
    return <p className="text-center text-red-500">{error.message}</p>;
  }

  return (
    <div className="px-4 md:px-10 py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Meals Menu
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            {/* Meal Image */}
            <img
              src={meal.image}
              alt={meal.title}
              className="w-full h-52 object-cover rounded-t-lg"
            />

            {/* Meal Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-500 mb-2">
                {meal.title}
              </h3>
              <p className="text-gray-400 mb-2">Category: {meal.category}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {meal.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <p className="text-blue-500 font-semibold">${meal.price}</p>
                <p className="text-gray-500 text-sm">
                  Likes: {meal.likes} | Reviews: {meal.reviews_count}
                </p>
              </div>

              {/* Details Button */}
              <Link
                to={`/meals/${meal._id}`}
                className="block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
