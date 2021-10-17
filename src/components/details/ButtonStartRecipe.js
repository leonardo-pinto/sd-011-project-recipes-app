import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DetailsContext from '../../context/DetailsContext';

function ButtonStartRecipe() {
  const { recipe, recipeContent } = useContext(DetailsContext);
  const { linkToGo, id, storage } = recipeContent;
  const { inProgressRecipes } = useSelector((state) => state.localStorageRecipes);

  return (
    <Link to={ `/${linkToGo}/${recipe[id]}/in-progress` }>
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ {
          position: 'fixed',
          bottom: '0',
        } }
      >
        { Object.keys(inProgressRecipes[storage])
          .some((recipeId) => recipeId === recipe[id])
          ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    </Link>
  );
}

export default ButtonStartRecipe;
