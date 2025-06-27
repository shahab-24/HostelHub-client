import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loader from './Shared/Loader';



const PublishMeals = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [mealsList, setMealsList] = useState([]);

  // Fetch upcoming meals
  const { data: meals, isLoading, error } = useQuery({
    queryKey: ['upcomingMeals'],
    queryFn: async () => {
      const response = await axiosSecure.get('/api/upcoming-meals');
      return response.data;
    },
    onSuccess: (data) => setMealsList(data),
  });

  // Mutation to publish meals (move to meals collection)
  const publishMealMutation = useMutation({
    mutationFn: async (meal) => {
      const response = await axiosSecure.put(`/api/meals/${meal._id}/publish`);
      return response.data;
    },
    onSuccess: (updatedMeal) => {
      // Remove from upcoming meals
      setMealsList((prevMeals) => prevMeals.filter((meal) => meal._id !== updatedMeal._id));

      // Refetch all meals to update the UI
      queryClient.invalidateQueries(['allMeals']);

      Swal.fire('Success', 'Meal Published!', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to publish the meal.', 'error');
    },
  });

  if (isLoading) return <Loader></Loader>;
  if (error) return <p>Error loading meals: {error.message}</p>;

  // Confirm before publishing
  const handlePublishClick = (meal) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to publish this meal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, publish it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        publishMealMutation.mutate(meal);
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Upcoming Meals</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Meal</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Likes</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {meals?.map((meal) => (
              <tr key={meal._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{meal.title}</td>
                <td className="px-4 py-2 border">{meal.description}</td>
                <td className="px-4 py-2 border">{meal.category}</td>
                <td className="px-4 py-2 border">{meal.likes}</td>
                <td className="px-4 py-2 border">
                  <button
                    className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg ${
                      meal.status === 'published'
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-700'
                    }`}
                    onClick={() => handlePublishClick(meal)}
                    disabled={meal.status === 'published'}
                  >
                    {meal.status === 'published' ? 'Published' : 'Publish'}
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

export default PublishMeals;
