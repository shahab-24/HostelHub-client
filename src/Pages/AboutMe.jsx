import { FaUtensils, FaChartPie, FaWallet, FaLeaf } from "react-icons/fa";
import { ThemeContext } from "../Context/ThemeProvider";
import { useContext } from "react";

const AboutMe = () => {
        const {theme, toggleTheme} = useContext(ThemeContext)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-6 pt-20">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold title-color mb-4">About HostelHub</h1>
        <p className="text-gray-600 text-lg">
          A smart food management platform that makes hostel meal planning and tracking easy for students and hostel admins.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {/* Meal Management Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <FaUtensils className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Meal Management</h3>
          <p className="text-gray-600 text-sm mt-2">Plan, schedule, and track meals effortlessly.</p>
        </div>

        {/* Food Preferences Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <FaChartPie className="text-4xl text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Food Preferences</h3>
          <p className="text-gray-600 text-sm mt-2">Students can provide feedback to improve meals.</p>
        </div>

        {/* Subscription & Billing Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <FaWallet className="text-4xl text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Billing & Payments</h3>
          <p className="text-gray-600 text-sm mt-2">Manage meal subscriptions and payments easily.</p>
        </div>

        {/* Waste Reduction Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
          <FaLeaf className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Waste Reduction</h3>
          <p className="text-gray-600 text-sm mt-2">Optimize food resources and reduce waste.</p>
        </div>
      </div>

      {/* Technology Section */}
      {/* <div className="mt-12 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-800">Powered by Modern Technologies</h2>
        <p className="text-gray-600 mt-2">We use cutting-edge tools to provide a seamless and efficient experience.</p>
        <div className="flex justify-center gap-6 mt-4 text-lg font-semibold text-white">
          <span className="bg-blue-500 px-4 py-2 rounded-lg">React</span>
          <span className="bg-yellow-500 px-4 py-2 rounded-lg">Firebase</span>
          <span className="bg-green-500 px-4 py-2 rounded-lg">MongoDB</span>
          <span className="bg-gray-800 px-4 py-2 rounded-lg">Express.js</span>
        </div>
      </div> */}
    </div>
  );
};

export default AboutMe;
