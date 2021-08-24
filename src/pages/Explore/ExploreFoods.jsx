import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../globalComponents/Footer';
import Header from '../../globalComponents/Header';
import '../../App.css';
import styles from './ExploreFoods.module.css';

function ExploreFoods({ match }) {
  const [randomMeal, setRandomMeal] = useState([]);

  useEffect(() => {
    const fetchRandomMeal = () => {
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then((meal) => setRandomMeal(meal.meals[0]));
    };
    fetchRandomMeal();
  }, []);

  console.log(randomMeal);
  return (
    <>
      <Header title="Explore Foods" match={ match } />
      <div className={ `${styles.container} animeLeft` }>
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredients
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            By place of origin
          </button>
        </Link>
        <Link to={ `/comidas/${randomMeal.idMeal}` }>
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Surprise me!
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

ExploreFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ExploreFoods;
