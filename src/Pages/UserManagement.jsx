import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Loader from "../Components/Shared/Loader";
import { motion } from "framer-motion";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/users?search=${search}`);
      return data;
    },
    keepPreviousData: true,
  });

  const handleMakeAdmin = async (userId) => {
    try {
      await axiosSecure.patch(`/api/users/${userId}`);
      toast.success("User role updated to admin");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Error updating user role");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-[#f1f5f9] via-[#e2e8f0] to-[#f8fafc] dark:from-[#1e293b] dark:via-[#0f172a] dark:to-[#0f172a]">
      <Helmet>
        <title>User Management | HotelHub Dashboard</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-6 space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-200">
            User Management
          </h1>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="input input-bordered w-full sm:w-80 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white placeholder:text-slate-500"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">Error loading users</p>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
          <table className="table w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {users?.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <td className="px-4 py-3">{user.name || "Unknown"}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3 text-center">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-sm  bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {users?.length === 0 && (
            <div className="text-center py-6 text-slate-500 dark:text-slate-400">
              No users found.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserManagement;
