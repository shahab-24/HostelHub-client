import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion"; // Import Framer Motion
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure("/api/reviews");
      return data;
    },
  });

  console.log(reviews)

  const handleDelete = (id) => {
    console.log("Delete review with ID:", id);
    // Add delete logic here
  };

  const handleViewMeal = (mealId) => {
    console.log("View meal with ID:", mealId);
    // Add navigation logic here
  };

  return (
    <div className="p-5">
      <h3 className="text-2xl font-semibold mb-4">Reviews: {reviews.length}</h3>
      <div className="overflow-x-auto">
        <motion.table 
          className="table w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr>
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
                key={review.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="hover:bg-gray-100"
              >
                <th>{index + 1}</th>
                <td>{review.mealTitle}</td>
                <td>{review.likes}</td>
                <td>{review.reviews_count}</td>
                <td className="flex gap-2">
                  <motion.button
                    className="btn btn-sm btn-error"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleDelete(review.id)}
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
    </div>
  );
};

export default AllReviews;
