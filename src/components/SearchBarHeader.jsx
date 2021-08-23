import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import AppContext from '../context/AppContext';
import '../styles/searchBarHeader.css';
import '../styles/mainRecipes.css';

function SearchBarHeader({ foodOrDrink }) {
  const { filterRadio,
    setFilterRadio,
    filterText,
    setFilterText,
    filteredItem,
    fetchFood,
    fetchDrink,
  } = useContext(AppContext);

  const maxLength = 12;
  const history = useHistory();
  console.log('teste', filteredItem);

  function renderRecipes(item, index) {
    return (
      <div className="itemCard" data-testid={ `${index}-recipe-card` } key={ index }>
        <img
          src={ foodOrDrink === 'Comidas' ? item.strMealThumb : item.strDrinkThumb }
          alt="food_image"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>
          {foodOrDrink === 'Comidas' ? item.strMeal : item.strDrink}
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (filterRadio === 'f' && filterText.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }, [filterText]);

  useEffect(() => {
    console.log(filteredItem);
    if (filteredItem.length === 1 && foodOrDrink === 'Comidas') {
      history.push(`/comidas/${filteredItem[0].idMeal}`);
    } if (filteredItem.length === 1 && foodOrDrink === 'Bebidas') {
      history.push(`/bebidas/${filteredItem[0].idDrink}`);
    }
  }, [filteredItem]);

  return (
    <main>
      <form id="form">
        <div className="inputAndBttn">
          <input
            type="text"
            placeholder="Pesquisar Receita"
            data-testid="search-input"
            onChange={ (e) => setFilterText(e.target.value) }
          />
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ foodOrDrink === 'Comidas' ? fetchFood : fetchDrink }
          >
            Buscar
          </button>
        </div>
        <div className="radioInputs">
          <label htmlFor="ingredient">
            <input
              type="radio"
              id="ingredient"
              name="radiosFilter"
              data-testid="ingredient-search-radio"
              value="i"
              onClick={ (e) => setFilterRadio(e.target.value) }
            />
            Ingrediente
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              name="radiosFilter"
              data-testid="name-search-radio"
              value="s"
              onClick={ (e) => setFilterRadio(e.target.value) }
            />
            Nome
          </label>
          <label htmlFor="firstLetter">
            <input
              type="radio"
              id="firstLetter"
              name="radiosFilter"
              data-testid="first-letter-search-radio"
              value="f"
              onClick={ (e) => setFilterRadio(e.target.value) }
            />
            Primeira letra
          </label>
        </div>
      </form>
      <div className="flexMainCard mainRecipes searchedCards">
        {filteredItem.length > 1 && (
          filteredItem.filter((item, index) => index < maxLength).map(renderRecipes)
        )}
      </div>
    </main>
  );
}

export default SearchBarHeader;

SearchBarHeader.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};
