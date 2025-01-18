import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const MealsPage = () => {
  // Static meal data
  const allMeals = [
    { id: 1, name: "Grilled Chicken Salad", category: "Lunch", price: 12.99 },
    { id: 2, name: "Veggie Burger", category: "Dinner", price: 9.99 },
    { id: 3, name: "Pancakes", category: "Breakfast", price: 7.49 },
    { id: 4, name: "Smoothie", category: "Snacks", price: 5.99 },
    { id: 5, name: "Steak", category: "Dinner", price: 24.99 },
    { id: 6, name: "Caesar Salad", category: "Lunch", price: 10.99 },
    { id: 7, name: "French Toast", category: "Breakfast", price: 8.99 },
    { id: 8, name: "Pizza", category: "Dinner", price: 15.99 },
    // Add more static data as needed
  ];

  // State for meals, filters, and pagination
  const [meals, setMeals] = useState(allMeals.slice(0, 4)); // Initial batch
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [hasMore, setHasMore] = useState(true);

  // Handle infinite scroll
  const fetchMoreMeals = () => {
    const currentLength = meals.length;
    const nextBatch = allMeals.slice(currentLength, currentLength + 4);
    setMeals((prevMeals) => [...prevMeals, ...nextBatch]);
    if (meals.length + nextBatch.length >= allMeals.length) setHasMore(false);
  };

  // Filter meals
  const filteredMeals = meals.filter((meal) => {
    const matchesSearch = meal.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category ? meal.category === category : true;
    const matchesPrice =
      meal.price >= priceRange[0] && meal.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="px-4 md:px-10 py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Meals Menu
      </h2>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search meals..."
          className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
        </select>

        {/* Price Range Filter */}
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], parseInt(e.target.value, 10)])
          }
          className="w-full md:w-1/4"
        />
        <p className="text-gray-500">
          Price: ${priceRange[0]} - ${priceRange[1]}
        </p>
      </div>

      {/* Meals Display with Infinite Scroll */}
      <InfiniteScroll
        dataLength={filteredMeals.length} // Current length of displayed meals
        next={fetchMoreMeals}
        hasMore={hasMore}
        loader={<h4 className="text-center">Loading more meals...</h4>}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-blue-600">{meal.name}</h3>
            <p className="text-gray-500">Category: {meal.category}</p>
            <p className="text-gray-700 font-semibold">Price: ${meal.price}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MealsPage;
