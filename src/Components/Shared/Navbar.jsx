import { Link, Navigate, NavLink, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import img from "../../assets/logo2.webp";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Navbar = ({ likedMeals }) => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State for dropdown
  const [role] = useRole()
//   console.log(role)
  const navigate = useNavigate()


  const handleDashboard = () => {
        if(role === 'admin'){
                navigate('/dashboard/admin-dashboard', {replace: true})
        }else{
                navigate('/dashboard/user-dashboard', {replace: true})}
        // console.log("Navigating to:", role === 'admin' ? '/dashboard/admin-dashboard' : '/dashboard/user-dashboard');
        // navigate(role === 'admin' ? '/dashboard/admin-dashboard' : '/dashboard/user-dashboard');
    }

  const links = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/meals", label: "Meals" },
        { to: "/upcoming-meals", label: "Upcoming" },
        { to: "/signup", label: "Join" },
        { to: "/about-me", label: "About" }
        
      ].map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `block w-full px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md text-center ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md scale-100"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
      {
        user && (
                <li>

                
                <button onClick={handleDashboard} className={({ isActive }) =>
              `block w-full px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md text-center ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md scale-100"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`
            }>
                                Dashboard
                        </button>
        
                        
                </li>
        )
      }
    </>

    
  );

  return (
    <div className="fixed w-full z-50 shadow-lg bg-[#1E1E2F] font-['Poppins'] bg-transparent">
      <div className="navbar px-4 py-2 lg:px-12 flex justify-between items-center text-white">
        {/* Navbar Start */}
        <div className="flex items-center gap-2">
          {/* Mobile Dropdown Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h8m-8 6h16"} />
            </svg>
          </button>

          {/* Logo */}
          <img alt="Logo" src={img} className="w-10 rounded-lg hidden lg:block" />
          <Link
            to="/"
            className="text-xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse"
          >
            HostelHub
          </Link>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`fixed top-16 left-4 bg-gray-800/95 backdrop-blur-md transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
          } lg:hidden flex flex-col justify-start items-start px-5 py-3 w-[50%] h-auto rounded-lg shadow-lg`}
        >
          <ul className="space-y-1">{links}</ul>
        </div>

        {/* Navbar Center */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal space-x-3 text-sm">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button className="btn btn-ghost btn-circle hover:bg-white hover:text-[#3498DB] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            {likedMeals > 0 && (
              <span className="badge badge-sm bg-green-500 text-white absolute top-0 right-0">
                {likedMeals}
              </span>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full border border-white">
                <img alt="User Avatar" src={user?.photoURL || "user Photo"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-2 w-36 bg-white text-gray-900 rounded-md shadow">
              <li><span className="font-semibold">{user?.displayName || "User"}</span></li>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li>
                {user?.email ? (
                  <button onClick={logOut} className="btn btn-sm bg-red-500 hover:bg-red-700 text-white w-full">Logout</button>
                ) : (
                  <Link to="/login">
                    <button className="btn btn-sm bg-green-500 hover:bg-green-700 text-white w-full">Login</button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
