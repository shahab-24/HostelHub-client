import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email && !loading &&!!localStorage.getItem("accessToken"),
//     staleTime: 10 * 60 * 1000,
//     retry: 1,
    queryFn: async () => {
//       console.log("Fetching user role before users role api:", user?.email);
      try {
        const { data } = await axiosSecure.get(`/api/users/role/${user.email}`);
        //       console.log("Fetching user role after users role api:", data.role)
        return data.role || null;
      } catch (error) {
        console.error("Error fetching role:", error);
        return null;
      }
    },
  });
// console.log(role,"useRole hook")
  return [role, isLoading];
};

export default useRole;
