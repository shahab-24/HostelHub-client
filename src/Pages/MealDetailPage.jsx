import { motion } from "framer-motion";
import Loader from "../Components/Shared/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useOutletContext, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const MealDetailPage = () => {
  const { setLikedMeals } = useOutletContext();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [editingReview, setEditingReview] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);

  //   const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const  {mealId} = useParams();
  const { user } = useAuth();

  

  const {
    data: meal = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["meal", mealId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/meals/${mealId}`);
      return data;
    },
  });
//   console.log(meal)
// console.log(mealId, user?.email)

//   const totalPrice = meal.reduce((total, item) => total + item.price,0)
//   console.log(totalPrice)

  const { data: reviews } = useQuery({
    queryKey: ["reviews", mealId],
    queryFn: async () => {
      const response = await axiosSecure(`/api/reviews/${mealId}`);
      return response.data;
    },
  });

  //   like button=================================
  const handleLike = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error("You must be logged in to like this meal.");
        return;
      }

      if (meal?.likedBy?.includes(user?.email)) {
        throw new Error("You have already liked this meal.");
      }
      await axiosSecure.patch(`/api/meals/${mealId}/like`);
    },
    onSuccess: async () => {
      setLikedMeals((prev) => prev + 1);
      toast.success("Liked the meal successfully!");
      await queryClient.refetchQueries(["meal", mealId]);
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

  //   add review button======================
  const handleAddReview = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error("You must be logged in to add a review.");
        return;
      }
      const payload = {
        mealId: mealId,
        comment: reviewText,
        rating,
        title: meal.title,
      };
      await axiosSecure.post("/api/reviews", payload);
    },
    onSuccess: () => {
      toast.success("Review added successfully!");
      queryClient.invalidateQueries(["reviews", mealId]);
      queryClient.invalidateQueries(["meal", mealId]);
      setReviewText("");
      setRating(0);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add review.");
    },
  });

  //   edit review button ==========================
  const handleEditReview = useMutation({
    mutationFn: async (updatedReview) => {
      try {
        if (!user) {
          toast.error("You must be logged in to edit this review.");
          return;
        }
        const response = await axiosSecure.patch(
          `/api/reviews/${updatedReview.mealId}`,
          updatedReview
        );
        return response.data; 
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to update review."
        );
      }
    },
    onSuccess: () => {
      toast.success("Review updated!");
      queryClient.invalidateQueries(["reviews", mealId]);
      setEditingReview(null);
    },
    onError: (error) => {
      console.error("Error updating review:", error); // Log error for debugging
      toast.error(error.message || "Failed to update review.");
    },
  });

  //       delete review button=======================
  const deleteReview = useMutation({
    mutationFn: async (reviewId) => {
      if (!user) {
        toast.error("You must be logged in to delete this meal.");
        return;
      }
      await axiosSecure.delete(`/api/reviews/${reviewId}`);
    },
    onSuccess: () => {
      toast.success("Review deleted!");
      queryClient.invalidateQueries(["reviews", mealId]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete review.");
    },
  });

  //   request functionlity==========================
  const handleMealRequest = useMutation({
    mutationFn: async () => {
      // Confirm the user's action before proceeding
      if (!user) {
        toast.error("You must be logged in to request this meal.");
        return;
      }
      const result = await Swal.fire({
        title: "Request Meal?",
        text: "Do you want to request this meal?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, request it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        // Proceed with the meal request

        await axiosSecure.post(`/api/request-meals/${mealId}`, {
          email: user?.email,
        });
        toast.success("Meal request submitted successfully!");
      }
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
          className={`text-2xl ${
            currentRating >= star ? "text-yellow-500" : "text-gray-400"
          }`}
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
        <section className="py-12 px-4 md:px-10 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen mt-16 bg-base-200">
          <Helmet>
            <title>Meal Details | HostelHub</title>
          </Helmet>
      
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Animated Image Section */}
            <motion.div
              className="h-64 sm:h-80 md:h-96 bg-gray-200 overflow-hidden group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.img
                src={meal?.image}
                alt={meal?.title || "Meal Image"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                whileHover={{ scale: 1.1, rotate: 1 }}
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </motion.div>
      
            {/* Content Section */}
            <div className="p-6 md:p-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">{meal?.title}</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{meal?.description}</p>
      
              {/* Ingredients */}
              <div className="mb-8 text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients:</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  {meal?.ingredients?.split(",").map((ingredient, idx) => (
                    <li key={idx}>{ingredient.trim()}</li>
                  ))}
                </ul>
              </div>
      
              {/* Buttons */}
              <div className="flex justify-center gap-4 mb-10 flex-wrap sm:flex-nowrap">
  {/* Like Button */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    className={`w-36 sm:w-40 py-2 rounded-lg font-semibold shadow transition duration-300 text-white ${
      meal?.likedBy?.includes(user?.email)
        ? "bg-blue-300 cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600"
    }`}
    onClick={() =>{ 
        if(!meal?.likedBy?.includes(user?.email)){
        handleLike.mutate()
    }}}
    disabled={meal?.likedBy?.includes(user?.email)}
  >
    {meal?.likedBy?.includes(user?.email) ? "❤️ Liked" : "❤️ Like"}
  </motion.button>

  {/* Request Meal Button */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    className={`w-36 sm:w-40 py-2 rounded-lg font-semibold shadow transition duration-300 text-white ${
      meal?.requestedBy?.includes(user?.email)
        ? "bg-green-300 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600"
    }`}
    onClick={() => handleMealRequest.mutate()}
    disabled={meal?.requestedBy?.includes(user?.email)}
  >
    {meal?.requestedBy?.includes(user?.email) ? "🍽️ Requested" : "🍽️ Request Meal"}
  </motion.button>
</div>

              {/* Reviews */}
              <div className="border-t pt-8 text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h3>
      
                {reviews?.map((review) => (
                  <div
                    key={review._id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4"
                  >
                    <p className="text-gray-800 mb-2">
                      <strong>{review.email}</strong>: {review.comment}
                    </p>
                    <p className="text-yellow-500 mb-2">
                      {[...Array(review.rating)].map((_, index) => (
                        <span key={index}>★</span>
                      ))}
                    </p>
                    {review.email === user?.email && (
                      <div className="flex space-x-4">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => {
                            setEditingReview(review._id);
                            setEditText(review.comment);
                            setEditRating(review.rating);
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() =>
                            confirmAction(
                              () => deleteReview.mutate(review._id),
                              "Are you sure you want to delete this review?"
                            )
                          }
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
      
                {/* Edit Review Form */}
                {editingReview && (
                  <div className="mt-6 p-6 bg-yellow-50 border border-yellow-300 rounded-xl">
                    <h3 className="text-2xl font-semibold mb-4">Edit Your Review</h3>
                    {renderStars(editRating, setEditRating)}
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full mt-3 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Edit your review..."
                    />
                    <div className="mt-4 space-x-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={() =>
                          confirmAction(
                            () =>
                              handleEditReview.mutate({
                                mealId: editingReview,
                                comment: editText,
                                rating: editRating,
                              }),
                            "Are you sure you want to save changes?"
                          )
                        }
                      >
                        ✅ Save
                      </button>
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => setEditingReview(null)}
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                )}
      
                {/* Add New Review Form */}
                <div className="mt-10">
                  <h3 className="text-2xl font-semibold mb-4">Leave a Review</h3>
                  {renderStars(rating, setRating)}
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full mt-3 p-3 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
                    placeholder="Write your review here..."
                  />
                  <button
                    className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition duration-300"
                    onClick={() => handleAddReview.mutate()}
                  >
                    ✍️ Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
      
      
      
};

export default MealDetailPage;