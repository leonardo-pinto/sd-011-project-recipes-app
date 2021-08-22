import React, { useEffect, useContext/* , useState */ } from 'react';
import MainContext from '../Context/MainContext';
import OnChangeCheckListFoods from './OnChangeCheckListFoods';

function Ingredients() {
  const {
    DetailsIngredientsFiltered,
    setDetailsIngredientsFiltered,
    DetailsMeasuresFiltered,
    setDetailsMeasuresFiltered,
    idFoodsAPI, startButton,
    count, /* setCount, */
    selected, /* setSelected, */
  } = useContext(MainContext);

  useEffect(() => {
    if (idFoodsAPI) {
      Object.entries(idFoodsAPI).forEach((o) => (
        o[1] === null || o[1] === '' || o[1] === ' ' ? delete idFoodsAPI[o[0]] : 0));

      const listIngredients = Object.entries(idFoodsAPI)
        .filter((recipe) => recipe[0].includes('Ingredient') && recipe[1]);
      const ingredientsFinal = listIngredients.map((valor) => valor[1]);

      const listMeasures = Object.entries(idFoodsAPI || {})
        .filter((recipe) => recipe[0].includes('Measure') && recipe[1]);
      const measuresFinal = listMeasures.map((valor) => valor[1]);

      setDetailsIngredientsFiltered(ingredientsFinal);
      setDetailsMeasuresFiltered(measuresFinal);
    }
  }, [idFoodsAPI, setDetailsIngredientsFiltered, setDetailsMeasuresFiltered]);

  // & teste====================================================================

  console.log(count);
  console.log(DetailsIngredientsFiltered.length);
  // & teste====================================================================

  return (
    <div>
      <h4>Recipe</h4>
      <ul>
        { !startButton && DetailsIngredientsFiltered.map((ing, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
          >
            { ing }
            {' '}
            -
            { ' ' }
            { DetailsMeasuresFiltered.map((mea, ind) => i === ind && (mea)) }
          </li>
        )) }
      </ul>
      {/* //& ========================================================== */}
      <summary>
        {selected > 0 ? selected : null}
      </summary>
      <OnChangeCheckListFoods />
    </div>
  );
}

export default Ingredients;
