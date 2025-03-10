import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import lottieLoginData from '../../assets/login.json';
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';

const Login = () => {
        const [showPassword, setShowPassword] = useState(false);
  const { signIn, signInWithGoogle, setLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success('Login Successful');
      setLoading(false)
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
      if (err.code === "auth/popup-closed-by-user") {
        toast.error("Popup closed before completing the login process.");
      } else {
        toast.error(err?.message || "An error occurred during Google sign-in.");
      }
      setLoading(false);
    }
  };
  const handleShowPassword = () => {
        setShowPassword(!showPassword);
      };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 sm:px-6 lg:px-8 pt-20">
    <Helmet>
        <title> Login | HostelHub </title>
      </Helmet>
      <div className="flex flex-col gap-10 md:flex-row items-center max-w-5xl w-full bg-gray-100 p-6 sm:p-10 rounded-lg shadow-md">
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie animationData={lottieLoginData} className="w-3/4 md:w-full" />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Log In</h1>
            <p className="text-sm text-gray-500 mt-2">Sign in to access your account</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-lime-500 focus:border-lime-500 text-gray-900"
                />
              </div>
              <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-lime-500 focus:border-lime-500 text-gray-900"
                required
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute inset-y-0 right-3 top-5 flex items-center text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            </div>
            <button
              type="submit"
              className="relative mt-4 px-6 py-3 font-bold text-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg 
                         transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl w-full"
            >
              Log In
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <p className="mx-4 text-sm text-gray-500">or</p>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center space-x-3 border border-gray-300 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-200 transition duration-200"
          >
            <FcGoogle size={24} />
            <p className="text-gray-700">Continue with Google</p>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline text-lg"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
