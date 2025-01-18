const DashboardLayout = () => {
        return (
          <div className="min-h-screen flex flex-col">
            {/* Sidebar */}
            <nav className="bg-gray-800 text-white flex items-center px-6 py-4">
              <span className="text-lg font-bold">Dashboard</span>
              <div className="ml-auto flex space-x-4">
                <button className="btn btn-sm">Home</button>
                <button className="btn btn-sm">Meals</button>
                <button className="btn btn-sm">Profile</button>
              </div>
            </nav>
            
            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
              <h2 className="text-xl font-bold">Welcome to the Dashboard</h2>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-lg p-6">Card 1</div>
                <div className="bg-white shadow rounded-lg p-6">Card 2</div>
                <div className="bg-white shadow rounded-lg p-6">Card 3</div>
              </div>
            </main>
          </div>
        );
      };

      export default DashboardLayout;
      