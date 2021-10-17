import React, { useContext } from 'react';
import DetailsContext from '../../context/DetailsContext';

function Ingredients() {
  const { recipe } = useContext(DetailsContext);

  const getIngredientsAndMeasures = (type) => {
    const keys = Object.keys(recipe);
    const values = Object.values(recipe);
    const indexes = keys.reduce(((arr, key, index) => {
      if (key.includes(type)) return [...arr, index];
      return arr;
    }), []);
    const result = indexes.reduce(((arr, index) => {
      if (!['', ' ', null].includes(values[index])) return [...arr, values[index]];
      return arr;
    }), []);
    return result;
  };

  const getList = () => {
    const ingredients = getIngredientsAndMeasures('strIngredient');
    console.log(ingredients);
    const measure = getIngredientsAndMeasures('strMeasure');
    console.log(measure);
    return ingredients.map((ingredient, index) => (
      <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        { `${ingredient} ${measure[index] || ''}` }
      </li>
    ));
  };

  return (
    <section>
      <ol>
        { getList() }
      </ol>
    </section>
  );
}

export default Ingredients;
