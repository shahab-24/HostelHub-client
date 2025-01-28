import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?search=${search}`);
      return data;
    },
    keepPreviousData: true,
  });

  const handleMakeAdmin = async (userId) => {
    try {
      await axiosSecure.patch(`/users/${userId}`);
      toast.success("User role updated to admin");
      refetch();
    } catch (err) {
      toast.error("Error updating user role");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
      </div>

      {/* Search and Loading Indicator */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-md"
          placeholder="Search by username or email"
        />
        {isLoading && (
          <div className="flex items-center space-x-2">
            <span className="loading loading-spinner loading-sm"></span>
            <span className="text-gray-500">Loading...</span>
          </div>
        )}
      </div>

      {/* Error Handling */}
      {error && (
        <p className="text-center text-red-500">Error loading users</p>
      )}

      {/* User Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                User
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Role
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 border-t text-sm text-gray-800"
              >
                <td className="px-6 py-3">{user.name || "Unknown"}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.role}</td>
                <td className="px-6 py-3 text-center">
                  {user.role !== "admin" && (
                    <button
                      className="btn btn-primary btn-sm"
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

        {users.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
