import Typewriter from "typewriter-effect"; // Import Typewriter.js
import logo from '../../assets/logo2.webp';

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center bg-base-200 text-base-content rounded-lg py-6 px-4 md:px-10">
        {/* Logo & Name */}
        <div className="mb-2 text-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <img
              src={logo} // Replace with your logo URL
              alt="Logo"
              className="rounded-full w-20 h-20 sm:w-20 sm:h-20" // Adjust size for responsiveness
            />
            <span className="text-3xl font-semibold text-indigo-600">
              {/* Typewriter effect for the name */}
              <Typewriter
                options={{
                  strings: ["HostelHub"], // Your site name
                  autoStart: true,
                  loop: true,
                  delay: 100,
                }}
              />
            </span>
          </div>
        </div>

        {/* Links */}
        {/* <nav className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
          <a className="link link-hover text-lg hover:text-indigo-600">About us</a>
          <a className="link link-hover text-lg hover:text-indigo-600">Contact</a>
          <a className="link link-hover text-lg hover:text-indigo-600">Jobs</a>
          <a className="link link-hover text-lg hover:text-indigo-600">Press kit</a>
        </nav> */}

        {/* Social Media Links */}
        <nav className="mb-2">
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.linkedin.com/in/shahab-uddin24/"
              className="text-xl hover:text-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                ></path>
              </svg>
            </a>
            <a
              href="https://github.com/shahab-24"
              className="text-xl hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                ></path>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/shawonctg22"
              className="text-xl hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                ></path>
              </svg>
            </a>
          </div>
        </nav>

        {/* Copyright */}
        <aside className="text-center text-sm text-gray-500">
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by HostelHub</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
