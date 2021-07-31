import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

// Aux vars
const firstLetter = 'first-letter';

// endpoint de comidas
const URL_FOOD_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const URL_FOOD_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_FOOD_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
// ====================

// endpoint de bebidas
const URL_DRINK_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const URL_DRINK_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const URL_DRINK_FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
// ====================

function Provider({ children }) {
  const [dataFood, setDataFoods] = useState(null);
  const [dataDrinks, setDataDrinks] = useState(null);
  const [APIerror, setError] = useState(null);
  const [requestFoodParams, setRequestFoodParams] = useState({
    searchInput: '', searchMethod: '' });
  const [requestDrinksParams, setRequestDrinksParams] = useState({
    searchInput: '', searchMethod: '' });

  useEffect(() => {
    const { searchInput, searchMethod } = requestFoodParams;
    const fetchFoodData = async () => {
      let response;
      if (searchMethod === firstLetter && searchInput.length !== 1) {
        // eslint-disable-next-line no-alert
        alert('Sua busca deve conter somente 1 (um) caracter');
        return;
      }
      try {
        if (searchMethod === 'ingredients') {
          response = await fetch(`${URL_FOOD_INGREDIENTS}${searchInput}`);
        }
        if (searchMethod === 'name') {
          response = await fetch(`${URL_FOOD_NAME}${searchInput}`);
        }
        if (searchMethod === firstLetter) {
          response = await fetch(`${URL_FOOD_FIRST_LETTER}${searchInput}`);
        }
        const result = await response.json();
        setDataFoods(result);
      } catch (error) {
        setError(error);
      }
    };
    fetchFoodData();
  }, [requestFoodParams]);

  useEffect(() => {
    const { searchInput, searchMethod } = requestDrinksParams;
    const fetchDrinkData = async () => {
      console.log(requestDrinksParams);
      let response;
      if (searchMethod === firstLetter && searchInput.length !== 1) {
        // eslint-disable-next-line no-alert
        alert('Sua busca deve conter somente 1 (um) caracter');
        return;
      }
      try {
        if (searchMethod === 'ingredients') {
          response = await fetch(`${URL_DRINK_INGREDIENTS}${searchInput}`);
        }
        if (searchMethod === 'name') {
          response = await fetch(`${URL_DRINK_NAME}${searchInput}`);
        }
        if (searchMethod === firstLetter) {
          response = await fetch(`${URL_DRINK_FIRST_LETTER}${searchInput}`);
        }
        const result = await response.json();
        setDataDrinks(result);
      } catch (error) {
        setError(error);
      }
    };
    fetchDrinkData();
  }, [requestDrinksParams]);
  console.log('dataDrink:', dataDrinks);

  const context = {
    dataFood,
    setRequestFoodParams,
    setRequestDrinksParams,
    dataDrinks,
    APIerror,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
