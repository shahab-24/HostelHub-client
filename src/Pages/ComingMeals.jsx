import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const fetchUpcomingMeals = async () => {
  const { data } = await axios.get("/api/meals");
  return data.filter((meal) => meal.status === "upcoming");
};

const ComingMeals = () => {
        const {user} = useAuth()
        console.log(user)
  const queryClient = useQueryClient();
  const { data: meals = [] } = useQuery({ queryKey: ["meals"], queryFn: fetchUpcomingMeals });

  const likeMutation = useMutation({
    mutationFn: async (mealId) => {
      await axios.post(`/api/meals/${mealId}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["meals"]);
    },
  });

  const handleLike = (mealId) => {
    if (!user || !["Silver", "Gold", "Platinum"].includes(user.badge)) {
      alert("Only premium users can like meals.");
      return;
    }
    likeMutation.mutate(mealId);
  };

  return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Upcoming Meals</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {meals?.meals?.map((meal) => (
//           <motion.div
//             key={meal._id}
//             className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
//             whileHover={{ scale: 1.05 }}
//           >
//             <figure>
//               <img src={meal.image} alt={meal.title} className="w-full h-40 object-cover" />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title">{meal.title}</h2>
//               <p className="text-gray-600">{meal.description.slice(0,100)}</p>
//               <p className="text-sm text-gray-500">Ingredients: {meal.ingredients}</p>
//               <p className="text-green-600 font-bold">${meal.price}</p>
//               <div className="flex justify-between items-center mt-2">
//                 <span className="text-gray-500">Likes: {meal.likes}</span>
//                 <button
//                   className="btn btn-primary flex items-center gap-2"
//                   onClick={() => handleLike(meal._id)}
//                   disabled={!user || !["Silver", "Gold", "Platinum"].includes(user.membership)}
//                 >
//                   <FaHeart className="text-red-500" /> Like
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
<div className="container mx-auto p-4">
  <h1 className="text-3xl font-bold text-center mb-6">Upcoming Meals</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {meals?.meals?.map((meal) => (
      <motion.div
        key={meal._id}
        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
        whileHover={{ scale: 1.05 }}
      >
        <figure>
          <img src={meal.image} alt={meal.title} className="w-full h-40 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{meal.title}</h2>
          <p className="text-gray-600">{meal.description.slice(0, 100)}</p>
          <p className="text-sm text-gray-500">Ingredients: {meal.ingredients}</p>
          <p className="text-green-600 font-bold">${meal.price}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500">Likes: {meal.likes}</span>
            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={() => handleLike(meal._id)}
              disabled={!user || !["Silver", "Gold", "Platinum"].includes(user.membership)}
            >
              <FaHeart className="text-red-500" /> Like
            </button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div>

  );
};

export default ComingMeals;
