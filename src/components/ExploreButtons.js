import React, { useEffect, useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../redux/slices/fetchReceitas';
import RenderExploreOriginButton from './RenderExploreOriginButton';

function ExploreFoodsButtons() {
  const {
    randomFoodRecipe,
    randomDrinkRecipe } = useSelector((state) => state.fetchReceitas);
  const [redirectToDetails, setRedirectToDetails] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = window.location;
  const currentURL = pathname.split('/')[2];

  const recipeTypeDictionary = useCallback(() => ({
    comidas: 'randomFoodRecipe',
    bebidas: 'randomDrinkRecipe',
  }), []);

  function handleRandomFood() {
    dispatch(getRecipes(recipeTypeDictionary()[currentURL]));
  }

  useEffect(() => {
    if (randomFoodRecipe.length !== 0 || randomDrinkRecipe.length !== 0) {
      setRedirectToDetails(true);
    }
  }, [randomFoodRecipe, randomDrinkRecipe]);

  if (redirectToDetails && currentURL === 'comidas') {
    const { meals } = randomFoodRecipe;
    const { idMeal } = meals[0];
    return <Redirect to={ `/${currentURL}/${idMeal}` } />;
  }

  if (redirectToDetails && currentURL === 'bebidas') {
    const { drinks } = randomDrinkRecipe;
    const { idDrink } = drinks[0];
    return <Redirect to={ `/${currentURL}/${idDrink}` } />;
  }

  function getIngredientsByRecipeType() {
    if (currentURL === 'comidas') {
      dispatch(getRecipes('foodIngredients'));
    }
    if (currentURL === 'bebidas') {
      dispatch(getRecipes('drinkIngredients'));
    }
  }

  return (
    <section>
      <Link to={ `/explorar/${currentURL}/ingredientes` }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ getIngredientsByRecipeType }
        >
          Por Ingredientes
        </button>
      </Link>
      { currentURL === 'comidas' && <RenderExploreOriginButton /> }
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleRandomFood }
      >
        Me Surpreenda!
      </button>
    </section>
  );
}

export default ExploreFoodsButtons;
