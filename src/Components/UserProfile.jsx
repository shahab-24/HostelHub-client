import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useState, useEffect } from "react";
import Loader from "./Shared/Loader";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const UserProfile = () => {
        const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: "",
    email: "",
    image: "",
  });

  // ✅ Fetch user profile
  const { data: userProfile, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["userData"],
    enabled: !!user?.email,

    queryFn: async () => {
        if (!user?.email) return [];
      const { data } = await axiosSecure.get("/api/user/profile");
//       console.log(data, 'from user profile')
      return data;
    },
  });

  // ✅ Update `updatedProfile` when data loads
  useEffect(() => {

    if (userProfile) {
      setUpdatedProfile({
        name: userProfile.name || "",
        email: userProfile.email || "",
        image: userProfile.image || "",
      });
    }
    console.log('hello from user',userProfile)
  }, [userProfile]);

  // ✅ Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const { data } = await axiosSecure.put("/api/user/profile", updatedData);
      return data; 
    },
    onSuccess: () => {
      toast.success("Profile Updated Successfully! ✅");
      refetch();
      setIsEditing(false);
    },
    onError: (err) => {
      toast.error(`Update Failed: ${err.response?.data?.message || err.message}`);
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle profile update
  const handleUpdateProfile = () => {
    updateProfileMutation.mutate(updatedProfile);
  };

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-lg mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg my-10 sm:my-20"
    >
      <Helmet>
        <title>User Profile | HotelHub-Dashboard</title>
      </Helmet>

      {/* Profile Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          <Typewriter
            options={{
              strings: `${userProfile?.name}`,
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </h2>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-4">
        <motion.img
          src={userProfile?.image || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          whileHover={{ scale: 1.1 }}
        />
        <div className="text-center">
          <h3 className="text-xl font-semibold">{userProfile?.name}</h3>
          <p className="text-sm">{userProfile?.email}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-6 text-center">
        <h4 className="text-lg font-semibold mb-2">Badge: {userProfile?.badge}</h4>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            userProfile?.badge === "Bronze"
              ? "bg-yellow-400 text-black"
              : userProfile?.badge === "Silver"
              ? "bg-gray-400 text-black"
              : userProfile?.badge === "Gold"
              ? "bg-yellow-300 text-black"
              : "bg-violet-600 text-black"
          }`}
        >
          {userProfile?.badge}
        </span>
      </div>

      {/* Edit Profile Section */}
      <div className="mt-6">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={updatedProfile?.name}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-900 rounded-lg"
              placeholder="Update Name"
            />
            <input
              type="email"
              name="email"
              value={updatedProfile?.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-900 rounded-lg"
              placeholder="Update Email"
              disabled // Disable email editing for security
            />
            <input
              type="text"
              name="image"
              value={updatedProfile?.image}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-900 rounded-lg"
              placeholder="Update Profile Image URL"
            />
            <div className="flex justify-between">
              <motion.button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-green-500 rounded-lg shadow-lg hover:bg-green-600"
                whileTap={{ scale: 0.9 }}
                disabled={updateProfileMutation?.isLoading}
              >
                {updateProfileMutation.isLoading ? "Saving..." : "Save Changes"}
              </motion.button>
              <motion.button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-red-500 rounded-lg shadow-lg hover:bg-red-600"
                whileTap={{ scale: 0.9 }}
              >
                Cancel
              </motion.button>
            </div>
          </div>
        ) : (
          <motion.button
            onClick={() => setIsEditing(true)}
            className="w-full px-4 py-2 mt-4 bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600"
            whileTap={{ scale: 0.9 }}
          >
            Edit Profile
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default UserProfile;
