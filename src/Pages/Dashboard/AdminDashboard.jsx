import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AdminDashboard = () => {
  const [upcomingMealsModal, setUpcomingMealsModal] = useState(false);

  // Static Data for demonstration
  const adminData = {
    name: "Admin Name",
    email: "admin@example.com",
    mealsAdded: 25,
  };

  const users = [
    { id: 1, username: "John Doe", email: "john@example.com", subscription: "Gold" },
    { id: 2, username: "Jane Smith", email: "jane@example.com", subscription: "Bronze" },
  ];

  const meals = [
    { id: 1, title: "Burger", likes: 120, reviews_count: 10, rating: 4.5, distributor: "Admin Name" },
    { id: 2, title: "Pizza", likes: 200, reviews_count: 25, rating: 4.8, distributor: "Admin Name" },
  ];

  const reviews = [
    { id: 1, title: "Pasta", likes: 150, reviews_count: 20 },
    { id: 2, title: "Salad", likes: 90, reviews_count: 12 },
  ];

  const requestedMeals = [
    { id: 1, title: "Soup", user: "John Doe", email: "john@example.com", status: "Pending" },
  ];

  const { register, handleSubmit, reset } = useForm();

  const onSubmitMeal = (data) => {
    console.log("Meal Data:", data);
    reset(); // Clear the form after submission
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Profile */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
          <div className="flex items-center space-x-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Admin"
              className="w-24 h-24 rounded-full border-2 border-blue-500"
            />
            <div>
              <h3 className="text-xl font-semibold">{adminData.name}</h3>
              <p className="text-gray-500">{adminData.email}</p>
              <p className="text-gray-700 mt-2">
                Meals Added: <span className="font-bold">{adminData.mealsAdded}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Manage Users */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Subscription</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.subscription}</td>
                    <td>
                      <button className="btn btn-sm btn-primary">Make Admin</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add Meal */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Add Meal</h2>
          <form onSubmit={handleSubmit(onSubmitMeal)} className="grid grid-cols-1 gap-6">
            <input
              type="text"
              {...register("title")}
              placeholder="Meal Title"
              className="input input-bordered"
            />
            <input
              type="text"
              {...register("category")}
              placeholder="Category"
              className="input input-bordered"
            />
            <textarea
              {...register("description")}
              placeholder="Description"
              className="textarea textarea-bordered"
            />
            <input
              type="number"
              {...register("price")}
              placeholder="Price"
              className="input input-bordered"
            />
            <input
              type="text"
              {...register("distributor")}
              value={adminData.name}
              readOnly
              className="input input-bordered bg-gray-200"
            />
            <input
              type="email"
              {...register("email")}
              value={adminData.email}
              readOnly
              className="input input-bordered bg-gray-200"
            />
            <button type="submit" className="btn btn-primary">
              Add Meal
            </button>
          </form>
        </section>

        {/* All Meals */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">All Meals</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Likes</th>
                  <th>Reviews</th>
                  <th>Rating</th>
                  <th>Distributor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => (
                  <tr key={meal.id}>
                    <td>{meal.title}</td>
                    <td>{meal.likes}</td>
                    <td>{meal.reviews_count}</td>
                    <td>{meal.rating}</td>
                    <td>{meal.distributor}</td>
                    <td className="space-x-2">
                      <button className="btn btn-sm btn-primary">Update</button>
                      <button className="btn btn-sm btn-error">Delete</button>
                      <button className="btn btn-sm btn-success">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Serve Meals */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Serve Meals</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requestedMeals.map((meal) => (
                  <tr key={meal.id}>
                    <td>{meal.title}</td>
                    <td>{meal.user}</td>
                    <td>{meal.email}</td>
                    <td>{meal.status}</td>
                    <td>
                      <button className="btn btn-sm btn-success">Serve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
