import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRecipes,
  foodsAction,
  drinksAction,
  setInput } from '../redux/slices/fetchReceitas';

function SearchBar() {
  const { error, foods, drinks } = useSelector((state) => state.fetchReceitas);
  const dispatch = useDispatch();
  const [selectedRadio, setSelectedRadio] = useState();
  const [searchInput, setSearchInput] = useState();

  const drinksActions = {
    ingredients: drinksAction[0],
    firstLetter: drinksAction[1],
    name: drinksAction[2],
  };

  const foodsActions = {
    ingredients: foodsAction[0],
    firstLetter: foodsAction[1],
    name: foodsAction[2],
  };

  useEffect(() => {
    if (error !== null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [error]);

  function handleSearchInput({ target: { value } }) {
    setSearchInput(value);
  }
  if (foods.meals && foods.meals.length === 1) {
    const { idMeal } = foods.meals[0];
    return <Redirect to={ `/comidas/${idMeal}` } />;
  }
  if (drinks.drinks && drinks.drinks.length === 1) {
    const { idDrink } = drinks.drinks[0];
    return <Redirect to={ `/bebidas/${idDrink}` } />;
  }

  function handleRequest() {
    if (selectedRadio === 'firstLetter' && searchInput.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    dispatch(setInput(searchInput));
    const { pathname } = window.location;
    const recipeURL = pathname.split('/')[1];
    const action = recipeURL === 'comidas'
      ? foodsActions[selectedRadio]
      : drinksActions[selectedRadio];
    dispatch(getRecipes(action));
  }

  return (
    <form>
      <label htmlFor="search-bar">
        <input
          name="search-bar"
          data-testid="search-input"
          onChange={ handleSearchInput }
        />
      </label>
      <label htmlFor="radio-search">
        <input
          onChange={ () => setSelectedRadio('ingredients') }
          type="radio"
          name="radio"
          data-testid="ingredient-search-radio"
        />
        Ingredientes
        <input
          onChange={ () => setSelectedRadio('name') }
          type="radio"
          name="radio"
          data-testid="name-search-radio"
        />
        Nome
        <input
          onChange={ () => setSelectedRadio('firstLetter') }
          type="radio"
          name="radio"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      <button
        type="button"
        onClick={ handleRequest }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
