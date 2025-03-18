// import axios from "axios";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// const axiosSecure = axios.create({
//         baseURL: import.meta.env.VITE_API_URL, 
//         withCredentials: true
// })

// const useAxiosSecure = () => {
//         const {logOut, user} = useAuth()
//         console.log(user)
//         const navigate = useNavigate()

//         useEffect(() => {
//                 axiosSecure.interceptors.request.use(
//                         function(config){
                                
//                                 const token = localStorage.getItem('accessToken')

//                                 // console.log("Token being added to headers:", token);
                                
//                                 if(token){
//                                         config.headers.Authorization = `Bearer ${token}`
//                                 }
//                                 // console.log('before adding token interceptor', token)
//                                 return config
//                         }, 
//                         async(error) => {
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
//                                 // console.log('response received',res)
                                
//                                 return res
//                         }, 
//                         async(error) => {
//                                 const status = error?.response?.status;
        
//                                 if(status === 401 || status === 403){
//                                         await logOut()
//                                         navigate('/login')
//                                 }
//                                 return Promise.reject(error)
//                         }
//                 )

//         },[logOut, navigate])

        
//         return axiosSecure
// };

// export default useAxiosSecure;

import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      async (error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    axiosSecure.interceptors.response.use(
        (res) => res,
        async (error) => {
          const status = error?.response?.status;
          if (status === 401 || status === 403) {
            localStorage.removeItem("accessToken");  // Remove old token
            try {
              const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/jwt-refresh`, { withCredentials: true });
              const newToken = res.data.token;
              localStorage.setItem("accessToken", newToken);
              error.config.headers.Authorization = `Bearer ${newToken}`;
              return axiosSecure(error.config);  // Retry failed request
            } catch {
              await logOut();
              navigate("/login");
            }
          }
          return Promise.reject(error);
        }
      );
      
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
