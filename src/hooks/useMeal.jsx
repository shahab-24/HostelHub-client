
import useAxiosPublic from "./useAxiosPublic"
import { useQuery } from "@tanstack/react-query"

const useMeal = () => {
	
	// const [loading, setLoading] = useState(true)
        const axiosPublic = useAxiosPublic()



		  const { data: meals = [], isLoading } = useQuery({
                        queryKey: ["meals"],
                        queryFn: async () => {
                          const { data } = await axiosPublic("/api/meals");
                          
                          return data;
                        },
                      });
			
                     // setLoading(false)
 
		
	
                     return [meals, isLoading]

}


export default useMeal