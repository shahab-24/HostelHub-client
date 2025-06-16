import Typewriter from "typewriter-effect"; // Import Typewriter.js
import { Link } from "react-router-dom";
import logo from "../../assets/logo3.png";

const Footer = () => {
  return (
    <footer className="bg-[#1E1E2F] text-gray-300 py-8 px-4 md:px-10 rounded-t-lg">
      {/* Logo & Name */}
      <div className="flex flex-col items-center space-y-2">
        <img src={logo} alt="HostelHub Logo" className="rounded-lg w-16 h-16" />
        <span className="text-2xl font-semibold title-color">
          <Typewriter
            options={{
              strings: ["HostelHub"],
              autoStart: true,
              loop: true,
              delay: 100,
            }}
          />
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 flex flex-wrap justify-center space-x-4 text-sm">
        {[
          { to: "/", label: "Home" },
          { to: "/meals", label: "Meals" },
          { to: "/upcoming-meals", label: "Upcoming" },
          { to: "/signup", label: "Join" },
          { to: "/about-me", label: "About" },
          { to: "/dashboard", label: "Dashboard" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="hover:text-blue-400 transition-all duration-300"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Social Media Links */}
      <div className="mt-4 flex justify-center space-x-4">
        <a
          href="https://www.linkedin.com/in/shahab-uddin24/"
          className="text-gray-400 hover:text-blue-500 transition duration-300"
        >
          <i className="fab fa-linkedin text-2xl"></i>
        </a>
        <a
          href="https://github.com/shahab-24"
          className="text-gray-400 hover:text-white transition duration-300"
        >
          <i className="fab fa-github text-2xl"></i>
        </a>
        <a
          href="https://www.facebook.com/shawonctg22"
          className="text-gray-400 hover:text-blue-600 transition duration-300"
        >
          <i className="fab fa-facebook text-2xl"></i>
        </a>
      </div>

      {/* Copyright */}
      <p className="mt-4 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} HostelHub. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
