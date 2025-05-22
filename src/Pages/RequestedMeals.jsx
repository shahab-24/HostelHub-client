import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import { Loader } from 'lucide-react';

const RequestedMeals = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [mealToCancel, setMealToCancel] = useState(null);
  const { user , loading } = useAuth();

  const { data: requestMeals, isLoading, error } = useQuery({
    queryKey: ['requestedMeals', user?.email], // Include email in the query key for caching
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axiosSecure(`/api/requested-meals/${user.email}`);
      return data;
    },
    enabled: !!user?.email, 
  });

//   console.log(requestMeals)

  const mutation = useMutation({
    mutationFn: async (id) => {
        console.log('console from server meals before api call')
      const { data } = await axiosSecure.delete(`/api/meals/requests/${id}`);
      console.log('console from server meals after api call', data)
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestedMeals'] });
    },
  });

 

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

//   if (loading) return <Loader></Loader>
  if (error) return <div className="text-center text-lg text-red-500">Error fetching meals</div>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Requested Meals | HotelHub-Dashboard</title>
      </Helmet>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Requested Meals</h1>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
          >
            <h3 className="text-lg font-semibold text-gray-800">Are you sure you want to cancel this request?</h3>
            <div className="mt-4 flex justify-between">
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleConfirmCancel}
              >
                Yes
              </button>
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={handleCancelConfirmation}
              >
                No
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-sm font-medium text-gray-700 border-b">Meal Title</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border-b">Likes</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border-b">Reviews</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border-b">Status</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestMeals?.map((meal) => (
              <tr key={meal._id} className="odd:bg-gray-50 even:bg-gray-100">
                <td className="p-3 text-sm text-gray-800 border-b">{meal.title}</td>
                <td className="p-3 text-sm text-gray-800 border-b">{meal.likes}</td>
                <td className="p-3 text-sm text-gray-800 border-b">{meal.reviews_count || 0}</td>
                <td className="p-3 text-sm text-gray-800 border-b">{meal.status}</td>
                <td className="p-3 text-sm text-gray-800 border-b">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
    </div>
  );
};

export default RequestedMeals;
