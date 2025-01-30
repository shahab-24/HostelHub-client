import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  // Fetch requested meals
  const { data: requestedMeals, isLoading, error } = useQuery({
    queryKey: ['requestedMeals'],
    queryFn: async () => {
      const { data } = await axiosSecure('/api/requested-meals');
      return data;
    },
  });

  // Change meal status to delivered
  const mutation = useMutation({
    mutationFn: async (mealId) => {
      const { data } = await axiosSecure.patch(`/api/meals/requests/${mealId}`, { status: 'delivered' });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['requestedMeals']);
    },
  });

  const handleServeMeal = (mealId) => {
    mutation.mutate(mealId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching meals</div>;

  return (
    <div className="p-6">
    <Helmet>
        <title>Serve Meals | HotelHub-Dashboard</title>
    </Helmet>
      <h1 className="text-2xl font-bold text-center mb-6">Requested Meals</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">Meal Title</th>
              <th className="p-3 border-b">User Email</th>
              <th className="p-3 border-b">User Name</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedMeals?.map((meal) => (
              <tr key={meal._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{meal.title}</td>
                <td className="p-3 border-b">{meal.email}</td>
                <td className="p-3 border-b">{meal.userId.name}</td> {/* Assuming name is stored inside userId */}
                <td className="p-3 border-b">{meal.status}</td>
                <td className="p-3 border-b">
                  {meal.status === 'pending' ? (
                    <button
                      onClick={() => handleServeMeal(meal._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Serve
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServeMeals;
