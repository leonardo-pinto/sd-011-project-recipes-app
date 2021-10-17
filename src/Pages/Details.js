import React from 'react';
import HeaderDetails from '../components/details/HeaderDetails';
import Ingredients from '../components/details/Ingredients';
import ButtonStartRecipe from '../components/details/ButtonStartRecipe';
import RenderRecomendations from '../components/RenderRecomendations';
import DetailsContext from '../context/DetailsContext';
import useFetch from '../hooks/useFetch';
import identifyRecipeTypeInput from '../helpers/identifyRecipeTypeInput';
import createRecipeObject from '../helpers/createRecipeObject';
import Video from '../components/details/Video';

function Details() {
  const { data, isLoading, error } = useFetch(identifyRecipeTypeInput());
  const recipeContent = createRecipeObject();

  if (error) return <p>{ error }</p>;
  if (!data || isLoading) return <div>Loading...</div>;
  return (
    <main>
      <DetailsContext.Provider
        value={ { recipe: data[recipeContent.type][0], recipeContent } }
      >
        <HeaderDetails />
        <Ingredients />
        { recipeContent.type === 'meals' && <Video /> }
        <RenderRecomendations typeReco="comidas" />
        <ButtonStartRecipe />
      </DetailsContext.Provider>
    </main>
  );
}

export default Details;
