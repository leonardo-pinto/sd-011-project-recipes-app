import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { InProgressContext } from '../../context/RecipeInProgress';

export default function IngredientsList(props) {
  const { recipe, name, category } = props;
  const {
    setLocalStorage,
    ingredientsArray,
    setIngredientsArray,
    measurementsArray,
    setMeasurementsArray,
    updateLocalStorage,
    checkSavedItens,
    setFinishButton,
  } = useContext(InProgressContext);

  useEffect(setLocalStorage, [setLocalStorage]);

  useEffect(() => {
    setFinishButton();
  }, [setFinishButton]);

  useEffect(() => {
    const getItems = (searchedKey) => Object.entries(recipe).filter(
      (value) => value[0].includes(searchedKey) && value[1],
    ).map((item) => item[1]);
    console.log(recipe);
    if (recipe) {
      const ingredients = getItems('Ingredient');
      const measures = getItems('Measure');
      setIngredientsArray(ingredients);
      setMeasurementsArray(measures);
    }
  }, [recipe, setIngredientsArray, setMeasurementsArray]);

  return (
    <>
      <h1 data-testid="recipe-title">{ name }</h1>
      <p data-testid="recipe-category">{ category }</p>
      <Form>
        { ingredientsArray && ingredientsArray.map((ingredient, index) => (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <Form.Check
              checked={ checkSavedItens(ingredient) }
              id={ `id${index}` }
              name="ingredient"
              onClick={ (e) => { updateLocalStorage(e); } }
              key={ index }
              type="checkbox"
              value={ ingredient }
              label={ `${ingredient} ${
                measurementsArray[index]
                  ? ` - ${measurementsArray[index]}`
                  : ''
              }` }
            />
          </div>
        ))}
      </Form>
    </>
  );
}

IngredientsList.propTypes = {
  recipe: PropTypes.string,
}.isRequired;
