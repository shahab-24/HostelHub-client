import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loader from "../Components/Shared/Loader";
import { Helmet } from "react-helmet-async";

const AdminProfile = () => {
        const axiosSecure = useAxiosSecure()

        const {data: profile, isLoading, isError, error} = useQuery({
                queryKey: ['adminProfile'],
                queryFn: async () => {

                        try {
                                const {data} = await axiosSecure.get('/api/admin/profile')
                                return data
                        } catch (error) {
                                console.log(error)
                                throw new Error(error.response?.data?.message || error.message)
                               
                        }
                        
                },
                retry: false, 
        })
console.log('admin profile', profile)
        if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
    <Helmet>
        <title>Admin profile | HotelHub-Dashboard</title>
    </Helmet>
      <div className="flex items-center mb-4">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-20 h-20 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-blue-600">{profile.name}</h2>
          <p className="text-gray-500">{profile.email}</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Profile Details</h3>
        <p className="text-gray-700">
          <strong>Meals Added:</strong> {profile.mealCount}
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;