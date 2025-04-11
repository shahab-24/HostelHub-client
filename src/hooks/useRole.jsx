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

// const useRole = () => {
//   const { user } = useAuth();
//   //   console.log(user)
//   const axiosSecure = useAxiosSecure();

//   const { data: role, isLoading } = useQuery({
//     queryKey: ["role", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       // setLoading(true)
//       console.log("searching token before getting user role", user);
// //       const { data } = await axiosSecure.get(`/api/users/role/${user?.email}`);
//       const { data } = await axiosSecure.get("/api/users/role",{
//         withCredentials: true,
//       });
//       //       setLoading(false)
//       return data.role;
//     },
//   });

//   console.log(role);
//   return [role, isLoading];
// };
const useRole = () => {
        const { user } = useAuth();
        const axiosSecure = useAxiosSecure();
      
        const { data: role, isLoading } = useQuery({
          queryKey: ["role", user?.email], 
          enabled: !!user?.email, 
          queryFn: async () => {
            console.log("Fetching user role for:", user?.email);
            try {
              const { data } = await axiosSecure.get("/api/users/role", {
                withCredentials: true,
              });
              console.log(data.role)
              return data.role;
            } catch (error) {
              console.error("Error fetching role:", error);
        //       return null;
            }
          },
        //   staleTime: 10 * 60 * 1000, // Cache for 10 minutes to reduce API calls
          retry: 1, // Retry once if the request fails
        });
        console.log(role)
      
        return [role, isLoading];
      };
      

export default useRole;
