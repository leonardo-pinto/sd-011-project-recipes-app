import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/exploreByIngredient.css';
import {Spinner} from 'reactstrap';
import '../styles/loading.css';

function ExploreIngredients({ foodOrDrink }) {
  const {
    selectedIngredientDrink,
    selectedIngredientFood,
    ingredients,
    loadingExplore,
    fetchIngredients,
    selectIngredient,
  } = useContext(AppContext);

  const history = useHistory();

  const maxLength = 12;

  useEffect(() => {
    fetchIngredients(foodOrDrink);
  }, []);

  useEffect(() => {
    if (selectedIngredientFood.length > 0 || selectedIngredientDrink.length > 0) {
      history.push(foodOrDrink === 'Comidas' ? '/comidas' : '/bebidas');
    }
  }, [selectIngredient]);

  return (
    <div className="exploreIngredients">
      {loadingExplore && <div className="loading"> <Spinner animation="border" variant="primary" className="spinner"/></div>}
      {!loadingExplore && (
        <div className="exploreIngredientsCards">
          {ingredients.filter((item, index) => index < maxLength)
            .map((item, index) => (
              <button
                key={ index }
                type="button"
                value={ foodOrDrink === 'Comidas' ? item.strIngredient
                  : item.strIngredient1 }
                onClick={ (e) => selectIngredient(e, foodOrDrink) }
              >
                <div key={ index } data-testid={ `${index}-ingredient-card` }>
                  <img
                    src={ foodOrDrink === 'Comidas'
                      ? `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png`
                      : `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
                    alt="Ingredient_img"
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>
                    {foodOrDrink === 'Comidas' ? item.strIngredient : item.strIngredient1}
                  </p>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default ExploreIngredients;

ExploreIngredients.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};
