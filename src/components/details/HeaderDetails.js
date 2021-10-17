import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailsContext from '../../context/DetailsContext';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/blackHeartIcon.svg';
import nonFavoriteIcon from '../../images/whiteHeartIcon.svg';
import { deleteFavorite, addFavorite } from '../../redux/slices/localStorageRecipes';

const copy = require('clipboard-copy');

function HeaderDetails() {
  const { recipe, recipeContent } = useContext(DetailsContext);
  const { favoriteRecipes } = useSelector((state) => state.localStorageRecipes);
  const { image, name, id, category, linkToGo } = recipeContent;
  const [copyOk, setCopyOk] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favoriteRecipes
    .some(({ id: idRecipe }) => recipe[id] === idRecipe));
  const dispatch = useDispatch();

  const setFavorite = () => {
    const objToStorage = {
      id: recipe[id],
      type: linkToGo,
      area: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[name],
      image: recipe[image],
    };
    dispatch(addFavorite(objToStorage));
  };

  const guide = () => {
    if (isFavorite) {
      dispatch(deleteFavorite(recipe[id]));
      setIsFavorite(false);
    } else {
      setFavorite();
      setIsFavorite(true);
    }
  };

  return (
    <header>
      <img
        src={ recipe[image] }
        alt={ recipe[name] }
        data-testid="recipe-photo"
        width="80px"
      />
      <h1 data-testid="recipe-title">{ recipe[name] }</h1>
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
      <h5 data-testid="recipe-category">{ recipe[category] }</h5>
      <p data-testid="instructions">{ recipe.strInstructions }</p>
    </header>
  );
}

export default HeaderDetails;
