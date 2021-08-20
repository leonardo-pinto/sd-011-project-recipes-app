import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { Card } from 'react-bootstrap';
import ButtonShare from '../components/ButtonShare';
import IngredientsList from '../components/RecipeInProgress/IngredientsList';
import ButtonFinish from '../components/RecipeInProgress/ButtonFinish';
import { InProgressProvider } from '../context/RecipeInProgress';
import ButtonFavorite from '../components/ButtonFavorite';
import fetchByFilter from '../services/data';

export default function RecipeInProgress({ location }) {
  const [recipe, setRecipe] = useState();
  const recipeId = window.location.pathname.split('/')[2];
  const isMeal = (window.location.pathname).includes('comidas');

  const { state } = location;
  console.log(isMeal);

  useEffect(() => state && !recipe && setRecipe(state), [recipe, state]);

  useEffect(() => {
    if (!state) {
      let fetchType = 'thecocktaildb';
      if (isMeal) {
        fetchType = 'themealdb';
      }
      const URL = `https://www.${fetchType}.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const getRecipe = async () => {
        const response = await fetchByFilter(URL);
        return isMeal ? setRecipe(response.meals[0]) : setRecipe(response.drinks[0]);
      };
      getRecipe();
    }
  }, [isMeal, recipeId, state]);

  if (recipe) {
    const CHARACTERS = -12;
    return (
      <InProgressProvider>
        <Card style={ { width: '90%', margin: '15px auto' } }>
          <Card.Img
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt={ recipe.idDrink || recipe.idMeal }
            data-testid="recipe-photo"
          />
          <Card.Body>
            <Card.Title>{ recipe.strDrink || recipe.strMeal }</Card.Title>
            <Card.Text>
              { recipe.strAlcoholic }
            </Card.Text>
            <Card.Text style={ { display: 'flex', justifyContent: 'space-around' } }>
              <ButtonFavorite objData={ recipe } />
              <ButtonShare
                path={ window.location.href.slice(0, CHARACTERS) }
                testid="share-btn"
              />
            </Card.Text>
            <Card.Text>
              <IngredientsList
                recipe={ recipe }
                id={ recipe.idDrink || recipe.idMeal }
                category={ recipe.strCategory }
              />
            </Card.Text>
            <Card.Subtitle>Receita</Card.Subtitle>
            <Card.Text data-testid="instructions">{ recipe.strInstructions }</Card.Text>
            <ButtonFinish recipe={ recipe } />
          </Card.Body>
        </Card>
      </InProgressProvider>
    );
  }
  return <div>Carregando...</div>;
}

RecipeInProgress.propTypes = {
  location: PropTypes.string,
  state: PropTypes.string,
}.isRequired;
