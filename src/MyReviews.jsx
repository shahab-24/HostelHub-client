import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from './hooks/useAuth';
import useAxiosSecure from './hooks/useAxiosSecure';
import { useState } from 'react';
import { toast } from 'react-toastify'; // For user feedback
import Loader from './Components/Shared/Loader';

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [editingReview, setEditingReview] = useState(null); // Track review being edited

    // Fetch user reviews
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['userReviews', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/user-reviews?email=${user?.email}`);
            return data;
        },
    });

    // Delete review mutation
    const deleteReviewMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/delete-review/${id}`);
        },
        onSuccess: () => {
            toast.success('Review deleted successfully');
            queryClient.invalidateQueries(['userReviews']);
        },
        onError: () => {
            toast.error('Failed to delete review');
        },
    });

    // Edit review mutation
    const editReviewMutation = useMutation({
        mutationFn: async ({ id, comment }) => {
            await axiosSecure.put(`/edit-review/${id}`, { comment });
        },
        onSuccess: () => {
            toast.success('Review updated successfully');
            setEditingReview(null);
            queryClient.invalidateQueries(['userReviews']);
        },
        onError: () => {
            toast.error('Failed to update review');
        },
    });

    if (isLoading) return <Loader></Loader>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">My Reviews</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Meal Title</th>
                        <th className="border border-gray-300 px-4 py-2">Likes</th>
                        <th className="border border-gray-300 px-4 py-2">Reviews Count</th>
                        <th className="border border-gray-300 px-4 py-2">Review</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{review.mealTitle}</td>
                            <td className="border border-gray-300 px-4 py-2">{review.likes}</td>
                            <td className="border border-gray-300 px-4 py-2">{review.reviewsCount}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {editingReview === review._id ? (
                                    <input
                                        type="text"
                                        defaultValue={review.comment}
                                        className="input input-bordered w-full"
                                        onBlur={(e) =>
                                            editReviewMutation.mutate({
                                                id: review._id,
                                                comment: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    review.comment
                                )}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => setEditingReview(review._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteReviewMutation.mutate(review._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => window.location.href = `/meal/${review.mealId}`}
                                >
                                    View Meal
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyReviews;
