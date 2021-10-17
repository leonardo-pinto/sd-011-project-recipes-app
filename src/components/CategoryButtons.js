import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, setInput } from '../redux/slices/fetchReceitas';

function CategoryButtons() {
  const [categories, setCategories] = useState([]);
  const { input } = useSelector((state) => state.fetchReceitas);
  const dispatch = useDispatch();
  const LIMIT_CATEGORIES = 5;

  const {
    foodCategories,
    drinksCategories,
    loading,
  } = useSelector((state) => state.fetchReceitas);

  const getRecipesCategorie = ({ target: { value } }) => {
    const { pathname } = window.location;
    const currentURL = pathname.split('/')[1];
    let url = currentURL === 'comidas'
      ? 'filterByFoodCategorie'
      : 'filterByDrinkCategorie';
    if (value === input || value === 'all') {
      value = '';
      url = currentURL === 'comidas'
        ? 'foods'
        : 'drinks';
    }
    dispatch(setInput(value));
    dispatch(getRecipes(url));
  };

  useEffect(() => {
    const { pathname } = window.location;
    const currentURL = pathname.split('/')[1];
    const categoriesToSet = currentURL === 'comidas'
      ? foodCategories.meals
      : drinksCategories.drinks;
    setCategories(categoriesToSet);
  }, [foodCategories, drinksCategories]);

  if (loading || !categories || categories.length === 0) {
    return (<div>Loading</div>);
  }

  return (
    <nav>
      <button
        type="button"
        data-testid="All-category-filter"
        value="all"
        onClick={ getRecipesCategorie }
      >
        All
      </button>
      {categories.slice(0, LIMIT_CATEGORIES).map(({ strCategory }, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${strCategory}-category-filter` }
          value={ strCategory }
          onClick={ getRecipesCategorie }
        >
          { strCategory }
        </button>
      ))}
    </nav>
  );
}

export default CategoryButtons;
