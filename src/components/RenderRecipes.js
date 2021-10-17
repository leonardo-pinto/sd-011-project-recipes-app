import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialRecipes } from '../redux/slices/fetchReceitas';
import { allFoods, allDrinks } from '../helpers/endpoints';
import createRecipeObject from '../helpers/createRecipeObject';
import useFetchInitial from '../hooks/useFetchInitial';

function RenderRecipes({ redirectedFromIngredients }) {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useFetchInitial(allFoods, allDrinks);
  const { foods, drinks } = useSelector((state) => state.fetchReceitas);

  if (error) return <p>{error}</p>;

  if (isLoading) return <p>Loading...</p>;

  if (data) {
    dispatch(setInitialRecipes(data));
  }

  const recipeType = (createRecipeObject(foods, drinks));

  // useEffect(() => {
  //   if (redirectedFromIngredients !== undefined) {
  //     dispatch(setInput(redirectedFromIngredients));
  //     const { pathname } = window.location;
  //     const recipeURL = pathname.split('/')[1];
  //     const action = recipeURL === 'comidas'
  //       ? 'foodByIngredients'
  //       : 'drinkByIngredients';
  //     dispatch(getRecipes(action));
  //   }
  // }, [redirectedFromIngredients, dispatch]);

  const { recipes, type, name, image, id, linkToGo } = recipeType;
  const limitRecipes = 12;

  return (
    <section>
      {(type !== '' && recipes !== null)
        && recipes.slice(0, limitRecipes).map((recipe, index) => (
          <Link to={ `${linkToGo}/${recipe[id]}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <p data-testid={ `${index}-card-name` }>{recipe[name]}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe[image] }
                alt={ name }
                width="50px"
              />
            </div>
          </Link>
        ))}

    </section>
  );
}

export default RenderRecipes;

RenderRecipes.propTypes = {
  redirectedFromIngredients: PropTypes.string.isRequired,
};
