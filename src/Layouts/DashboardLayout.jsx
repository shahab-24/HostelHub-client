import { NavLink, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loader from "../Components/Shared/Loader";
import { Menu, X } from "lucide-react"; 
import DashboardNavbar from "../Components/DashboardNavbar";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  const [menuOpen, setMenuOpen] = useState(false);
  const [text, setText] = useState("");
  const fullText = "Welcome to your Dashboard";

  // Ref for dropdown and event listener to detect clicks outside
  const dropdownRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText((prev) => fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);


  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

//   if (loading) return <Loader />;
//   if (loading) return <Loader />;

// if (!role && isLoading) return <Loader />;


  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Helmet>
        <title>Dashboard | HostelHub</title>
      </Helmet>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-white bg-gray-800"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <aside
        ref={dropdownRef}
        className={`${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static bg-gradient-to-r from-gray-700 to-gray-800 text-white w-64 md:w-72 p-4 transition-transform duration-300`}
      >
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {role === "admin" ? (
          <nav>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/profile"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/manage-users"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/add-meals"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Add Meals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/upcoming-meals-form"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Add Upcoming Meals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/all-meals"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  All Meals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/all-reviews"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  All Reviews
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/serve-meals"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Serve Meals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/publish-meals"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Publish Meals
                </NavLink>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/user-profile"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/requested-meals"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Requested Meals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-reviews"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  My Reviews
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded transition ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Payment History
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <motion.h2
          className="text-2xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {text}
          <span className="animate-pulse">|</span>
        </motion.h2>
        <div>
                <DashboardNavbar></DashboardNavbar>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
