import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import {
  getFoodsCategory,
  getFoodsByCategory,
  getFoodsInitial } from '../../Services/ApiFood';
import MainContext from '../../Context/MainContext';
import '../../css/FilterButtons.css';

function FilterButtonsFood() {
  const limit = 5;
  const [categorySelected, setCategorySelected] = useState('');
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const foodsCategoryAPI = await getFoodsCategory();
    setCategories(foodsCategoryAPI.meals);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const { setFoodsByCategory } = useContext(MainContext);

  async function fetchFoodsByCategory(value) {
    if (categorySelected === value || value === 'all') {
      const foodsInitialAPI = await getFoodsInitial();
      setFoodsByCategory(foodsInitialAPI.meals);
    } else {
      setCategorySelected(value);
      const foodsByCategory = await getFoodsByCategory(value);
      setFoodsByCategory(foodsByCategory.meals);
    }
  }

  return (
    <div className="button-filter-foods">
      <Button
        variant="secondary"
        type="button"
        data-testid="All-category-filter"
        value="all"
        onClick={ ({ target }) => fetchFoodsByCategory(target.value) }
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
          onClick={ ({ target }) => fetchFoodsByCategory(target.value) }
        >
          { category.strCategory }
        </Button>
      )) }
    </div>
  );
}

export default FilterButtonsFood;
