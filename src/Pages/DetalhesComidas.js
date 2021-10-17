import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import RenderRecomendations from '../components/RenderRecomendations';
import {
  getRecipes,
} from '../redux/slices/fetchReceitas';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import nonFavoriteIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

const getIngredients2 = (obj, type) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const indexes = keys.reduce(((arr, key, index) => {
    if (key.includes(type)) return [...arr, index];
    return arr;
  }), []);
  const response = [];
  indexes.forEach((ind, index) => {
    if (!['', ' ', null].includes(values[ind])) {
      const tag = (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          { values[ind] }
        </li>
      );
      response.push(tag);
    }
  });
  return response;
};

const deleteFavorite = (idRecipe) => {
  const arrayStoraged = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const arrayToStorage = arrayStoraged.filter(({ id }) => id !== idRecipe);
  localStorage.setItem('favoriteRecipes', JSON.stringify(arrayToStorage));
};

const setFavorite = (recipe) => {
  const { strMealThumb, strMeal, idMeal, strArea, strCategory } = recipe; // strAlcoholic, type
  const objToStorage = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };
  const arrayStoraged = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const arrayToStorage = [...arrayStoraged, objToStorage];
  localStorage.setItem('favoriteRecipes', JSON.stringify(arrayToStorage));
};

const verifyFavorite = (idRecipe) => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  return favorites.some(({ id }) => id === idRecipe);
};

const checkInProgress = (id) => {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    cocktails: {},
    meals: {},
  };
  const toCompare = inProgress.meals || {};
  // return toCompare.length > 0;
  return Object.keys(toCompare).some((recipeId) => recipeId === id);
};

function DetalhesComidas() {
  const [recipe, setRecipe] = useState({});
  const dispatch = useDispatch();
  const [copyOk, setCopyOk] = useState(false);
  const [isFavorite, setIsFavorite] = useState();
  const [isInProgress, setIsInProgress] = useState(false);

  const fetchUrl = (url) => {
    fetch(url)
      .then((data) => data.json())
      .then((recipeData) => setRecipe(recipeData.meals[0]));
  };

  useEffect(() => {
    const { pathname } = window.location;
    const recipeID = pathname.split('/')[2];
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;
    fetchUrl(URL);
    dispatch(getRecipes('drinks'));
    setIsFavorite(verifyFavorite(recipeID));
    setIsInProgress(checkInProgress(recipeID));
  }, []);

  const guide = () => {
    if (isFavorite) {
      deleteFavorite(recipe.idMeal);
      setIsFavorite(false);
    } else {
      setFavorite(recipe);
      setIsFavorite(true);
    }
  };

  return Object.keys(recipe).length === 0 ? (<p>Loading..</p>) : (
    <div>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
        width="30px"
      />
      <h3 data-testid="recipe-title">{ recipe.strMeal }</h3>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(window.location);
          setCopyOk(true);
        } }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      { copyOk && <p>Link copiado!</p> }
      <button
        type="button"
        onClick={ guide }
      >
        <img
          src={ isFavorite ? favoriteIcon : nonFavoriteIcon }
          data-testid="favorite-btn"
          alt="share"
        />
      </button>
      <h5 data-testid="recipe-category">{ recipe.strCategory }</h5>
      <ol>
        { getIngredients2(recipe, 'strIngredient') }
      </ol>
      <ol>
        { getIngredients2(recipe, 'strMeasure') }
      </ol>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <section data-testid="video">
        <YouTube
          videoId={ recipe.strYoutube.split('=')[1] }
          title={ recipe.strMeal }
          opts={ { height: '150', width: '200' } }
        />
      </section>
      <Link to={ `/comidas/${recipe.idMeal}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ {
            position: 'fixed',
            bottom: '0',
          } }
        >
          { isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>
      </Link>
      <RenderRecomendations typeReco="bebidas" />
    </div>
  );
}

// Arrumar dinâmica do botão

export default DetalhesComidas;
