import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
        baseURL: import.meta.env.VITE_API_URL, 
        // withCredentials: true
})


const useAxiosSecure = () => {
        const navigate = useNavigate()
        const {logOut,setLoading} = useAuth()
        // console.log(user.accessToken)
        

        useEffect(() => {
                const requestInterceptor = axiosSecure.interceptors.request.use(
                        
                        function(config){
                                setLoading(true)
                                
                                const token = localStorage.getItem('accessToken')

                                // console.log("Token inside interceptor:", token);


                                // console.log("Token being added to headers:", token);
                                
                                if(token){
                                        config.headers.Authorization = `Bearer ${token}`
                                }
                                // console.log('before adding token interceptor', token)
                                return config
                        }, 
                        async(error) => {
                                setLoading(false)
                                const status = error?.response?.status;
        
                                if(status === 401 || status === 403){
                                        console.warn("🔐 Token rejected. Logging out user.");
                                        await logOut()
                                        navigate('/login')
                                }
                                return Promise.reject(error)
                        }
                );

                const responseInterceptor = axiosSecure.interceptors.response.use(
                        function(res){
                                setLoading(false)
                                // console.log('response received',res)
                                
                                return res
                        }, 
                        async(error) => {
                                setLoading(false)
                                const status = error?.response?.status;
        
                                if(status === 401 || status === 403){
                                        await logOut()
                                        navigate('/login')
                                }
                                return Promise.reject(error)
                        }
                );
                return () => {
                        axiosSecure.interceptors.request.eject(requestInterceptor);
                        axiosSecure.interceptors.response.eject(responseInterceptor);
                      };
                    },

        [logOut, navigate, setLoading])

        
        return axiosSecure}


      

export default useAxiosSecure;


