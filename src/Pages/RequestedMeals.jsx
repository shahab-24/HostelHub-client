import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { motion } from 'framer-motion';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';




const RequestedMeals = () => {
        const axiosSecure = useAxiosSecure();
const queryClient = useQueryClient();
const { user } = useAuth(); // Assuming you're using Firebase/AuthContext to get the logged-in user

const { data: requestMeals, isLoading, error } = useQuery({
  queryKey: ['requestedMeals', user?.email], // Include email in the query key for caching
  queryFn: async () => {
    if (!user?.email) return []; // Prevent API call if email is undefined
    const { data } = await axiosSecure(`/api/requested-meals/${user.email}`);
    return data;
  },
  enabled: !!user?.email, // Only run the query when email is available
});


  console.log(requestMeals)

  // Use the object syntax for `useMutation`
  const mutation = useMutation({
    mutationFn: async (id) => {
        
        const {data} = await axiosSecure.delete(`/api/meals/requests/${id}`);
  return data;

    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestedMeals'] });
    },
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [mealToCancel, setMealToCancel] = useState(null);

  const handleCancelClick = (id) => {
    setMealToCancel(id);
    setShowConfirmation(true);
  };

  const handleConfirmCancel = () => {
    mutation.mutate(mealToCancel);
    setShowConfirmation(false);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching meals</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Requested Meals</h1>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <h3>Are you sure you want to cancel this request?</h3>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                onClick={handleConfirmCancel}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={handleCancelConfirmation}
              >
                No
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">Meal Title</th>
            <th className="p-2 border border-gray-300">Likes</th>
            <th className="p-2 border border-gray-300">Reviews</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
  {requestMeals?.map((meal) => (
    <tr key={meal._id}>
      <td className="p-2 border border-gray-300">{meal.title}</td> {/* Changed meal.meal_title to meal.title */}
      <td className="p-2 border border-gray-300">{meal.likes}</td>
      <td className="p-2 border border-gray-300">{meal.reviews_count || 0}</td> {/* Ensure reviews_count shows 0 if undefined */}
      <td className="p-2 border border-gray-300">{meal.status}</td>
      <td className="p-2 border border-gray-300">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => handleCancelClick(meal._id)}
        >
          Cancel
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default RequestedMeals;
