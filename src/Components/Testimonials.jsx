import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      room: "Room 101",
      text: "The food feels like home!",
      image: "https://i.pravatar.cc/100?img=1", 
    },
    {
      id: 2,
      name: "John Smith",
      room: "Room 202",
      text: "I love the variety in meals every day!",
      image: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Alice Johnson",
      room: "Room 303",
      text: "Best hostel dining experience ever!",
      image: "https://i.pravatar.cc/100?img=3",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-gray-100">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10"
      >
        What Our Students Say
      </motion.h2>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-xl rounded-2xl p-6 text-center relative overflow-hidden"
          >
            <FaQuoteLeft className="text-gray-300 text-4xl absolute top-4 left-4" />
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 mx-auto rounded-full border-4 border-blue-400 shadow-md"
            />
            <p className="text-gray-600 italic my-4">"{testimonial.text}"</p>
            <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
            <p className="text-blue-500 font-medium">{testimonial.room}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
