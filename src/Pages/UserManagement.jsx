// import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

// Fetch users with search functionality
// const fetchUsers = async (search) => {
//   const { data } = await axios.get(`/api/users?search=${search}`);
//   return data;
// };

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
//   const [search, setSearch] = useState('');

//   const { data: users, isLoading, error } = useQuery({
//         queryKey: ['users', search],
//         queryFn: () => fetchUsers(search),
//         keepPreviousData: true,
//       });
      

  const { data: users, isLoading, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
                const {data} = await axiosSecure('/users')
                return data
        }
      });
      console.log(users)
      
      if (!Array.isArray(users)) {
        console.error("Invalid response data:", users);
        return <p className="text-red-500">Invalid user data</p>;  // Error message when data is invalid
      }

  const handleMakeAdmin = async (userId) => {
    try {
      await axiosSecure.patch(`/api/users/${userId}`);
      toast.success('User role updated to admin');
      refetch()
    } catch (err) {
      toast.error('Error updating user role');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
          placeholder="Search by username or email"
        />
        {isLoading && <span className="text-sm text-gray-500">Loading...</span>}
      </div> */}

      {error && <p className="text-red-500">Error loading users</p>}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.name || 'Unknown'}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  {user.role !== 'admin' && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
