import React, { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import CardsRecipesDone from '../components/CardsRecipesDone';
import Header from '../components/Header';

export default function DoneRecipes() {
  const doneRecipes = localStorage.getItem('doneRecipes');
  const parsedDoneRecipe = doneRecipes ? JSON.parse(doneRecipes) : [];
  const [filteredRecipes, setFilteredRecipes] = useState(parsedDoneRecipe);
  const [type, setType] = useState('');

  useEffect(() => {
    if (doneRecipes) {
      const newFilteredRecipes = type
        ? [...parsedDoneRecipe.filter((recipe) => recipe.type === type)]
        : [...parsedDoneRecipe];
      setFilteredRecipes(newFilteredRecipes);
    }
  }, [type]);

  const handleChange = (val) => setType(val);
  return (
    <div>
      <Header title="Receitas Feitas" search={ false } />
      <section className="container-buttons" style={ { marginTop: '80px' } }>
        <ToggleButtonGroup
          type="radio"
          name="type"
          value={ type }
          onChange={ handleChange }
          className="buttons-filter-favor"
        >
          <ToggleButton
            className="button-favAndDone"
            data-testid="filter-by-all-btn"
            name="type"
            value=""
            variant="warning"
          >
            All
          </ToggleButton>
          <ToggleButton
            className="button-favAndDone"
            data-testid="filter-by-food-btn"
            name="type"
            value="comida"
            variant="warning"
          >
            Food
          </ToggleButton>
          <ToggleButton
            className="button-favAndDone"
            name="type"
            data-testid="filter-by-drink-btn"
            value="bebida"
            variant="warning"
          >
            Drink
          </ToggleButton>
        </ToggleButtonGroup>
      </section>
      <section>
        { (filteredRecipes.length > 0 && Object.keys(filteredRecipes[0]).length !== 0)
          ? filteredRecipes.map((recipe, index) => (
            <CardsRecipesDone recipe={ recipe } index={ index } key={ index } />))
          : <div>Sem receitas feitas</div>}
      </section>
    </div>
  );
}
