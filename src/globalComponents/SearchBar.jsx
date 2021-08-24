import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterHandle, fetchApi, renderFilter } from '../redux/actions';
import '../App.css';
import styles from './SearchBar.module.css';

export default function SearchBar({ modal, url }) {
  const dispatch = useDispatch();
  const { radio, searchInput } = useSelector((state) => state.Filter);

  function handleClick() {
    const checkLocation = url === '/comidas' ? 'themealdb' : 'thecocktaildb';
    if (radio === 'ingrediente') {
      const ingredientURL = `https://www.${checkLocation}.com/api/json/v1/1/filter.php?i=${searchInput}`;
      dispatch(fetchApi(ingredientURL));
    }
    if (radio === 'nome') {
      const nomeURL = `https://www.${checkLocation}.com/api/json/v1/1/search.php?s=${searchInput}`;
      dispatch(fetchApi(nomeURL));
    }
    if (radio === 'primeiraLetra') {
      const firstLetterURL = `https://www.${checkLocation}.com/api/json/v1/1/search.php?f=${searchInput}`;
      dispatch(fetchApi(firstLetterURL));
    } if (radio === 'primeiraLetra' && searchInput.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    dispatch(renderFilter(true));
  }

  return (
    <div>
      {modal && (
        <section className={ `${styles.container} animeLeft` }>
          <div className={ styles.inputBarContent }>
            <label htmlFor="inputText">
              <input
                id="inputText"
                name="searchInput"
                type="text"
                onChange={ ({ target }) => dispatch(filterHandle(target)) }
                data-testid="search-input"
                placeholder="Enter a term"
              />
            </label>
          </div>
          <div className={ styles.radios }>
            <label htmlFor="ingredient" className={ styles.radioLabel }>
              <input
                className={ styles.radio }
                value="ingrediente"
                name="radio"
                type="radio"
                data-testid="ingredient-search-radio"
                id="ingredient"
                onChange={ ({ target }) => dispatch(filterHandle(target)) }
              />
              Ingredient
            </label>
            <label htmlFor="name" className={ styles.radioLabel }>
              <input
                className={ styles.radio }
                value="nome"
                name="radio"
                type="radio"
                data-testid="name-search-radio"
                id="name"
                onChange={ ({ target }) => dispatch(filterHandle(target)) }
              />
              Name
            </label>
            <label htmlFor="firstLetter" className={ styles.radioLabel }>
              <input
                className={ styles.radio }
                value="primeiraLetra"
                name="radio"
                type="radio"
                data-testid="first-letter-search-radio"
                id="firstLetter"
                onChange={ ({ target }) => dispatch(filterHandle(target)) }
              />
              First Letter
            </label>
          </div>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleClick }
          >
            Search
          </button>
        </section>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  modal: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
};
