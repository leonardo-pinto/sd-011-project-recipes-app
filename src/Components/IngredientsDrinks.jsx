import React, { useEffect, useContext } from 'react';
import MainContext from '../Context/MainContext';
import OnChangeCheckListDrinks from './OnChangeCheckListDrinks';

function Ingredients() {
  const {
    DetailsIngredFilterForDrinks,
    setDetailsIngredFilterForDrinks,
    DetailsMeasFilterForDrinks,
    setDetailsMeasFilterForDrinks,
    DetailsInstrucFilterForDrinks,
    setDetailsInstrucFilterForDrinks,
    idDrinksAPI, startButton, selected,
  } = useContext(MainContext);

  useEffect(() => {
    if (idDrinksAPI) {
      Object.entries(idDrinksAPI).forEach((o) => (
        o[1] === null || o[1] === '' || o[1] === ' ' ? delete idDrinksAPI[o[0]] : 0));

      const listIngredients = Object.entries(idDrinksAPI)
        .filter((recipe) => recipe[0].includes('Ingredient') && recipe[1]);
      const ingredientsFinal = listIngredients.map((valor) => valor[1]);

      const listMeasures = Object.entries(idDrinksAPI || {})
        .filter((recipe) => recipe[0].includes('Measure') && recipe[1]);
      const measuresFinal = listMeasures.map((valor) => valor[1]);

      const listInstructions = Object.entries(idDrinksAPI || {})
        .filter((recipe) => recipe[0].includes('strInstructions') && recipe[1]);
      const instructionsFinal = listInstructions.map((valor) => valor[1]);

      setDetailsInstrucFilterForDrinks(instructionsFinal);
      setDetailsIngredFilterForDrinks(ingredientsFinal);
      setDetailsMeasFilterForDrinks(measuresFinal);
    }
  }, [idDrinksAPI, setDetailsInstrucFilterForDrinks,
    setDetailsIngredFilterForDrinks,
    setDetailsMeasFilterForDrinks]);

  return (
    <div>
      <h4>Ingredients</h4>
      <ul>
        { !startButton && DetailsIngredFilterForDrinks.map((ing, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
          >
            { ing }
            {' '}
            -
            { ' ' }
            { DetailsMeasFilterForDrinks.map((mea, ind) => i === ind && (mea)) }
          </li>
        )) }
      </ul>
      <summary>
        {selected > 0 ? selected : null}
      </summary>
      <OnChangeCheckListDrinks />
      <h4>Instructions</h4>
      <ul>
        { DetailsInstrucFilterForDrinks.map((instructions, i) => (
          <li
            data-testid="instructions"
            key={ i }
          >
            { instructions }
          </li>
        )) }
      </ul>
    </div>
  );
}

export default Ingredients;
