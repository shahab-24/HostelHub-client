import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import img from "../assets/logo3.png";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../Context/ThemeProvider";

const DashboardNavbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-gray-200 shadow-md px-4 md:px-10 ">
   
      <div className="flex-1">
        <img className="w-10 h-10 mr-2" src={img} />
        <Link
          to="/dashboard"
          className="text-xl hidden md:flex md:text-2xl font-bold title-color"
        >
          HostelHub
        </Link>
      </div>

      
      <div className="flex-none gap-3 items-center">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-sm text-xl tooltip tooltip-bottom"
          data-tip={
            theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
          }
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>

        {/* User Info (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-2">
          <FaUserCircle className="text-3xl text-base-content" />
          <p className="text-base-content">{user?.displayName || "User"}</p>
        </div>

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-circle btn-ghost avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  user?.photoURL || "https://i.ibb.co/LkVLG6K/default-user.png"
                }
                alt="User Avatar"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-100 rounded-box w-52"
          >
            <li>
              <span className="font-semibold">
                {user?.displayName || "User"}
              </span>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              {user?.email && (
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm w-full bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
