import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useState } from "react";
import Loader from "../Components/Shared/Loader";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedMeal, setSelectedMeal] = useState(null);

  const { data: reviews = [], refetch, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure("/api/reviews");
      return data;
    },
  });

  // Handle delete with SweetAlert confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/delete-review/${id}`);
          if (response.status === 200) {
            Swal.fire("Deleted!", "Review has been deleted.", "success");
            refetch();
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete review.", error);
        }
      }
    });
  };

  // Handle view meal - Fetch details and open modal
  const handleViewMeal = async (mealId) => {
    try {
      const { data } = await axiosSecure.get(`/api/meals/${mealId}`);
      setSelectedMeal(data);
    } catch (error) {
      Swal.fire("Error!", "Failed to fetch meal details.", error);
    }
  };
  if (isLoading) return <Loader />;

  return (
    <div className="p-5 w-full max-w-7xl mx-auto overflow-x-auto">
      <Helmet>
        <title>All Reviews | HotelHub-Dashboard</title>
      </Helmet>
      <h3 className="text-2xl font-semibold mb-4 text-center">Reviews: {reviews?.length}</h3>
      <div className="overflow-auto rounded-lg shadow-md">
        <motion.table
          className="table w-full border-collapse border border-gray-300 min-w-max"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="bg-gray-200">
              <th>#</th>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Reviews Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <motion.tbody>
            {reviews?.map((review, index) => (
              <motion.tr
                key={review._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="hover:bg-gray-100 text-center"
              >
                <th>{index + 1}</th>
                <td>{review.mealTitle}</td>
                <td>{review.likes}</td>
                <td>{review.reviews_count}</td>
                <td className="flex flex-wrap gap-2 justify-center">
                  <motion.button
                    className="btn btn-sm btn-error"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    className="btn btn-sm btn-primary"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleViewMeal(review.mealId)}
                  >
                    View Meal
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </motion.table>
      </div>

      {/* Modal for Viewing Meal Details */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-3">{selectedMeal?.title}</h2>
            <img
              src={selectedMeal?.image}
              alt={selectedMeal?.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="mt-3 text-blue-500">{selectedMeal?.description}</p>
            <p className="mt-3">Likes: {selectedMeal?.likes}</p>
            <p className="mt-3">Rating: {selectedMeal?.rating}</p>
            <p className="font-semibold mt-2">Date: {selectedMeal?.post_time}</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setSelectedMeal(null)} className="btn btn-sm btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
