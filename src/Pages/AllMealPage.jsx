import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../Components/Shared/Loader";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { Helmet } from "react-helmet-async";

const AllMealsPage = () => {
  const [sortBy, setSortBy] = useState("likes"); // Default sort field
  const [order, setOrder] = useState("desc"); // Default sort order
  const axiosSecure = useAxiosSecure();

  // Fetch meals with sorting
  const { data: meals = [], isLoading, isError } = useQuery({
    queryKey: ["meals", sortBy, order],

    queryFn: async () => {
      const response = await axiosSecure.get(
        `/api/meals?sortBy=${sortBy}&order=${order}`
      );
      return response.data;
    },
  });

//   console.log(meals)

  // View Meal Handler
//   const handleViewMeal = (id) => {
//     console.log(`View meal with ID: ${id}`);
//     // Navigate to meal details page (e.g., `/meals/:id`)
//   };

  // Update Meal Handler
//   const handleUpdateMeal = (id) => {
//     console.log(`Update meal with ID: ${id}`);
//     // Open update form or navigate to update page
//   };

  // Delete Meal Handler
//   const handleDeleteMeal = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this meal?"
//     );
//     if (confirmDelete) {
//       try {
//         await axiosSecure.delete(`/api/meals/${id}`);
//         console.log(`Deleted meal with ID: ${id}`);
//         window.location.reload(); // Refresh the page or refetch meals
//       } catch (error) {
//         console.error("Failed to delete meal:", error);
//       }
//     }
//   };

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Failed to fetch meals.</p>;

  return (
    <div className="p-6">
     <Helmet>
        <title>All Meals | Dashboard</title>
    </Helmet>
      {/* Sorting Options */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">All Meals</h2>
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="likes">Sort by Likes</option>
            <option value="reviews">Sort by Reviews</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="ml-2 border p-2 rounded"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Meals Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Likes</th>
              <th className="border p-2">Reviews</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Distributor</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals?.meals?.map((meal) => (
              <tr key={meal._id} className="text-center hover:bg-gray-50">
                <td className="border p-2">{meal.title}</td>
                <td className="border p-2">{meal.likes}</td>
                <td className="border p-2">{meal.reviews_count}</td>
                <td className="border p-2">{meal.rating}</td>
                <td className="border p-2">
                  {meal.distributorName || "N/A"}
                </td>
                <td className="border p-2 flex justify-center space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                //     onClick={() => handleViewMeal(meal._id)}
                    title="View Meal"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-yellow-500 hover:text-yellow-700"
                //     onClick={() => handleUpdateMeal(meal._id)}
                    title="Update Meal"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                //     onClick={() => handleDeleteMeal(meal._id)}
                    title="Delete Meal"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMealsPage;
