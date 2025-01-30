import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../Components/Shared/Loader";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert

const AllMealsPage = () => {
  const [sortBy, setSortBy] = useState("likes");
  const [order, setOrder] = useState("desc");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // For UI update after delete

  // State for update modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [formData, setFormData] = useState({});

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

  // Mutation for updating a meal
  const updateMealMutation = useMutation({
    mutationFn: async (updatedMeal) => {
      await axiosSecure.put(`/api/meals/${updatedMeal._id}`, updatedMeal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["meals"]); // Refresh meals after update
      Swal.fire("Updated!", "The meal has been updated.", "success");
      setIsModalOpen(false);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update meal.", "error");
    },
  });

  // Mutation for deleting a meal
  const deleteMealMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/api/meals/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["meals"]); // Refresh meals after delete
    },
  });

  // View Meal Handler
  const handleViewMeal = (id) => {
    navigate(`/api/meals/${id}`);
  };

  // Open Modal for Updating Meal
  const handleOpenUpdateModal = (meal) => {
    setSelectedMeal(meal);
    setFormData(meal); // Pre-fill form with meal data
    setIsModalOpen(true);
  };

  // Handle input change in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle meal update in modal
  const handleUpdateMeal = (e) => {
    e.preventDefault();
    updateMealMutation.mutate(formData);
  };

  // Delete Meal Handler with SweetAlert
  const handleDeleteMeal = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMealMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "The meal has been deleted.", "success");
          },
          onError: () => {
            Swal.fire("Error", "Failed to delete meal.", "error");
          },
        });
      }
    });
  };

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Failed to fetch meals.</p>;

  return (
    <div className="p-6">
      <Helmet>
        <title>All Meals | HotelHub-Dashboard</title>
      </Helmet>

      {/* Sorting Options */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">All Meals</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
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
            className="border p-2 rounded"
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
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals?.meals?.map((meal) => (
              <tr key={meal._id} className="text-center hover:bg-gray-50">
                <td className="border p-2">{meal.title}</td>
                <td className="border p-2">{meal.likes}</td>
                <td className="border p-2 flex justify-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => handleViewMeal(meal._id)}>
                    <FaEye />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-700" onClick={() => handleOpenUpdateModal(meal)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteMeal(meal._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Meal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Update Meal</h3>
            <form onSubmit={handleUpdateMeal} className="space-y-3">
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
              <input type="number" name="likes" value={formData.likes} onChange={handleChange} className="w-full p-2 border rounded" required />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update</button>
            </form>
            <button onClick={() => setIsModalOpen(false)} className="mt-3 text-red-500">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllMealsPage;
