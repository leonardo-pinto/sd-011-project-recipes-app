import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RenderExploreOriginButton from './RenderExploreOriginButton';
import identifyRecipeType from '../helpers/identifyRecipeType';
import RedirectRandomRecipeDetails from './RedirectRandomRecipeDetails';

function ExploreFoodsButtons() {
  const recipeType = identifyRecipeType();
  const [redirectToDetails, setRedirectToDetails] = useState(false);

  if (redirectToDetails) {
    return <RedirectRandomRecipeDetails />;
  }

  return (
    <section>
      <Link to={ `/explorar/${recipeType}/ingredientes` }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      { recipeType === 'comidas' && <RenderExploreOriginButton /> }
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => setRedirectToDetails(true) }
      >
        Me Surpreenda!
      </button>
    </section>
  );
}

export default ExploreFoodsButtons;
