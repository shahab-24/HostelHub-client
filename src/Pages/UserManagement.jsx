import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState(''); // Track search input

  // Fetch users based on the search query
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['users', search], // Include search in the query key
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?search=${search}`); // Send search query to the server
      return data;
    },
    keepPreviousData: true, // Keep old data while fetching new data
  });

  const handleMakeAdmin = async (userId) => {
    try {
      await axiosSecure.patch(`/users/${userId}`); // Update user role
      toast.success('User role updated to admin');
      refetch(); // Refresh data after updating
    } catch (err) {
      toast.error('Error updating user role');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state
          className="input input-bordered w-full max-w-xs"
          placeholder="Search by username or email"
        />
        {isLoading && <span className="text-sm text-gray-500">Loading...</span>}
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-500">Error loading users</p>}

      {/* User Table */}
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
            {users.map((user) => (
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
