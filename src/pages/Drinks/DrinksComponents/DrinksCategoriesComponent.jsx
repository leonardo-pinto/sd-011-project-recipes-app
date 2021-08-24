import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinksByCategories, fetchDrinksCategories, getDrinkCategory,
  setDrinkToogle } from '../../../redux/actions';
import styles from '../Drinks.module.css';

function DrinksCategoriesComponent() {
  const { drinksCategories } = useSelector((state) => state.DrinksCategories);
  const { toogle, selectedCategory } = useSelector((state) => state.DrinksByCategories);
  const dispatch = useDispatch();
  const max = 5;

  React.useEffect(() => {
    async function getCategories(value) {
      await dispatch(fetchDrinksCategories(value));
    }
    getCategories();
  }, [dispatch]);

  function handleClick(value) {
    async function getDrinksByCategories() {
      await dispatch(fetchDrinksByCategories(value));
    }
    getDrinksByCategories();
  }

  return (
    <div className={ styles.categoryButtons }>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => {
          dispatch(setDrinkToogle(false));
          dispatch(getDrinkCategory(''));
        } }
      >
        All
      </button>
      {drinksCategories.drinks && drinksCategories.drinks
        .filter((_, index) => index < max)
        .map((item, index) => (
          <button
            data-testid={ `${item.strCategory}-category-filter` }
            type="button"
            value={ item.strCategory }
            key={ index }
            onClick={ ({ target }) => {
              handleClick(target.value);
              dispatch(getDrinkCategory(target.value));
              if (target.value === selectedCategory) {
                dispatch(setDrinkToogle(false));
                console.log(toogle);
              } else {
                dispatch(setDrinkToogle(true));
              }
            } }
          >
            {item.strCategory}
          </button>
        ))}
    </div>
  );
}

export default DrinksCategoriesComponent;
