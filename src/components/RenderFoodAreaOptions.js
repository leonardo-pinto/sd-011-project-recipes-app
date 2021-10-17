import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes, setInput } from '../redux/slices/fetchReceitas';

function RenderFoodAreaOptions() {
  const {
    foodAreaList,
    foodAreaFilter,
    foods,
    input } = useSelector((state) => state.fetchReceitas);
  const dispatch = useDispatch();

  function handleFoodArea({ target: { value } }) {
    dispatch(setInput(value));
    dispatch(getRecipes('foodAreaFilter'));
  }

  useEffect(() => {
    dispatch(getRecipes('foodAreaList'));
    dispatch(setInput('All'));
    dispatch(getRecipes('foods'));
  }, [dispatch]);

  const limitCards = 12;

  if (foodAreaList.meals) {
    let filterType;
    if (input === 'All') {
      filterType = foods.meals;
    }
    if (input !== 'All') {
      filterType = foodAreaFilter.meals;
    }
    return (
      <div>
        <label htmlFor="recipe-origin">
          <select
            id="recipe-origin"
            data-testid="explore-by-area-dropdown"
            onChange={ handleFoodArea }
          >
            <option data-testid="All-option" value="All">All</option>
            {foodAreaList.meals.map(({ strArea }, index) => (
              <option
                data-testid={ `${strArea}-option` }
                value={ strArea }
                key={ index }
              >
                { strArea }
              </option>
            ))}
          </select>
        </label>
        { filterType && filterType.slice(0, limitCards)
          .map(({ strMeal, strMealThumb, idMeal }, index) => (
            <Link key={ index } to={ `/comidas/${idMeal}` }>
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ strMeal }
                  width="50px"
                />
                <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
              </div>
            </Link>
          ))}
      </div>
    );
  }
  return null;
}

export default RenderFoodAreaOptions;
