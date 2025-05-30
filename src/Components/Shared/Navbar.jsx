import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import img from "../../assets/logo3.png";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { ThemeContext } from "../../Context/ThemeProvider";

const Navbar = ({ likedMeals }) => {
        const [scrolled, setScrolled] = useState(false)
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [role] = useRole();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate(
      role === "admin" ? "/dashboard/admin-dashboard" : "/dashboard/user-dashboard",
      { replace: true }
    );
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/meals", label: "Meals" },
    { to: "/upcoming-meals", label: "Upcoming" },
    { to: "/signup", label: "Join" },
    { to: "/about-me", label: "About" },
  ];

  useEffect(() => {
        const handleScroll = () => {
setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
  },[])

  return (
        <header className={`bg-transparent scroll:backdrop-blur-md shadow-md fixed top-0 w-full z-50 transition-all duration-300 ${ scrolled ? 'backdrop-blur-md shadow-md bg-base-100/80' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 text-gray-400 dark:text-white sm:px-6 lg:px-8 flex items-center justify-between h-16">
          
          {/* Logo and Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden btn btn-ghost btn-circle text-xl transition hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
            <img src={img} alt="Logo" className="h-8 w-8 md:w-12 md:h-12 rounded-full shadow" />
            <Link
              to="/"
              className="text-md hidden md:flex md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text tracking-wide"
            >
              HostelHub
            </Link>
          </div>
      
          {/* Center NavLinks */}
          <ul className="hidden lg:flex gap-4 items-center">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `btn btn-sm btn-ghost text-sm font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md scale-105"
                        : "hover:bg-primary hover:text-white focus:outline focus:outline-primary"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            {user && (
              <li>
                <button
                  onClick={handleDashboard}
                  className={({ isActive }) =>
                        `btn btn-sm btn-ghost text-sm font-medium rounded-full "hover:bg-primary hover:text-white focus:outline focus:outline-primary transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md scale-105"
                            : "hover:bg-primary hover:text-white focus:outline focus:outline-primary"
                        }`
                      }
                >
                  Dashboard
                </button>
              </li>
            )}
          </ul>
      
          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-circle transition hover:scale-110"
              title={theme === "light" ? "Dark Mode" : "Light Mode"}
            >
              {theme === "light" ? "🌙" : "🌞"}
            </button>
      
            {/* Notification Icon */}
            <div className="relative">
              <button className="btn btn-sm btn-ghost btn-circle hover:scale-105 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586L3.707 14.879A1 1 0 004.414 16h11.172a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                </svg>
              </button>
              {likedMeals > 0 && (
                <span className="absolute top-0 right-0 badge badge-sm badge-secondary">
                  {likedMeals}
                </span>
              )}
            </div>
      
            {/* Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-circle avatar btn-ghost">
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/LkVLG6K/default-user.png"}
                    alt="user avatar"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-3 shadow-lg bg-base-100 rounded-box w-44 text-sm space-y-1"
              >
                <li>
                  <span className="font-semibold">{user?.displayName || "User"}</span>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  {user?.email ? (
                    <button
                      onClick={logOut}
                      className="btn btn-error btn-sm text-white w-full"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" className="btn btn-success btn-sm text-white w-full">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      
        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="lg:hidden px-4 pb-4 pt-2 bg-base-100/80 backdrop-blur-md shadow-md">
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                        isActive
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow"
                          : "hover:bg-primary hover:text-white"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              {user && (
                <li>
                  <button
                    onClick={handleDashboard}
                    className="btn btn-outline btn-sm w-full mt-2 hover:bg-primary hover:text-white"
                  >
                    Dashboard
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>
      
  );
};

export default Navbar;
