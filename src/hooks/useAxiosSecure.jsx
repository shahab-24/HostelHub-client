import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
        baseURL: import.meta.env.VITE_API_URL, 
        withCredentials: true
})

// const useAxiosSecure = () => {
//         const {logOut,setLoading} = useAuth()
//         // console.log(user.accessToken)
//         const navigate = useNavigate()

//         useEffect(() => {
//                 axiosSecure.interceptors.request.use(
                        
//                         function(config){
//                                 setLoading(true)
                                
//                                 const token = localStorage.getItem('accessToken')


//                                 // console.log("Token being added to headers:", token);
                                
//                                 if(token){
//                                         config.headers.Authorization = `Bearer ${token}`
//                                 }
//                                 // console.log('before adding token interceptor', token)
//                                 return config
//                         }, 
//                         async(error) => {
//                                 setLoading(false)
//                                 const status = error?.response?.status;
        
//                                 if(status === 401 || status === 403){
//                                         await logOut()
//                                         navigate('/login')
//                                 }
//                                 return Promise.reject(error)
//                         }
//                 )
//                 axiosSecure.interceptors.response.use(
//                         function(res){
//                                 setLoading(false)
//                                 // console.log('response received',res)
                                
//                                 return res
//                         }, 
//                         async(error) => {
//                                 setLoading(false)
//                                 const status = error?.response?.status;
        
//                                 if(status === 401 || status === 403){
//                                         await logOut()
//                                         navigate('/login')
//                                 }
//                                 return Promise.reject(error)
//                         }
//                 );
//                 // return () => {
//                 //         axiosSecure.interceptors.request.eject(requestInterceptor);
//                 //         axiosSecure.interceptors.response.eject(responseInterceptor);
//                 //       };
//                     },

//         [logOut, navigate, setLoading])

        
//         return axiosSecure
// };
const useAxiosSecure = () => {
        const { logOut, setLoading, user } = useAuth();
        const navigate = useNavigate();
      
        useEffect(() => {
          axiosSecure.interceptors.request.use(
            async function (config) {
              setLoading(true);
              let token = localStorage.getItem("accessToken");
      
              if (!token && user) {
                try {
                  token = await user.getIdToken(true); // Force refresh
                  localStorage.setItem("accessToken", token);
                } catch (error) {
                  console.error("Token refresh failed", error);
                }
              }
      
              if (token) {
                config.headers.Authorization = `Bearer ${token}`;
              }
      
              return config;
            },
            async (error) => {
              setLoading(false);
              return Promise.reject(error);
            }
          );
      
          axiosSecure.interceptors.response.use(
            function (res) {
              setLoading(false);
              return res;
            },
            async (error) => {
              setLoading(false);
              if (error.response?.status === 401 || error.response?.status === 403) {
                await logOut();
                navigate("/login");
              }
              return Promise.reject(error);
            }
          );
        }, [logOut,setLoading, user]);
      
        return axiosSecure;
      };
      

export default useAxiosSecure;


