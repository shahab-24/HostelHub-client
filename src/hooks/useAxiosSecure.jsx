import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  //   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
//   withCredentials: true, // Allow sending cookies for refresh
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut, setLoading } = useAuth();
  // console.log(user.accessToken)

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      function (config) {
        // setLoading(true);
        const token = localStorage.getItem("accessToken");
        // console.log("🚀 Interceptor - Retrieved token:", token);

        // console.log("Token inside interceptor:", token);

        // console.log("Token being added to headers:", token);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          // console.log("✅ Token added to request headers");
        //   console.log("🚀 Interceptor - Retrieved token:", token);
        } else {
          console.warn("❌ No token found in localStorage inside interceptor");
        }
        return config;
      },
      async (error) => {
        setLoading(false);
        return Promise.reject(error);

        // const status = error?.response?.status;

        // if (status === 401 || status === 403) {
        //   console.warn("🔐 Token rejected. Logging out user.");
        //   await logOut();
        //   navigate("/login");
        // }
        // return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      function (res) {
        // setLoading(false);
        // console.log('response received',res)

        return res;
      },
      async (error) => {
        // setLoading(false);
        const status = error?.response?.status;
        // const originalRequest = error.config

        if (status === 401) {
          await logOut();
          navigate("/login");
          //         try {
          //                 const { data } = await axiosSecure.get(
          //                         `${import.meta.env.VITE_API_URL}/api/refresh`,
          //                         { withCredentials: true }
          //                     );
          //  const newAccessToken = data?.accessToken
          //                     if(newAccessToken){
          //                         localStorage.setItem('accessToken', newAccessToken)
          //                         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          //                         return axiosSecure(originalRequest)
          //                     }
          //         } catch (error) {
          //                 console.error('token refresh failed', error)
          //                   await logOut();
          //           navigate("/login");
          //         }
        } else if (status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate, setLoading]);

  return axiosSecure;
};

export default useAxiosSecure;
