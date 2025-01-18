const MealsCategoryTab = ({ items }) => {
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-blue-500 font-semibold">${item.price}</p>
              </div>
            ))}
          </div>
        );
      };
      
      export default MealsCategoryTab;
      