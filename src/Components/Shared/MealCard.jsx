
import { Card, Button } from "react-bootstrap"; // You can also use Material-UI's Card component if preferred
import { useHistory } from "react-router-dom"; // for navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap styles

const MealCard = ({ meals }) => {
  const history = useHistory();

  const handleDetails = (id) => {
    history.push(`/meal/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {meals?.map((meal) => (
        <Card key={meal._id} className="border rounded-lg shadow-lg">
          <Card.Img
            variant="top"
            src={meal.image}
            alt={meal.title}
            className="w-full h-48 object-cover"
          />
          <Card.Body className="space-y-4">
            <Card.Title className="text-xl font-semibold text-gray-800">
              {meal.title}
            </Card.Title>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">★</span>
                <span className="text-gray-600">{meal.rating}</span>
              </div>
              <span className="text-xl font-bold text-green-500">${meal.price}</span>
            </div>
            <Button
              variant="primary"
              className="w-full py-2"
              onClick={() => handleDetails(meal._id)}
            >
              View Details
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MealCard;
