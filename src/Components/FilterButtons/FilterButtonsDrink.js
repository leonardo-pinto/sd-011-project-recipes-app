import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import {
  getDrinksCategory,
  getDrinksByCategory,
  getDrinksInitial } from '../../Services/ApiDrink';
import MainContext from '../../Context/MainContext';
import '../../css/FilterButtons.css';

function FilterButtonsDrink() {
  const limit = 5;
  const [categorySelected, setCategorySelected] = useState('');
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const drinksCategoryAPI = await getDrinksCategory();
    setCategories(drinksCategoryAPI.drinks);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const { setDrinksByCategory } = useContext(MainContext);

  async function fetchDrinksByCategory(value) {
    if (categorySelected === value || value === 'all') {
      const drinksInitialAPI = await getDrinksInitial();
      setDrinksByCategory(drinksInitialAPI.drinks);
    } else {
      setCategorySelected(value);
      const drinksByCategory = await getDrinksByCategory(value);
      setDrinksByCategory(drinksByCategory.drinks);
    }
  }

  return (
    <div className="filter-buttons-drinks">
      <Button
        variant="secondary"
        type="button"
        data-testid="All-category-filter"
        value="all"
        onClick={ ({ target }) => fetchDrinksByCategory(target.value) }
      >
        All
      </Button>
      { categories.map((category, index) => index < limit && (
        <Button
          variant="secondary"
          key={ index }
          type="button"
          value={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ ({ target }) => fetchDrinksByCategory(target.value) }
        >
          { category.strCategory }
        </Button>
      )) }
    </div>
  );
}

export default FilterButtonsDrink;
