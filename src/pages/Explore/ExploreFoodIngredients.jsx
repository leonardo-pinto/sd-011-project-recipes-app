import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../globalComponents/Footer';
import Header from '../../globalComponents/Header';
import '../../App.css';
import styles from './ExploreFoodIngredients.module.css';
import Picture from '../../images/loginIMG.png';

function ExploreFoodIngredients({ match }) {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const magicNumber = 12;
    const fetchFoodIngredients = () => {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        .then((response) => response.json())
        .then((data) => setIngredients(data.meals
          .filter((_, index) => index < magicNumber)));
    };
    fetchFoodIngredients();
  }, []);

  if (ingredients.length === 0) {
    return (
      <div className={ styles.loadingContainer }>
        <img
          src={ Picture }
          alt="Prato de comida"
          className={ styles.rotation }
        />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Header title="Explore by Ingredients" match={ match } />
      <div className={ `${styles.container} animeLeft` }>
        {ingredients.map((item, index) => (
          <Link
            key={ index }
            to={ { pathname: '/comidas', ingredient: item.strIngredient } }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                data-testid={ `${index}-card-img` }
                alt="ingredient"
              />

              <h1
                data-testid={ `${index}-card-name` }
              >
                {item.strIngredient}
              </h1>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}

ExploreFoodIngredients.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ExploreFoodIngredients;
