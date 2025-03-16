import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true
})

const useAxiosSecure = () => {
        const {logOut} = useAuth()
        const navigate = useNavigate()

        useEffect(() => {
                axiosSecure.interceptors.request.use(
                        function(config){
                                const token = localStorage.getItem('token')
                                
                                if(token){
                                        config.headers.Authorization = `Bearer ${token}`
                                }
                                console.log('before adding token interceptor',token)
                                return config
                        }, 
                        async(error) => {
                                const status = error.response.status;
        
                                if(status === 401 || status === 403){
                                        await logOut()
                                        navigate('/login')
                                }
                                return Promise.reject(error)
                        }
                )
                axiosSecure.interceptors.response.use(
                        function(res){
                                console.log('response received',res)
                                
                                return res
                        }, 
                        async(error) => {
                                const status = error.response.status;
        
                                if(status === 401 || status === 403){
                                        await logOut()
                                        navigate('/login')
                                }
                                return Promise.reject(error)
                        }
                )

        },[logOut, navigate])

        
        return axiosSecure
};

export default useAxiosSecure;