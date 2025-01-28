import { NavLink, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useRole from "../hooks/useRole";
import Loader from "../Components/Shared/Loader";

const DashboardLayout = () => {
        const {user} = useAuth()
        const [role, isLoading] = useRole()
        // console.log(user.role)
        

        if(isLoading) return <Loader></Loader>

        return (
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="bg-gray-800 text-white w-64 p-4">
              <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
             

              {role === 'admin' ? 
              (
                 <nav>
                 <Helmet>
                        <title>Admin | HostelHub</title>
                 </Helmet>
                <li><NavLink to='/' className="block py-2 px-4 hover:bg-gray-700 rounded">Home</NavLink></li>
                <ul className="space-y-2">

                <li><NavLink to='/dashboard/admin/profile' className="block py-2 px-4 hover:bg-gray-700 rounded">Admin Profile</NavLink></li>

                <li><NavLink to='/dashboard/admin/manage-users' className="block py-2 px-4 hover:bg-gray-700 rounded">Manage Users</NavLink></li>

                <li><NavLink to='/dashboard/admin/add-meals' className="block py-2 px-4 hover:bg-gray-700 rounded">Add Meals</NavLink></li>

                <li><NavLink to='/dashboard/admin/upcoming-meals' className="block py-2 px-4 hover:bg-gray-700 rounded">Add Upcoming Meals</NavLink></li>
                
                <li><NavLink to='/dashboard/admin/all-meals' className="block py-2 px-4 hover:bg-gray-700 rounded">All Meals</NavLink></li>

                <li><NavLink to='/dashboard/admin/all-reviews' className="block py-2 px-4 hover:bg-gray-700 rounded">All Reviews</NavLink></li>

                

                <li><NavLink to='/dashboard/admin/serve-meals' className="block py-2 px-4 hover:bg-gray-700 rounded">Serve Meals</NavLink></li>

                
                </ul>
              </nav> )
               :
              ( <nav>
                <Helmet>
                        <title>User | HostelHub</title>
                 </Helmet>
                <ul className="space-y-2">
                <li><NavLink to='/' className="block py-2 px-4 hover:bg-gray-700 rounded">Home</NavLink></li>
                <li><NavLink to='/dashboard/user-profile' className="block py-2 px-4 hover:bg-gray-700 rounded">Profile</NavLink></li>
                
                <li><NavLink to='/dashboard/requested-meals' className="block py-2 px-4 hover:bg-gray-700 rounded">Requested Meals</NavLink></li> 

                <li><NavLink to='/dashboard/my-reviews' className="block py-2 px-4 hover:bg-gray-700 rounded">My Reviews</NavLink></li>   

                <li><NavLink to='/dashboard/payment-history' className="block py-2 px-4 hover:bg-gray-700 rounded">Payment History</NavLink></li>        
                </ul>
                </nav>) }
              
             
            </aside>
      
            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
              <h2 className="text-xl font-bold">Dashboard Content</h2>
              {/* <div className="mt-6 bg-white shadow rounded-lg p-6">Main content goes here.</div> */}
              <Outlet></Outlet>
            </main>
          </div>
        );
      };
export default DashboardLayout;      