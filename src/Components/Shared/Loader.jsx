const Loader = () => {

        return (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="flex flex-col items-center">
              {/* Spinning Circle */}
              <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin text-purple-600 text-3xl"></div>
              {/* Loading Text */}
              <p className="mt-4 text-white text-lg font-semibold">Please wait...</p>
            </div>
          </div>
        );
      };
      export default Loader;