import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import lottieLoginData from '../../assets/login.json';

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
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
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
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
                  Email address
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
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-lime-500 focus:border-lime-500 text-gray-900"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-lime-500 text-white rounded-md font-medium hover:bg-lime-600 transition duration-200"
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
              className="text-lime-500 hover:underline"
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
