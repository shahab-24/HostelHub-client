
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    { id: 1, name: "Jane Doe", room: "Room 101", text: "The food feels like home!" },
    { id: 2, name: "John Smith", room: "Room 202", text: "I love the variety in meals every day!" },
    { id: 3, name: "Alice Johnson", room: "Room 303", text: "Best hostel dining experience ever!" },
  ];

  return (
    <section className="py-10 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Students Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
            <p className="text-blue-500 font-semibold">- {testimonial.name}, {testimonial.room}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
