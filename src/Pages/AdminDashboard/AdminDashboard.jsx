import {
        LineChart,
        Line,
        XAxis,
        YAxis,
        Tooltip,
        ResponsiveContainer,
        PieChart,
        Pie,
        Cell,
        BarChart,
        Bar,
      } from "recharts";
      import { useEffect, useState } from "react";
      import useAxiosSecure from "../../hooks/useAxiosSecure";
      import useAxiosPublic from "../../hooks/useAxiosPublic";
      import useAuth from "../../hooks/useAuth";
      import { Loader } from "lucide-react";
      
      const AdminDashboard = () => {
        const [users, setUsers] = useState([]);
        const [meals, setMeals] = useState([]);
        const { loading } = useAuth();
      
        const axiosSecure = useAxiosSecure();
        const axiosPublic = useAxiosPublic();
      
        useEffect(() => {
          axiosSecure("/api/users").then((res) => setUsers(res.data));
          axiosPublic("/api/meals").then((res) => setMeals(res.data?.meals));
        }, [axiosPublic, axiosSecure]);
      
        const mealData = meals?.map((meal) => ({
          title: meal.title,
          rating: meal.rating,
        }));
      
        const roleData = [
          {
            name: "Users",
            value: users.filter((user) => user.role === "user").length,
          },
          {
            name: "Admins",
            value: users.filter((user) => user.role === "admin").length,
          },
        ];
      
        const COLORS = ["#3B82F6", "#F97316"];
      
        const likedMealsData = meals.map((meal) => ({
          name: meal.title || "Unknown",
          likes: meal.likes?.length || 0,
        }));
      
        if (loading)
          return (
            <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-blue-50 to-purple-100">
              <Loader className="animate-spin h-12 w-12 text-blue-600" />
            </div>
          );
      
        return (
          <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-purple-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Admin Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Meal Rating (Line Chart) */}
              <div className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl transition duration-300">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Meal Ratings
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  {mealData.length === 0 ? (
                    <p className="text-center text-gray-500">
                      No meal data available.
                    </p>
                  ) : (
                    <LineChart data={mealData}>
                      <XAxis dataKey="title" />
                      <YAxis dataKey="rating" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="#10B981"
                        strokeWidth={3}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
      
              {/* User Role Distribution (Pie Chart) */}
              <div className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl transition duration-300">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  User Role Distribution
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={roleData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                    >
                      {roleData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
      
              {/* User Liked Meals (Bar Chart) */}
              <div className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl transition duration-300">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  User Liked Meals
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={likedMealsData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="likes" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      };
      
      export default AdminDashboard;
      