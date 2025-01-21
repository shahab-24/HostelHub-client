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

const MealDetailPage = () => {
        const [reviewText, setReviewText] = useState("")
        const [editingReview, setEditingReview] = useState(null); // Holds the review being edited
const [editText, setEditText] = useState(""); // Holds the updated review text
const [editRating, setEditRating] = useState(5); // Holds the updated rating

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient()
  const { id } = useParams();
  const {user} = useAuth()

  const {
    data: meal = {},
    isLoading,
    isError,
    error,
    refetch
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
  //   like function =======================
 // Like function with validation
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
          refetch()
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || error.message || "Failed to like the meal.");
        },
      });


//       review==============
const handleAddReview = useMutation(
        { mutationFn: async () => {
                await axiosSecure.post('/api/reviews', { mealId: id, comment: reviewText, rating:5})
        },
        onSuccess:  () => {
                toast.success("Review added!");
                queryClient.invalidateQueries(["reviews", id]);
        }
}
)


const editReview = useMutation({
        mutationFn: async (updatedReview) => {
          await axiosSecure.patch(`/api/reviews/${updatedReview.id}`, updatedReview);
        },
        onSuccess: () => {
          toast.success("Review updated!");
          queryClient.invalidateQueries(["reviews", id]); // Refresh reviews
          setEditingReview(null); // Exit edit mode
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to update review.");
        },
      });
      

const deleteReview = useMutation({
        mutationFn: async (reviewId) => {
          await axiosSecure.delete(`/api/reviews/${reviewId}`);
        },
        onSuccess: () => {
          toast.success("Review deleted!");
          queryClient.invalidateQueries(["reviews", id]); // Refresh reviews
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to delete review.");
        },
      });
      
      

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p className="text-center text-red-500">{error.message}</p>;
  }

  return (
    <section className="py-10 px-4 md:px-10 bg-gradient-to-r from-gray-50 to-gray-100">
             <Helmet>
                        <title>Meal Details | HostelHub</title>
                 </Helmet>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Meal Image */}
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
          {/* Meal Details */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-blue-600 mb-2">
                {meal?.title}
              </h2>
              <p className="text-gray-500">
                By: {meal?.distributorName || "N/A"}
              </p>
            </div>
            <p className="text-gray-400">
              Posted on: {new Date(meal?.post_time).toLocaleDateString()}
            </p>
          </div>

          <p className="text-gray-700 mb-6">{meal?.description}</p>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {meal?.ingredients?.split(",").map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
          <button
  className={`flex items-center ${
    meal?.likedBy?.includes(user?.email)
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-500 hover:bg-blue-600"
  } text-white py-2 px-4 rounded-lg shadow-md transition`}
  onClick={() => handleLike.mutate()}
  disabled={meal?.likedBy?.includes(user?.email)}
>
  👍 Like <span className="ml-2">({meal?.likes})</span>
</button>

            <button
              className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={() => alert("Meal requested!")}
            >
              🍽️ Request Meal
            </button>
          </div>

          {/* Review Section */}
          <div className="border-t pt-6">
           

            {/* Review Form */}
            <div className="mb-6">
            <div className="border-t pt-6">
  <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

  {isLoading ? (
    <p>Loading reviews...</p>
  ) : reviews?.length > 0 ? (
    reviews.map((review) => (
      <div key={review._id} className="bg-gray-100 p-4 rounded-md shadow-sm mb-4">
        {editingReview === review._id ? (
          // Edit Mode
          <div>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              value={editRating}
              onChange={(e) => setEditRating(e.target.value)}
              min={1}
              max={5}
              className="w-20 p-2 border rounded mb-2"
            />
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  editReview.mutate({ id: review._id, comment: editText, rating: editRating })
                }
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditingReview(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // View Mode
          <div>
            <p>
              <strong>{review.email}:</strong> {review.comment}
            </p>
            <p>Rating: {review.rating}</p>
            {review.email === user?.email && (
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => {
                    setEditingReview(review._id);
                    setEditText(review.comment);
                    setEditRating(review.rating);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteReview.mutate(review._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    ))
  ) : (
    <p className="text-gray-500">No reviews yet. Be the first to review this meal!</p>
  )}
</div>





              <textarea 
              value={reviewText}
              onChange={(e) => {setReviewText(e.target.value)}}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Write your review..."
                rows="3"
              ></textarea>
              <button onClick={()=>handleAddReview.mutate()} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                Submit Review
              </button>
            </div>

            {/* Reviews List */}
            {meal?.reviews_count > 0 ? (
              <div className="space-y-4">
                {reviews?.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-md shadow-sm"
                  >
                    <p className="text-gray-700">
                      <strong>{review?.user}:</strong> {review?.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No reviews yet. Be the first to review this meal!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealDetailPage;


