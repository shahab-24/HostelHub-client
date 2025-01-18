import React, { useState } from "react";

const UpcomingMeals = () => {
  // Static meal data
  const meals = [
    {
      id: 1,
      name: "Spring Veggie Pizza",
      date: "Jan 25, 2025",
      description: "A delicious pizza with fresh spring vegetables.",
      likes: 10,
      isLiked: false,
    },
    {
      id: 2,
      name: "Grilled Salmon",
      date: "Feb 1, 2025",
      description: "Tender salmon grilled to perfection.",
      likes: 15,
      isLiked: false,
    },
    {
      id: 3,
      name: "Tropical Fruit Smoothie",
      date: "Feb 10, 2025",
      description: "A refreshing blend of tropical fruits.",
      likes: 8,
      isLiked: false,
    },
  ];

  // Premium user roles for demo
  const userRole = "Gold"; // Change to "Bronze" to test restriction

  // State for meals
  const [mealData, setMealData] = useState(meals);

  // Handle like functionality
  const handleLike = (id) => {
    if (userRole === "Silver" || userRole === "Gold" || userRole === "Platinum") {
      setMealData((prevData) =>
        prevData.map((meal) =>
          meal.id === id
            ? { ...meal, likes: meal.isLiked ? meal.likes - 1 : meal.likes + 1, isLiked: !meal.isLiked }
            : meal
        )
      );
    } else {
      alert("Only premium users can like meals!");
    }
  };

  return (
    <div className="px-4 md:px-10 py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Upcoming Meals
      </h2>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealData.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            {/* Meal Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-500 mb-2">{meal.name}</h3>
              <p className="text-gray-400 mb-4">Available on: {meal.date}</p>
              <p className="text-gray-600">{meal.description}</p>
            </div>

            {/* Like Button */}
            <div className="p-4 border-t flex items-center justify-between">
              <button
                className={`py-2 px-4 rounded-md text-sm font-medium ${
                  meal.isLiked
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                onClick={() => handleLike(meal.id)}
              >
                {meal.isLiked ? "Liked 👍" : "Like 👍"}
              </button>
              <span className="text-gray-500">{meal.likes} Likes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeals;
