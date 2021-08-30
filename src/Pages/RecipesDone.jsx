import React, { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import HeaderRecipesDone from '../Components/headers/HeaderRecipesDone';
import RecipeDone from '../Components/FilterButtons/RecipeDone';
import MainContext from '../Context/MainContext';
import '../css/RecipesDone.css';

function RecipesDone() {
  const { setFilterDone } = useContext(MainContext);

  function handleClick({ value }) {
    setFilterDone(value);
  }

  return (
    <div>
      <HeaderRecipesDone />
      <ButtonGroup aria-label="filters" className="filters-buttons">
        <Button
          variant="secondary"
          type="button"
          data-testid="filter-by-all-btn"
          value="All"
          onClick={ (e) => handleClick(e.target) }
        >
          All
        </Button>
        <Button
          variant="secondary"
          type="button"
          data-testid="filter-by-food-btn"
          value="Foods"
          onClick={ (e) => handleClick(e.target) }
        >
          Food
        </Button>
        <Button
          variant="secondary"
          type="button"
          data-testid="filter-by-drink-btn"
          value="Drinks"
          onClick={ (e) => handleClick(e.target) }
        >
          Drinks
        </Button>
      </ButtonGroup>
      <RecipeDone />
    </div>
  );
}

export default RecipesDone;
