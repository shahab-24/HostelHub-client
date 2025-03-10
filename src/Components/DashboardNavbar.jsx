import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const DashboardNavbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <FaUserCircle className="text-3xl text-gray-600" />
        <p className="text-gray-600">{user?.displayName || "User"}</p>
      </div>
    </div>
  );
};

export default DashboardNavbar;
