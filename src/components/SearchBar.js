import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { SearchBarContext } from '../context/SearchBar';
import fetchByFilter from '../services/data';

export default function SearchBar(props) {
  const {
    input,
    setInput,
    radio,
    setRadio,
    recipeId,
    setRecipeId,
    dataValues,
    setDataValues,
    path,
    setPath,
    recipeType,
    setRecipeType,
    newSearch,
    setNewSearch,
    setData,
    data,
    setShouldCallCards,
  } = useContext(SearchBarContext);

  const { fetchType } = props;

  const history = useHistory();

  useEffect(() => {
    setDataValues(Object.values(data)[0]); // Pega a primeira posição dos valores de data, onde ficam todos os objectos de receitas
  }, [data, dataValues, setDataValues]);

  useEffect(() => {
    async function getPath() {
      if (dataValues && dataValues.length === 1) {
        if (fetchType === 'themealdb') {
          setRecipeType('comidas');
          setRecipeId(dataValues[0].idMeal);
        }
        if (fetchType === 'thecocktaildb') {
          setRecipeType('bebidas');
          setRecipeId(dataValues[0].idDrink);
        }
        await setPath(`/${recipeType}/${recipeId}`);
        history.push(path);
      }
    }
    getPath();
  }, [
    dataValues,
    fetchType,
    history,
    path,
    recipeId,
    recipeType,
    setPath,
    setRecipeId,
    setRecipeType,
  ]);

  useEffect(() => {
    if (newSearch && !dataValues) {
      // eslint-disable-next-line no-alert
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setShouldCallCards(false);
    }
    if (newSearch && dataValues && dataValues.length > 1) {
      setShouldCallCards(true);
    }
  }, [dataValues, setShouldCallCards, newSearch]);

  const handleClick = async () => {
    const urlToFetch = `https://www.${fetchType}.com/api/json/v1/1/${radio}${input}`;
    if (radio === 'search.php?f=' && input.length > 1) {
      // eslint-disable-next-line no-alert
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const dataFromApi = await fetchByFilter(urlToFetch);
    setData(dataFromApi);
    setNewSearch(true);
    setNewSearch(false);
  };

  return (
    <nav
      style={
        { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }
      }
    >
      <Form>
        <Form.Label htmlFor="search-input" style={ { margin: '5px' } }>
          <Form.Control
            id="search-input"
            type="text"
            data-testid="search-input"
            value={ input }
            onChange={ (e) => setInput(e.target.value) }
          />
        </Form.Label>
        <Button
          style={ { background: '#590202' } }
          variant="dark"
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => handleClick() }
        >
          Buscar
        </Button>
      </Form>
      <form
        style={
          { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }
        }
      >
        <label htmlFor="ingredient" style={ { margin: '5px' } }>
          <input
            style={ { margin: '5px' } }
            name="search-type"
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            value="filter.php?i="
            onChange={ (e) => setRadio(e.target.value) }
          />
          Ingrediente
        </label>
        <label htmlFor="name" style={ { margin: '5px' } }>
          <input
            style={ { margin: '5px' } }
            name="search-type"
            id="name"
            type="radio"
            data-testid="name-search-radio"
            value="search.php?s="
            onChange={ (e) => setRadio(e.target.value) }
          />
          Nome
        </label>
        <label htmlFor="first-letter" style={ { margin: '5px' } }>
          <input
            style={ { margin: '5px' } }
            name="search-type"
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="search.php?f="
            onChange={ (e) => setRadio(e.target.value) }
          />
          Primeira letra
        </label>
      </form>
    </nav>
  );
}

SearchBar.propTypes = {
  fetchType: PropTypes.string,
}.isRequired;
