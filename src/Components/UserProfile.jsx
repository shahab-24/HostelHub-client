
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import useAuth from "../hooks/useAuth";

const UserProfile = () => {
        const {user} = useAuth()
        console.log(user)
        
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-md mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg"
    >
      {/* Animated Title */}
      <h2 className="text-3xl font-bold mb-4 text-center">
        <Typewriter
          options={{
            strings: `${user?.displayName}`,
            autoStart: true,
            loop: true,
            delay: 75,
          }}
        />
      </h2>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <img
          src={user?.photoURL}
          alt={`${user?.name}'s profile`}
          className="w-20 h-20 rounded-full border-4 border-white shadow-md"
        />
        <div>
          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Badges: {user?.badge}</h4>

        <div className="flex space-x-2">
        {user?.badge === 'Bronze' && (<div><span className="px-3 py-1 bg-yellow-400 text-black rounded-full text-sm font-medium">
            Bronze
          </span></div>)}
        {user?.badge === 'Silver' && (<div> <span className="px-3 py-1 bg-gray-400 text-black rounded-full text-sm font-medium">
            Silver
          </span></div>)}

          {user?.badge === 'Gold' && (<div><span className="px-3 py-1 bg-yellow-300 text-black rounded-full text-sm font-medium">
            Gold
          </span></div>)}
          {user?.badge === 'Premium' && (<div><span className="px-3 py-1 bg-violet-600 text-black rounded-full text-sm font-medium">
            Premium
          </span></div>)}
          
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
