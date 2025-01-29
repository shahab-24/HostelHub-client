import { useState, useCallback } from "react";
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
  const [sortBy, setSortBy] = useState("likes");
  const [order, setOrder] = useState("desc");
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch meals function
  const fetchMeals = useCallback(async (currentPage) => {
    try {
      const { data } = await axiosPublic.get("/api/meals", {
        params: {
          search,
          category,
          minPrice,
          maxPrice,
          page: currentPage,
          limit: 10, // Fetch 10 meals per request
          sortBy, // Sort field: likes or reviews
          order, // Order: asc or desc
        },
      });

      // Stop fetching if fewer meals are returned
      if (data?.meals?.length < 10) setHasMore(false);

      // Prevent duplicate meals
      setMeals((prev) => [
        ...prev,
        ...data.meals.filter((newMeal) => !prev.some((meal) => meal._id === newMeal._id)),
      ]);

      setPage((prev) => prev + 1); // Increment page number
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  }, [search, category, minPrice, maxPrice, sortBy, order, axiosPublic]);

  // Reset meals and fetch with new filters or sorting
  const handleFilterChange = () => {
    setMeals([]); // Clear existing meals
    setPage(1); // Reset page to 1
    setHasMore(true); // Allow InfiniteScroll to continue
    fetchMeals(1); // Fetch meals with updated filters/sorting
  };

  return (
    <div className="px-4 md:px-10 py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Meals Menu</h2>

      {/* Filter and Sorting Section */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-3 rounded-md shadow-sm w-full sm:w-60"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-3 rounded-md shadow-sm w-full sm:w-40"
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
        <div className="flex gap-4 w-full sm:w-auto">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 p-3 rounded-md shadow-sm w-full sm:w-32"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 p-3 rounded-md shadow-sm w-full sm:w-32"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 p-3 rounded-md shadow-sm w-full sm:w-40"
        >
          <option value="likes">Sort by Likes</option>
          <option value="reviews">Sort by Reviews</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border border-gray-300 p-3 rounded-md shadow-sm w-full sm:w-32"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button
          onClick={handleFilterChange}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 w-full sm:w-auto mt-4 sm:mt-0"
        >
          Apply Filters
        </button>
      </div>

      {/* Infinite Scroll Section */}
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchMeals}
        hasMore={hasMore}
        loader={<Loader key={0} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals?.map((meal) => (
            <div key={meal._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <img
                src={meal?.image}
                alt={meal.title}
                className="w-full h-52 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{meal.title}</h3>
                <p className="text-gray-500 mb-2">Category: {meal?.category}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{meal?.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-blue-600 font-semibold text-lg">${meal?.price}</p>
                  <p className="text-gray-500 text-sm">
                    Likes: {meal?.likes} | Reviews: {meal.reviews_count}
                  </p>
                </div>
                <Link
                  to={`/api/meals/${meal._id}`}
                  className="block w-full bg-blue-500 text-white text-center py-3 rounded-md hover:bg-blue-600 transition"
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
