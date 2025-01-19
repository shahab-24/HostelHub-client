import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
        return (
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="bg-gray-800 text-white w-64 p-4">
              <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
              <nav>
                <ul className="space-y-2">
                  <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Profile</a></li>
                  <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Manage Users</a></li>
                  <li><NavLink to='admin/add-meals' className="block py-2 px-4 hover:bg-gray-700 rounded">Add Meals</NavLink></li>
                </ul>
              </nav>
            </aside>
      
            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
              <h2 className="text-xl font-bold">Dashboard Content</h2>
              <div className="mt-6 bg-white shadow rounded-lg p-6">Main content goes here.</div>
              <Outlet></Outlet>
            </main>
          </div>
        );
      };
export default DashboardLayout;      