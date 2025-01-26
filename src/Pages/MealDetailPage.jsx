import { motion } from "framer-motion";
import Loader from "../Components/Shared/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";  // Import SweetAlert2

const MealDetailPage = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [editingReview, setEditingReview] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { user } = useAuth();

  const {
    data: meal = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axiosPublic(`/api/meals/${id}`);
      return data;
    },
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const response = await axiosPublic(`/api/reviews/${id}`);
      return response.data;
    },
  });

  const handleLike = useMutation({
    mutationFn: async () => {
      if (meal?.likedBy?.includes(user?.email)) {
        throw new Error("You have already liked this meal.");
      }
      await axiosSecure.patch(`/api/meals/${id}/like`);
    },
    onSuccess: () => {
      toast.success("Liked the meal successfully!");
      queryClient.invalidateQueries(["meal", id]);
      refetch();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to like the meal."
      );
    },
  });

  const handleAddReview = useMutation({
    mutationFn: async () => {
      const payload = {
        mealId: id,
        comment: reviewText,
        rating,
        title: meal.title,
      };
      await axiosSecure.post("/api/reviews", payload);
    },
    onSuccess: () => {
      toast.success("Review added successfully!");
      queryClient.invalidateQueries(["reviews", id]);
      queryClient.invalidateQueries(["meal", id]);
      setReviewText("");
      setRating(0);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add review.");
    },
  });

  const handleEditReview = useMutation({
        mutationFn: async (updatedReview) => {
          try {
            const response = await axiosSecure.patch(
              `/api/reviews/${updatedReview.id}`,
              updatedReview
            );
            return response.data;  // Ensure the response is captured for success
          } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to update review.");
          }
        },
        onSuccess: () => {
          toast.success("Review updated!");
          queryClient.invalidateQueries(["reviews", id]);
          setEditingReview(null);
        },
        onError: (error) => {
          console.error("Error updating review:", error);  // Log error for debugging
          toast.error(error.message || "Failed to update review.");
        },
      });
      

  const deleteReview = useMutation({
    mutationFn: async (reviewId) => {
      await axiosSecure.delete(`/api/reviews/${reviewId}`);
    },
    onSuccess: () => {
      toast.success("Review deleted!");
      queryClient.invalidateQueries(["reviews", id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete review.");
    },
  });

  const handleMealRequest = useMutation({
    mutationFn: async () => {
      await axiosSecure.post(`/api/meals/${id}/request`);
    },
    onSuccess: () => {
      toast.success("Meal request submitted!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to request meal.");
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p className="text-center text-red-500">{error.message}</p>;
  }

  const renderStars = (currentRating, setRatingHandler) => (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`text-2xl ${currentRating >= star ? "text-yellow-500" : "text-gray-400"}`}
          onClick={() => setRatingHandler(star)}
        >
          ★
        </button>
      ))}
    </div>
  );

  const confirmAction = (action, message) => {
    Swal.fire({
      title: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        action();
      }
    });
  };

  return (
    <section className="py-10 px-4 md:px-10 bg-gradient-to-r from-gray-50 to-gray-100">
      <Helmet>
        <title>Meal Details | HostelHub</title>
      </Helmet>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <motion.div
          className="h-64 md:h-96 bg-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={meal?.image}
            alt={meal?.title || "Meal Image"}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="p-6 md:p-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            {meal?.title}
          </h2>
          <p className="text-gray-600 mb-4">{meal?.description}</p>
          <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc pl-5 mb-6">
            {meal?.ingredients?.split(",").map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
              meal?.likedBy?.includes(user?.email)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleLike.mutate()}
            disabled={meal?.likedBy?.includes(user?.email)}
          >
            Like ({meal?.likes || 0})
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 ml-4 rounded-lg"
            onClick={() => handleMealRequest.mutate()}
          >
            Request Meal
          </button>

          <div className="border-t pt-6">
            <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
            {reviews?.map((review) => (
              <div key={review._id} className="mb-4 border-b pb-4">
                <p>
                  <strong>{review.email}:</strong> {review.comment}
                </p>
                <p>
                  Rating:{" "}
                  {[...Array(review.rating)].map((_, index) => (
                    <span key={index} className="text-yellow-500">★</span>
                  ))}
                </p>

                {/* Only show edit and delete for the logged-in user */}
                {review.email === user?.email && (
                  <div className="flex space-x-2 mt-2">
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        setEditingReview(review._id);
                        setEditText(review.comment);
                        setEditRating(review.rating);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() =>
                        confirmAction(() => deleteReview.mutate(review._id), "Are you sure you want to delete this review?")
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Edit review */}
            {editingReview && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-4">Edit Review</h3>
                {renderStars(editRating, setEditRating)}{" "}
                {/* Display star rating */}
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full mt-3 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Edit your review..."
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg"
                  onClick={() => {
                    confirmAction(
                      () => handleEditReview.mutate({ id: editingReview, comment: editText, rating: editRating }),
                      "Are you sure you want to save changes?"
                    );
                  }}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 mt-4 ml-2 rounded-lg"
                  onClick={() => setEditingReview(null)}
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Add a new review */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Add a Review</h3>
              {renderStars(rating, setRating)}
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full mt-3 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Write your review..."
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg"
                onClick={() => handleAddReview.mutate()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealDetailPage;
