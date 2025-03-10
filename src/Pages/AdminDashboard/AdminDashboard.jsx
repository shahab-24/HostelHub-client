import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { useEffect, useState } from "react";
// import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// import useMeal from "../../hooks/useMeal";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [meals, setMeals] = useState([]);
//   const [meals] = useMeal()
  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()

  useEffect(() => {
    axiosSecure("/users").then(res => setUsers(res.data));
    
    axiosPublic("/api/meals").then(res => setMeals(res.data?.meals));
  }, [axiosPublic, axiosSecure]);

//   console.log(users,meals)

  // Line Chart Data (Meals Over Time)
  const mealData = meals?.map((meal, index) => ({ day: index + 1, count: meal.count }));
  console.log(mealData)

  // Pie Chart Data (User Roles)
  const roleData = [
    { name: "Users", value: users.filter(user => user.role === "user").length },
    { name: "Admins", value: users.filter(user => user.role === "admin").length },
  ];
  const COLORS = ["#0088FE", "#FF8042"];

  // Bar Chart Data (User Liked Meals)
//   const likedMealsData = meals.map((meal) => ({
//         name: meal.name || "Unknown",
//         likes: meal.likedBy?.length || 0,
//       }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Meals Over Time (Line Chart) */}
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Meal Requests Over Time</h2>
        <ResponsiveContainer width="100%" height={250}>
        {mealData.length === 0 ? (
  <p className="text-center text-gray-500">No meal requests yet.</p>
) : (
  <LineChart data={mealData}>
    <XAxis dataKey="day" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="count" stroke="#4CAF50" strokeWidth={2} />
  </LineChart>
)}
        </ResponsiveContainer>
      </div>

      {/* User Role Distribution (Pie Chart) */}
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold mb-4">User Role Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={roleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
              {roleData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* user like meals */}
      {/* <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">User Liked Meals</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={likedMealsData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="likes" fill="#FF5733" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
