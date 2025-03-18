// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";


// const useRole = () => {
//         const {user} = useAuth()
//         console.log(user?.email)
        
//         const axiosSecure = useAxiosSecure()
//         const {data: role, isLoading} = useQuery({
//                 queryKey: ['role', user?.email],
//                 enabled: !!user?.email,
//                 queryFn: async () => {
//                         console.log("Checking role for:", user?.email);
//                         const {data} = await axiosSecure(`/api/users/role/${user?.email}`, {withCredentials: true})
                        
//                         return data.role
//                 }
//         })
        
//         console.log(role)
//         return [role, isLoading]
// };

// export default useRole;

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email, // Prevent unnecessary API calls
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/users/role/${user.email}`);
      return data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;
