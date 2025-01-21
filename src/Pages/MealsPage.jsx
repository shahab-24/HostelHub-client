import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loader from "../Components/Shared/Loader";
import { Link } from "react-router-dom";

const MealsPage = () => {
  const axiosPublic = useAxiosPublic();

  // States for search, filters, and pagination
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch meals function
  const fetchMeals = async (page) => {
    const { data } = await axiosPublic.get("/api/meals", {
      params: {
        search,
        category,
        minPrice,
        maxPrice,
        page,
        limit: 10, // Adjust the limit as needed
      },
    });

    if (data.length < 10) setHasMore(false);
    setMeals((prev) => [...prev, ...data]);
  };

  // Handle search and filters
  const handleFilterChange = () => {
    setMeals([]);
    setPage(1);
    setHasMore(true);
    fetchMeals(1);
  };

  return (
    <div className="px-4 md:px-10 py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Meals Menu
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded-md shadow-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-md shadow-sm"
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="All-meals">All-meals</option>
        </select>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 p-2 rounded-md shadow-sm"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 p-2 rounded-md shadow-sm"
          />
        </div>
        <button
          onClick={handleFilterChange}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        pageStart={1}
        loadMore={() => fetchMeals(page)}
        hasMore={hasMore}
        loader={<Loader key={0} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              {/* Meal Image */}
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full h-52 object-cover rounded-t-lg"
              />

              {/* Meal Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-500 mb-2">
                  {meal.title}
                </h3>
                <p className="text-gray-400 mb-2">Category: {meal.category}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {meal.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-blue-500 font-semibold">${meal.price}</p>
                  <p className="text-gray-500 text-sm">
                    Likes: {meal.likes} | Reviews: {meal.reviews_count}
                  </p>
                </div>

                {/* Details Button */}
                <Link
                  to={`/api/meals/${meal._id}`}
                  className="block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition"
                  title={`View details for ${meal.title}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MealsPage;
