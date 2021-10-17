import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipes } from '../redux/slices/fetchReceitas';
import './IngredientsDetails.css';

function IngredientsDetails() {
  const dispatch = useDispatch();
  const {
    foodIngredients,
    drinkIngredients,
  } = useSelector((state) => state.fetchReceitas);

  const { pathname } = window.location;
  const currentURL = pathname.split('/')[2];

  function getIngredientsByRecipeType() {
    if (currentURL === 'comidas') {
      dispatch(getRecipes('foodIngredients'));
    }
    if (currentURL === 'bebidas') {
      dispatch(getRecipes('drinkIngredients'));
    }
  }

  useEffect(() => {
    getIngredientsByRecipeType();
  }, []);

  if (foodIngredients.length !== 0 || drinkIngredients.length !== 0) {
    const limitCards = 12;
    let ingredientKey = 'strIngredient';
    let recipeType = foodIngredients.meals;
    let imageURL = 'themealdb';
    if (currentURL === 'bebidas') {
      recipeType = drinkIngredients.drinks;
      ingredientKey = 'strIngredient1';
      imageURL = 'thecocktaildb';
    }

    return (
      <section className="ingredients-container">
        {recipeType && recipeType.slice(0, limitCards).map((ingredient, index) => (
          <Link
            key={ index }
            to={ { pathname: `/${currentURL}`, recipeName: ingredient[ingredientKey] } }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
              className="ingredient-card"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.${imageURL}.com/images/ingredients/${ingredient[ingredientKey]}-Small.png` }
                alt={ ingredient[ingredientKey] }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {ingredient[ingredientKey]}
              </p>
            </div>
          </Link>
        ))}
      </section>
    );
  }
  return null;
}

export default IngredientsDetails;
