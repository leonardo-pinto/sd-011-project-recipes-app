import React from 'react';
import { Redirect } from 'react-router-dom';
import identifyRecipeType from '../helpers/identifyRecipeType';
import { randomFoodRecipe, randomDrinkRecipe } from '../helpers/endpoints';
import useFetch from '../hooks/useFetch';

function RedirectRandomRecipeDetails() {
  const recipeType = identifyRecipeType();
  let randomRecipeType = randomFoodRecipe;
  if (recipeType === 'bebidas') randomRecipeType = randomDrinkRecipe;
  const { data } = useFetch(randomRecipeType);

  if (data) {
    if (recipeType === 'comidas') {
      const { idMeal } = data.meals[0];
      return <Redirect to={ `/${recipeType}/${idMeal}` } />;
    }
    const { idDrink } = data.drinks[0];
    return <Redirect to={ `/${recipeType}/${idDrink}` } />;
  }
  return null;
}

export default RedirectRandomRecipeDetails;
