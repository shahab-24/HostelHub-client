import "animate.css";
import { FaShieldAlt, FaUtensils, FaUsers, FaWifi } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    { id: 1, icon: <FaShieldAlt />, title: "Safe & Secure", desc: "24/7 security and verification" },
    { id: 2, icon: <FaUtensils />, title: "Healthy Meals", desc: "Nutritious and tasty food" },
    { id: 3, icon: <FaUsers />, title: "Community", desc: "Connect with like-minded students" },
    { id: 4, icon: <FaWifi />, title: "Free Wi-Fi", desc: "High-speed internet access" },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold animate__animated animate__fadeInUp">
          ⭐ Why Choose Us?
        </h2>
        <p className="mt-2 text-gray-300 animate__animated animate__fadeInUp animate__delay-1s">
          Experience the best hostel living with premium facilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-6">
        {features.map((feature, index) => (
          <div 
            key={feature.id} 
            className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center relative overflow-hidden 
                      animate__animated animate__fadeInUp"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            {/* Floating Icon Animation */}
            <div className="flex justify-center">
              <div className="text-5xl text-yellow-400 animate__animated animate__pulse animate__infinite">
                {feature.icon}
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-400 mt-2">{feature.desc}</p>

            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-yellow-400 opacity-10 blur-2xl"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
