import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../Components/Shared/Loader";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/api/admin/profile");
        return data;
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
      }
    },
    retry: false,
  });

  if (isLoading || loading) return <Loader />;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dff6ff] via-[#f0f0f0] to-[#e4ecf5] flex items-center justify-center px-4 py-10">
      <Helmet>
        <title>Admin Profile | HotelHub Dashboard</title>
      </Helmet>

      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={profile?.image}
            alt={profile?.name}
            className="w-28 h-28 rounded-full border-4 border-blue-300 object-cover shadow-lg"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-1">
              {profile?.name}
            </h2>
            <p className="text-gray-600">{profile?.email}</p>
            <div className="mt-4 text-gray-700 space-y-1">
              <p>
                <span className="font-semibold text-gray-800">Meals Added:</span>{" "}
                {profile?.mealCount}
              </p>
              {/* Add more profile details here if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
