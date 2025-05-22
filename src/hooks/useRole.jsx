import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading, isError, error } = useQuery({
        queryKey: ["role", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get("/api/users/role");
                return data.role || null;
            } catch (error) {
                console.error("Error fetching role:", error);
                throw error;
            }
        },
    });
// console.log(role)
  // Return role and loading/error states
  return [ role, isLoading, isError, error ];
};

export default useRole;
