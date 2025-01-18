
import { useNavigate } from 'react-router-dom';

const BannerSection = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    navigate(`/search?query=${query}`);
  };

  return (
    <div 
      className="relative h-screen flex items-center justify-center bg-cover bg-center text-white" 
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?hostel,dorm')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 max-w-3xl text-center px-4 animate__animated animate__fadeIn animate__delay-1s">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 transition-all duration-500 ease-in-out">
          Welcome to Your Hostel Management Solution
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 transition-all duration-500 ease-in-out">
          Effortlessly manage meals, reviews, and requests for a seamless university hostel experience.
        </p>
        <form onSubmit={handleSearch} className="flex justify-center items-center">
          <input
            type="text"
            name="search"
            placeholder="Search for meals, categories, or more..."
            className="input input-bordered w-2/3 sm:w-3/4 md:w-1/2 max-w-lg py-2 px-4 rounded-l-lg focus:outline-none text-black"
          />
          <button
            type="submit"
            className="btn btn-primary py-2 px-6 rounded-r-lg transition-all duration-300 ease-in-out hover:bg-blue-700">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default BannerSection;
