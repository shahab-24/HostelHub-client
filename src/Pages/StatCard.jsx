const StatCard = ({ title, value, icon, color }) => {
        return (
          <div className={`p-4 bg-white shadow-md rounded-lg flex items-center space-x-4 border-l-4 ${color}`}>
            <div className="text-gray-600 text-3xl">{icon}</div>
            <div>
              <h3 className="text-gray-500 text-sm">{title}</h3>
              <h2 className="text-2xl font-semibold">{value}</h2>
            </div>
          </div>
        );
      };
      