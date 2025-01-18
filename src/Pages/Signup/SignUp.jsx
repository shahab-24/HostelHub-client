import Lottie from "lottie-react";
import lottieLoginData from "../../assets/signup.json";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name);
      console.log(result);
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse items-center justify-center min-h-screen bg-base-200 px-4 sm:px-6 lg:px-8">
      {/* Lottie Animation */}
      <div className="w-full lg:w-1/3 flex justify-center lg:justify-end mb-6 lg:mb-0 lg:pr-16">
        <Lottie animationData={lottieLoginData} className="w-3/4 lg:w-4/5" />
      </div>

      {/* Signup Form */}
      <div className="w-full lg:w-1/3">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sign Up Now!</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-lime-500 focus:border-lime-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email 
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-lime-500 focus:border-lime-500 text-gray-900"
                required
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
            className="w-full py-3 bg-lime-500 text-white rounded-md font-medium hover:bg-lime-600 transition duration-200"
          >
            Sign Up
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
      </div>
    </div>
  );
};

export default SignUp;
