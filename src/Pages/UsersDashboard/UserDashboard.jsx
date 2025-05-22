import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const UserDashboard = () => {
  const [requestedMeals, setRequestedMeals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.get(`/api/requested-meals/${user?.email}`).then(res => setRequestedMeals(res.data));
    axiosSecure.get("/user-reviews").then(res => setReviews(res.data));
  }, [user?.email, axiosSecure]);

  // Bar Chart Data (Requested Meals)
  const mealData = requestedMeals?.map(meal => ({ name: meal.mealType, count: meal.count }));

  // Pie Chart Data (Review Ratings)
  const reviewData = [
    { name: "5 Stars", value: reviews.filter(r => r.rating === 5).length },
    { name: "4 Stars", value: reviews.filter(r => r.rating === 4).length },
    { name: "3 Stars", value: reviews.filter(r => r.rating === 3).length },
  ];
  const COLORS = ["#4CAF50", "#FF9800", "#FF5722"];  // More vibrant and modern colors

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Requested Meals (Bar Chart) */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-xl rounded-lg hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-2xl text-white font-bold mb-4">Requested Meals</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={mealData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#FF5722" />
            <Tooltip />
            <Bar dataKey="count" fill="#ffcc00" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Review Ratings (Pie Chart) */}
      <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 shadow-xl rounded-lg hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-2xl text-white font-bold mb-4">Review Ratings</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={reviewData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
              {reviewData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserDashboard;
