import { useState } from "react";

import AddMealModal from "../Components/AddMealModal";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// const fetchUpcomingMeals = async () => {
//     const response = await fe("/api/upcoming-meals");
//     if (!response.ok) throw new Error("Failed to fetch upcoming meals");
//     return response.json();
// };

const UpcomingMealsPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const axiosSecure = useAxiosSecure()
    
    const { data: meals = [], isLoading, error, refetch } = useQuery(
        {
         queryKey: ['meals'],
        queryFn: async () => {
                const {data} = await axiosSecure('/api/upcoming-meals')
                return data
        }        

        }
        
        );

    const publishMeal = async (id) => {
        await axiosSecure.put(`/api/meals/${id}/publish`);
        refetch();
    };

    if (isLoading) return <p>Loading meals...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Panel - Upcoming Meals</h1>
                <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                    Add Upcoming Meal
                </button>
            </div>
            <table className="table w-full bg-white shadow-lg rounded-lg">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Likes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal) => (
                        <tr key={meal._id}>
                            <td>{meal?.title}</td>
                            <td>{meal?.category}</td>
                            <td>{meal?.likes}</td>
                            <td>
                                <button
                                    className="btn btn-success"
                                    onClick={() => publishMeal(meal._id)}
                                >
                                    Publish
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddMealModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} refetch={refetch} />
        </div>
    );
};

export default UpcomingMealsPage;
