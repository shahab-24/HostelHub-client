import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import lottieLoginData from "../../assets/login.json";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signInWithGoogle, setLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
//       console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success("Login Successful");
      setLoading(false);
    } catch (err) {
//       console.log(err);
      toast.error(err?.message);
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4 sm:px-6 lg:px-8 pt-20">
      <Helmet>
        <title> Login | HostelHub </title>
      </Helmet>

      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full bg-base-100 p-8 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <Lottie animationData={lottieLoginData} className="w-3/4 md:w-full" />
        </div>

        <div className="w-full md:w-1/2">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-base-content">Log In</h1>
            <p className="text-base-content opacity-70 mt-2">
              Log in to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base-content">Email</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter your email"
                className="input input-bordered w-full text-base-content"
              />
            </div>
            <div className="form-control w-full relative">
              <label className="label">
                <span className="label-text text-base-content">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                placeholder="Enter your password"
                className="input input-bordered w-full text-base-content pr-10"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute top-12 right-3 text-base-content opacity-60 hover:opacity-100"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" className="btn-primary">
              Log In
            </button>
          </form>

          <div className="divider">or</div>

          <div>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-block flex items-center  justify-center space-x-1  md:space-x-3 text-base-content"
            >
              <FcGoogle size={24} className="" />
              <p className="">Continue with Google</p>
            </button>
          </div>

          <p className="text-center text-base-content opacity-70 mt-6 text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-primary text-lg">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
