import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "./hooks/useAuth";
import useAxiosSecure from "./hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Loader from "./Components/Shared/Loader";
import { motion } from "framer-motion"; 
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; 

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editingReview, setEditingReview] = useState(null);

  
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["userReviews", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user-reviews/${user?.email}`);
      return data;
    },
  });


  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/delete-review/${id}`);
    },
    onSuccess: () => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries(["userReviews"]);
    },
    onError: () => {
      toast.error("Failed to delete review");
    },
  });

 
  const editReviewMutation = useMutation({
    mutationFn: async ({ id, comment }) => {
      await axiosSecure.put(`/edit-review/${id}`, { comment });
    },
    onSuccess: () => {
      toast.success("Review updated successfully");
      setEditingReview(null);
      queryClient.invalidateQueries(["userReviews"]);
    },
    onError: () => {
      toast.error("Failed to update review");
    },
  });


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReviewMutation.mutate(id);
      }
    });
  };


  const handleEdit = (id, currentComment) => {
    Swal.fire({
      title: "Edit your review",
      input: "text",
      inputValue: currentComment,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      preConfirm: (newComment) => {
        if (!newComment) {
          Swal.showValidationMessage("Review comment cannot be empty!");
        }
        return newComment;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        editReviewMutation.mutate({ id, comment: result.value });
      }
    });
  };

 
  if (isLoading) return <Loader />;

  return (
    <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
      <Helmet>
        <title>My Reviews | HotelHub-Dashboard</title>
      </Helmet>

      {/* Page Heading with animation */}
      <motion.h1
        className="text-3xl font-bold mb-6 text-center all-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Reviews
      </motion.h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full min-w-[600px] text-sm text-left text-gray-700 bg-white border border-gray-300">
          <thead className="text-xs text-gray-800 uppercase bg-gray-400">
            <tr>
              <th className="px-4 py-3">Meal Title</th>
              <th className="px-4 py-3">Likes</th>
              <th className="px-4 py-3">Reviews</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((review, index) => (
              <motion.tr
                key={review._id}
                className="hover:bg-gray-200 hover:scale-110 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="px-4 py-3 font-medium">{review?.mealTitle}</td>
                <td className="px-4 py-3">{review?.likes}</td>
                <td className="px-4 py-3">{review?.reviewsCount}</td>
                <td className="px-4 py-3">{review?.comment}</td>
                <td className="px-4 py-3 flex gap-2 justify-center items-center">
                  <button
                    title="Edit Review"
                    onClick={() => handleEdit(review._id, review.comment)}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    title="Delete Review"
                    onClick={() => handleDelete(review._id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash size={18} />
                  </button>
                  <button
                    title="View Meal"
                    onClick={() =>
                      (window.location.href = `/api/meals/${review.mealId}`)
                    }
                    className="text-green-600 hover:text-green-800 transition"
                  >
                    <FaEye size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
