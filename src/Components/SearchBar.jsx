import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import MainContext from '../Context/MainContext';
import '../css/SearchBar.css';

function SearchBar() {
  const { setInputSearch,
    setRadioBtn,
    page,
    fetchFood,
    fetchDrink,
    radioBtn } = useContext(MainContext);

  function handleOnClick() {
    if (page === 'foods') {
      fetchFood();
    }
    if (page === 'drinks') {
      fetchDrink();
    }
  }

  function handleChangeInput(value) {
    setInputSearch(value);
    if (radioBtn === 'letter' && value.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  return (
    <div className="search-bar">
      <input
        data-testid="search-input"
        placeholder="Search by ..."
        onChange={ ({ target: { value } }) => handleChangeInput(value) }
      />
      <br />
      <div className="radios">
        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="typeSearch"
            value="ingredient"
            id="ingredient"
            onChange={ ({ target: { value } }) => setRadioBtn(value) }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            data-testid="name-search-radio"
            name="typeSearch"
            value="name"
            id="name"
            onChange={ ({ target: { value } }) => setRadioBtn(value) }
          />
          Name
        </label>
        <label htmlFor="letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="typeSearch"
            value="letter"
            id="letter"
            onChange={ ({ target: { value } }) => setRadioBtn(value) }
          />
          Letter
        </label>
      </div>
      <Button
        variant="light"
        type="submit"
        data-testid="exec-search-btn"
        onClick={ () => handleOnClick() }
      >
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
