import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../Context_Configs/Context';

function SearchBar({ value }) {
  const [searchParameters, setSearchParameters] = useState({
    searchInput: '',
    searchMethod: '',
  });

  const {
    setRequestFoodParams,
    setRequestDrinksParams,
    setRenderCategory } = useContext(Context);

  function clickFunctions() {
    if (value === 'foods') {
      setRequestFoodParams(searchParameters);
    } else {
      setRequestDrinksParams(searchParameters);
    }
    setRenderCategory(true);
  }

  return (
    <div className="container-fluid">
      <section className="row">
        <div className="col-7">
          <label htmlFor="search-input">
            <input
              onChange={ (e) => setSearchParameters({ ...searchParameters,
                searchInput: e.target.value }) }
              id="search-input"
              data-testid="search-input"
              type="text"
              placeholder="Busca Receita"
            />
          </label>
        </div>
        <div className="col-5 pl-3">
          <button
            type="button"
            data-testid="exec-search-btn"
            className="search-button"
            onClick={ () => clickFunctions() }
          >
            Pesquisar
          </button>
        </div>
      </section>
      <form className="d-flex flex-column">
        <label htmlFor="ingredients">
          <input
            onChange={ (e) => setSearchParameters({ ...searchParameters,
              searchMethod: e.target.id }) }
            data-testid="ingredient-search-radio"
            name="parameter"
            id="ingredients"
            type="radio"
            className="mr-2"
          />
          Ingredientes
        </label>
        <label htmlFor="name">
          <input
            onChange={ (e) => setSearchParameters({ ...searchParameters,
              searchMethod: e.target.id }) }
            data-testid="name-search-radio"
            name="parameter"
            id="name"
            type="radio"
            className="mr-2"
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            onChange={ (e) => setSearchParameters({ ...searchParameters,
              searchMethod: e.target.id }) }
            data-testid="first-letter-search-radio"
            name="parameter"
            id="first-letter"
            type="radio"
            className="mr-2"
          />
          Primeira Letra
        </label>

      </form>
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
};
