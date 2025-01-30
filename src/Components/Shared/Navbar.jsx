import { Link, NavLink } from "react-router-dom";
import img from "../../assets/logo2.webp";
import useAuth from "../../hooks/useAuth";


const Navbar = ({likedMeals}) => {
  const { user, logOut } = useAuth();
 

 

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/meals">Meals</NavLink></li>
      <li><NavLink to="/upcoming-meals">Upcoming Meals</NavLink></li>
      <li><NavLink to="/signup">Join Us</NavLink></li>
      <li><NavLink to="/about-me">About Me</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
  );

  return (
    <div className="bg-base-200 fixed w-full z-50 shadow-md">
      <div className="navbar px-4 py-3 lg:px-16 font-roboto flex justify-between items-center">
        
        {/* Navbar Start */}
        <div className="flex items-center gap-2">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" aria-label="Open Menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] w-52 bg-base-100 rounded-box shadow">
              {links}
            </ul>
          </div>
          <img alt="Logo" src={img} className="w-10 rounded-lg hidden lg:block" />
          <a className="btn btn-ghost text-xl font-poppins">HostelHub</a>
        </div>

        {/* Navbar Center */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="flex items-center gap-4">
          {/* Like Notification Bell */}
          <div className="relative">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          {likedMeals > 0 && (
            <span className="badge badge-sm bg-red-500 text-white absolute top-0 right-0">
              {likedMeals}
            </span>
          )}
        </div>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user?.photoURL || "user Photo"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] w-32 bg-base-100 rounded-box shadow">
              <li><a>{user?.displayName || "User Name"}</a></li>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li>
                {user?.email ? (
                  <button onClick={logOut} className="btn btn-sm">Logout</button>
                ) : (
                  <Link to="/login"><button className="btn btn-sm">Login</button></Link>
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
