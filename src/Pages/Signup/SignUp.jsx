import Lottie from "lottie-react";
import lottieLoginData from "../../assets/signup.json";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile, signInWithGoogle, setLoading } =
    useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters, include uppercase, lowercase, number, and a special character."
      );
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name);
      form.reset();
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
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse items-center justify-center min-h-screen bg-base-200 px-4 sm:px-6 lg:px-8 pt-20">
      <Helmet>
        <title> Sign Up | HostelHub </title>
      </Helmet>

      <div className="w-full lg:w-1/3 flex justify-center lg:justify-end mb-6 lg:mb-0 lg:pr-16">
        <Lottie animationData={lottieLoginData} className="w-3/4 lg:w-4/5" />
      </div>

      <div className="w-full lg:w-1/3 bg-base-100 p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-base-content font-poppins">
            Sign Up Now!
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control w-full">
            <label htmlFor="name" className="label">
              <span className="label-text text-base-content font-semibold">
                Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="input input-bordered w-full text-base-content"
              required
            />
          </div>
          <div className="form-control w-full">
            <label htmlFor="email" className="label">
              <span className="label-text text-base-content font-semibold">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="input input-bordered w-full text-base-content"
              required
            />
          </div>
          <div className="form-control w-full relative">
            <label htmlFor="password" className="label">
              <span className="label-text text-base-content font-semibold">
                Password
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="input input-bordered w-full pr-10 text-base-content"
              required
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute top-[2.9rem] right-3 text-lg text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>

        <p className="text-center my-4 text-base-content">
          Already signed up? Please{" "}
          <Link
            to="/login"
            className="text-primary hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
        <div className="divider">or</div>

        <div>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-block flex items-center  justify-center space-x-1 md:space-x-3 text-base-content"
          >
            <FcGoogle size={24} className="" />
            <p className="">Continue with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
