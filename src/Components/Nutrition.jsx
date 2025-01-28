
import { motion } from "framer-motion";

const Nutrition = () => {
  const nutritionItems = [
    { id: 1, name: "Grilled Chicken Salad", calories: 250, benefits: "High in Protein and Fiber" },
    { id: 2, name: "Vegetable Stir Fry", calories: 200, benefits: "Rich in Vitamins and Low Fat" },
    { id: 3, name: "Fruit Smoothie", calories: 150, benefits: "Boosts Energy and Immune System" },
  ];

  return (
    <section className="py-10 bg-blue-50">
      <h2 className="text-2xl font-bold text-center mb-6">Nutritional Benefits</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {nutritionItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            className="bg-white shadow-lg rounded-lg p-6 w-80"
          >
            <h3 className="text-lg font-bold text-blue-600 mb-2">{item.name}</h3>
            <p className="text-gray-600">Calories: {item.calories}</p>
            <p className="text-gray-600">{item.benefits}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Nutrition;
