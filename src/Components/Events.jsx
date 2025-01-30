
import { motion } from "framer-motion";
import 'animate.css';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Burger Night",
      date: "Jan 20, 2025",
      details: "Enjoy unlimited burgers this Friday!",
      image: "https://i.ibb.co.com/FbD9DHKR/burger.jpg", // Replace with real image URL
    },
    {
      id: 2,
      title: "Pizza Night",
      date: "Jan 27, 2025",
      details: "Special pizzas on the menu!",
      image: "https://i.ibb.co.com/XmSD0RV/pizza.jpg", // Replace with real image URL
    },
    {
      id: 3,
      title: "Dessert Day",
      date: "Feb 3, 2025",
      details: "Indulge in sweet treats all day.",
      image: "https://i.ibb.co.com/0RJPcJVf/dessert.jpg", // Replace with real image URL
    },
  ];

  return (
    <section className="py-10 px-4 md:px-10 bg-gradient-to-r from-blue-50 via-gray-50 to-blue-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600 animate__animated animate__fadeIn animate__delay-1s">
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 animate__animated animate__fadeIn"
          >
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 rounded-lg"></div>
            </div>
            <h3 className="text-xl font-bold text-blue-500 mb-3">{event.title}</h3>
            <p className="text-gray-500 mb-2">{event.date}</p>
            <p className="text-gray-700">{event.details}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Events;
