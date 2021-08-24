import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../globalComponents/Footer';
import Header from '../../globalComponents/Header';
import '../../App.css';
import styles from './ExploreDrinks.module.css';

function ExploreDrinks({ match }) {
  const [randomDrink, setRandomDrink] = useState([]);

  useEffect(() => {
    const fetchRandomDrink = () => {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then((drink) => setRandomDrink(drink.drinks[0]));
    };
    fetchRandomDrink();
  }, []);
  return (
    <>
      <Header title="Explore Drinks" match={ match } />
      <div className={ `${styles.container} animeLeft` }>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredients
          </button>
        </Link>
        <Link to={ `/bebidas/${randomDrink.idDrink}` }>
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

ExploreDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ExploreDrinks;
