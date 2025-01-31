import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loader from "../Components/Shared/Loader";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion"; // Added for animation

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
  const [loading, setLoading] = useState(true); // Added loading state

  // Fetch meals function
  const fetchMeals = useCallback(async (currentPage = 1, reset = false) => {
    setLoading(true); // Set loading true while fetching
    try {
      const { data } = await axiosPublic.get("/api/meals", {
        params: {
          search,
          category,
          minPrice,
          maxPrice,
          page: currentPage,
          limit: 10,
          sortBy,
          order,
        },
      });

      if (data?.meals?.length < 10) setHasMore(false);

      setMeals((prev) =>
        reset ? data.meals : [...prev, ...data.meals.filter((newMeal) => !prev.some((meal) => meal._id === newMeal._id))]
      );
      setPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false); // Set loading false after fetching is done
    }
  }, [search, category, minPrice, maxPrice, sortBy, order, axiosPublic]);

  // Initial fetch
  useEffect(() => {
    fetchMeals(1, true);
  }, [fetchMeals]);

  // Reset and fetch new meals on filter change
  const handleFilterChange = () => {
    setPage(1);
    setHasMore(true);
    fetchMeals(1, true);
  };

  return (
    <div className="px-4 md:px-10 py-10 bg-gradient-to-r from-blue-200 to-blue-500 min-h-screen">
      <Helmet>
        <title>Meals Menu | HotelHub</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Meals Menu</h2>

      {/* Filter and Sorting Section */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-md shadow-sm w-full sm:w-60"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded-md shadow-sm w-full sm:w-40"
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-3 rounded-md shadow-sm w-full sm:w-32"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-3 rounded-md shadow-sm w-full sm:w-32"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-3 rounded-md shadow-sm w-full sm:w-40"
        >
          <option value="likes">Sort by Likes</option>
          <option value="reviews">Sort by Reviews</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border p-3 rounded-md shadow-sm w-full sm:w-32"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button
          onClick={handleFilterChange}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Apply Filters
        </button>
      </div>

      {/* Meals List */}
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchMeals}
        hasMore={hasMore}
        loader={<Loader key={0} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals?.map((meal) => (
            <motion.div
              key={meal._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition flex flex-col h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full h-52 object-cover rounded-t-lg"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{meal.title}</h3>
                <p className="text-gray-500">Category: {meal.category}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{meal.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-blue-600 font-semibold text-lg">${meal.price}</p>
                  <p className="text-gray-500 text-sm">Likes: {meal.likes} | Reviews: {meal.reviews_count}</p>
                </div>
                {/* Button stays at the bottom of the card */}
                <Link
                  to={`/api/meals/${meal._id}`}
                  className="mt-auto block w-full bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MealsPage;
