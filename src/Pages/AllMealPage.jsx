import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../Components/Shared/Loader";

const AllMealsPage = () => {
  const [sortBy, setSortBy] = useState("likes"); // Default sort field
  const [order, setOrder] = useState("desc"); // Default sort order
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading, isError } = useQuery({
    queryKey: ["meals", sortBy, order],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/api/meals?sortBy=${sortBy}&order=${order}`
      );
      return response.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Failed to fetch meals.</p>;

  return (
    <div className="p-6">
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
            {meals.map((meal) => (
              <tr key={meal._id} className="text-center hover:bg-gray-50">
                <td className="border p-2">{meal.title}</td>
                <td className="border p-2">{meal.likes}</td>
                <td className="border p-2">{meal.reviews_count}</td>
                <td className="border p-2">{meal.rating}</td>
                <td className="border p-2">{meal.distributorName || "N/A"}</td>
                <td className="border p-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2">
                    View
                  </button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2">
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
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
