import React, { useContext } from 'react';
import MainContext from '../../Context/MainContext';
import AllDone from '../filterDoneRecipes/AllDone';
import DrinksDone from '../filterDoneRecipes/DrinksDone';
import FoodsDone from '../filterDoneRecipes/FoodsDone';

export default function RecipeDone() {
  const { filterDone } = useContext(MainContext);

  const storage = JSON.parse(localStorage.getItem('doneRecipes'));

  // console.log('localStorage', storage);
  if (storage) {
    if (filterDone === 'All') {
      return (
        <AllDone />
      );
    }
    if (filterDone === 'Drinks') {
      return (
        <DrinksDone />
      );
    }
    if (filterDone === 'Foods') {
      return (
        <FoodsDone />
      );
    }
  }
  return (
    <h1>Sou receitas feitas</h1>
  );
}
