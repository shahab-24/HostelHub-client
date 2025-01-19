import React from "react";

const UserDashboard = () => {
  // Static Data for demonstration
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
    badges: ["Bronze", "Gold"],
  };

  const requestedMeals = [
    { id: 1, title: "Burger", likes: 120, reviews_count: 12, status: "Pending" },
    { id: 2, title: "Pizza", likes: 200, reviews_count: 20, status: "Approved" },
  ];

  const userReviews = [
    { id: 1, title: "Pasta", likes: 150, review: "Tasty and fresh!" },
    { id: 2, title: "Salad", likes: 90, review: "Healthy and delicious!" },
  ];

  const paymentHistory = []; // Example: No payment history

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* My Profile */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">My Profile</h2>
          <div className="flex items-center space-x-6">
            <img
              src={userData.image}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-blue-500"
            />
            <div>
              <h3 className="text-xl font-semibold">{userData.name}</h3>
              <p className="text-gray-500">{userData.email}</p>
              <div className="flex space-x-2 mt-2">
                {userData.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="badge badge-success text-sm font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requested Meals */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Requested Meals</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Likes</th>
                  <th>Reviews</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requestedMeals.map((meal) => (
                  <tr key={meal.id}>
                    <td>{meal.title}</td>
                    <td>{meal.likes}</td>
                    <td>{meal.reviews_count}</td>
                    <td>{meal.status}</td>
                    <td>
                      <button className="btn btn-sm btn-error">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* My Reviews */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Likes</th>
                  <th>Review</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userReviews.map((review) => (
                  <tr key={review.id}>
                    <td>{review.title}</td>
                    <td>{review.likes}</td>
                    <td>{review.review}</td>
                    <td className="space-x-2">
                      <button className="btn btn-sm btn-primary">Edit</button>
                      <button className="btn btn-sm btn-error">Delete</button>
                      <button className="btn btn-sm btn-success">View Meal</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment History */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Payment History</h2>
          {paymentHistory.length ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>{payment.date}</td>
                      <td>${payment.amount}</td>
                      <td>{payment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No payment history found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
