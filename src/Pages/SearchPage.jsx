import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';


const SearchPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query'); // Extract search query

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (query) {
      axiosPublic
        .get(`/api/meals?query=${query}`)
        .then((response) => {
          setMeals(response.data.meals);
          setLoading(false);
        })
        .catch((err) => {
                console.log(err)
          setError('Error fetching search results');
          setLoading(false);
        });
    }
  }, [query, axiosPublic]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Search Results for `{query}`</h2>
      <div>
        {meals.length > 0 ? (
          meals.map((meal, index) => (
            <div key={index}>
              <h3>{meal.title}</h3>
              <p>{meal.description}</p>
            </div>
          ))
        ) : (
          <p>No meals found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
