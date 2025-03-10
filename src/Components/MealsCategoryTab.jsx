import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MealsCategoryTab = ({ items }) => {
//   console.log(items);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Image Section */}
          <div className="overflow-hidden rounded-lg mb-4">
            <motion.img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Content Section */}
         <div className="flex justify-between">
         <h2 className="text-lg font-bold text-blue-600 mb-2">{item.title}
         </h2>
         <h2 className="text-lg font-bold text-blue-600 mb-2">Rating: {" "}
          <span className="text-yellow-500">{item?.rating || 0}</span></h2>
         </div>
          <h3 className="text-lg font-bold mb-2 text-gray-800 font-roboto">{item.name}</h3>
          <p className="text-gray-600 mb-4 font-roboto">{item.description}</p>
          <p className="text-blue-500 font-semibold text-lg font-roboto">$ {item.price}</p>

          {/* Button */}
          <Link to={`/api/meals/${item._id}`}>
          <button className="relative mt-4 px-6 py-3 font-bold text-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg 
                         transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
        View Details
          </button>
          </Link>
         
        </motion.div>
      ))}
    </div>
  );
};

export default MealsCategoryTab;
