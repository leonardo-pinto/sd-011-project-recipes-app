import React from 'react';
import { Link } from 'react-router-dom';
import './IngredientsDetails.css';
import identifyRecipeType from '../helpers/identifyRecipeType';
import createIngredientObject from '../helpers/createIngredientObject';
import useFetch from '../hooks/useFetch';
import { foodsIngredients, drinksIngredients } from '../helpers/endpoints';

function IngredientsDetails() {
  // Ao clicar no card, devem ser renderizadas receitas apenas que contém o ingrediente

  const recipeType = identifyRecipeType();
  let ingredientType = foodsIngredients;
  if (recipeType === 'bebidas') ingredientType = drinksIngredients;
  const { data, isLoading, error } = useFetch(ingredientType);

  if (error) return <p>{error}</p>;

  if (isLoading) return <p>Loading...</p>;

  if (data) {
    const { ingredientKey, imageURL, dataKey } = createIngredientObject(recipeType);
    const limitIngredients = 12;
    return (
      <section className="ingredients-container">
        {data[dataKey].slice(0, limitIngredients).map((ingredient, index) => (
          <Link
            key={ index }
            to={ { pathname: `/${recipeType}`, recipeName: ingredient[ingredientKey] } }
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
