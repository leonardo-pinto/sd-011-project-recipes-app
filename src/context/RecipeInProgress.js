import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const InProgressContext = createContext();

export function InProgressProvider({ children }) {
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [measurementsArray, setMeasurementsArray] = useState([]);
  const [ingsChecked, setIngsChecked] = useState([]);
  const [enableFinishBtn, setEnableFinishBtn] = useState(false);
  const recipeId = window.location.pathname.split('/')[2];
  const isMeal = (window.location.pathname).includes('comidas');

  const setFinishButton = () => {
    if (isMeal) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const { meals } = inProgressRecipes;
      if (meals[recipeId]) {
        setEnableFinishBtn(ingredientsArray.length
          === meals[recipeId].length);
      }
    }
    if (!isMeal) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const { cocktails } = inProgressRecipes;
      console.log(ingredientsArray.length === cocktails[recipeId].length);
      if (cocktails[recipeId]) {
        setEnableFinishBtn(ingredientsArray.length
          === cocktails[recipeId].length);
      }
    }
  };
  const setDrinkType = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!inProgressRecipes) {
      return { cocktails: { [recipeId]: [] }, meals: { } };
    } if (inProgressRecipes && !inProgressRecipes.cocktails[recipeId]) {
      const { meals, cocktails } = inProgressRecipes;
      return { meals, cocktails: { ...cocktails, [recipeId]: [] } };
    }
    const { meals, cocktails } = inProgressRecipes;
    return { cocktails, meals };
  };

  const setMealType = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      return { cocktails: { }, meals: { [recipeId]: [] } };
    } if (inProgressRecipes && !inProgressRecipes.meals[recipeId]) {
      const { meals, cocktails } = inProgressRecipes;
      return { meals: { ...meals, [recipeId]: [] }, cocktails };
    }
    const { meals, cocktails } = inProgressRecipes;
    return { cocktails, meals };
  };

  const setLocalStorage = () => {
    const itemToSave = isMeal ? setMealType() : setDrinkType();
    localStorage.setItem('inProgressRecipes', JSON.stringify(itemToSave));
  };

  const updateLocalStorage = ({ target }) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals, cocktails } = inProgressRecipes;
    let itemToSave;
    if (isMeal) {
      if (target.checked) {
        itemToSave = {
          meals: {
            ...meals,
            [recipeId]: [...meals[recipeId], target.value],
          },
          cocktails,
        };
      } else {
        const ingArray = meals[recipeId].filter((item) => item !== target.value);
        itemToSave = {
          meals: {
            ...meals,
            [recipeId]: ingArray,
          },
          cocktails,
        };
      }
    }
    if (!isMeal) {
      if (target.checked) {
        itemToSave = {
          meals,
          cocktails: {
            ...cocktails,
            [recipeId]: [...cocktails[recipeId], target.value],
          },
        };
      } else {
        const ingArray = cocktails[recipeId].filter((item) => item !== target.value);
        itemToSave = {
          meals,
          cocktails: {
            ...cocktails,
            [recipeId]: ingArray,
          },
        };
      }
    }
    setIngsChecked(itemToSave);
    localStorage.setItem('inProgressRecipes', JSON.stringify(itemToSave));
  };

  const checkSavedItens = (item) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { cocktails, meals } = inProgressRecipes;
    if (isMeal && meals[recipeId].length > 0) {
      return meals[recipeId].some((ing) => ing === item);
    }
    if (!isMeal && cocktails[recipeId].length > 0) {
      return cocktails[recipeId].some((ing) => ing === item);
    }
    return false;
  };

  const value = {
    setDrinkType,
    setMealType,
    setLocalStorage,
    ingredientsArray,
    setIngredientsArray,
    measurementsArray,
    setMeasurementsArray,
    recipeId,
    setFinishButton,
    enableFinishBtn,
    updateLocalStorage,
    checkSavedItens,
    ingsChecked,
  };

  return (
    <InProgressContext.Provider value={ value }>
      { children }
    </InProgressContext.Provider>
  );
}

InProgressProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
