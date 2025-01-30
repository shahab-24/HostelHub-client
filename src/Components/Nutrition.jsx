import { motion } from "framer-motion";


const Nutrition = () => {
        
  const nutritionItems = [
    { id: 1, name: "Grilled Chicken Salad", calories: 250, benefits: "High in Protein and Fiber", imageUrl: "https://i.ibb.co.com/Gv7XHN7F/chicken-salad.jpg" },
    { id: 2, name: "Vegetable Stir Fry", calories: 200, benefits: "Rich in Vitamins and Low Fat", imageUrl: "https://i.ibb.co.com/fVkYWY2k/stir-fry.jpg" },
    { id: 3, name: "Fruit Smoothie", calories: 150, benefits: "Boosts Energy and Immune System", imageUrl: "https://i.ibb.co.com/HLGTkBMy/smoothe.jpg" },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-300">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Nutritional Benefits</h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row justify-center items-center gap-10"
        >
          
          <div className="text-white">
            <h3 className="text-2xl font-semibold mb-4">Enrich Your Health</h3>
            <p className="text-lg mb-4">Fuel your body with the best meals for your health and wellness.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {nutritionItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center justify-between w-full overflow-hidden"
            >
              <div className="relative w-full h-48 mb-6">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover w-full h-full rounded-lg transform transition duration-300 ease-in-out hover:scale-110"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-bold text-blue-600 mb-3">{item.name}</h3>
              <p className="text-gray-700 text-lg mb-3">Calories: {item.calories}</p>
              <p className="text-gray-600 text-sm">{item.benefits}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Nutrition;
