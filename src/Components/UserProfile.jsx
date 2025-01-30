
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

import Loader from "./Shared/Loader";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
        // const {user} = useAuth()
        // console.log(user)

        const axiosSecure = useAxiosSecure()

        const {data: userProfile, isLoading, isError, error} = useQuery({
                queryKey: ['userData'],
                queryFn: async () => {

                        try {
                                const {data} = await axiosSecure('/api/user/profile')
                                return data
                        } catch (error) {
                                console.log(error)
                                
                        }
                }
        })
console.log(userProfile)
        if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">{error.message}</p>;
        
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-md mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg my-20"
    >
    <Helmet>
        <title>User profile | HotelHub-Dashboard</title>
    </Helmet>
      {/* Animated Title */}
      <h2 className="text-3xl font-bold mb-4 text-center">
        <Typewriter
          options={{
            strings: `${userProfile?.name}`,
            autoStart: true,
            loop: true,
            delay: 75,
          }}
        />
      </h2>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <img
          src={userProfile?.photoURL}
          alt={`${userProfile?.name}'s profile`}
          className="w-20 h-20 rounded-full border-4 border-white shadow-md"
        />
        <div>
          <h3 className="text-xl font-semibold">{userProfile?.displayName}</h3>
          <p className="text-sm">{userProfile?.email}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Badges: {userProfile?.badge}</h4>

        <div className="flex space-x-2">
        {userProfile?.badge === 'Bronze' && (<div><span className="px-3 py-1 bg-yellow-400 text-black rounded-full text-sm font-medium">
            Bronze
          </span></div>)}
        {userProfile?.badge === 'Silver' && (<div> <span className="px-3 py-1 bg-gray-400 text-black rounded-full text-sm font-medium">
            Silver
          </span></div>)}

          {userProfile?.badge === 'Gold' && (<div><span className="px-3 py-1 bg-yellow-300 text-black rounded-full text-sm font-medium">
            Gold
          </span></div>)}
          {userProfile?.badge === 'Premium' && (<div><span className="px-3 py-1 bg-violet-600 text-black rounded-full text-sm font-medium">
            Premium
          </span></div>)}
          
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
