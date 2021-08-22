import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ShareButton from './ShareButton';
import verifyIngredients from '../../Helpers/verifyIngredients';
import '../../styles/detail-screen.css';
import FavoriteButton from './FavoriteButton';
import { manageDetailAPI } from '../../Helpers/convertUrlToID';
import setDoneRecipes from '../../Helpers/setDoneRecipes';
import createDoneRecipes from '../../Helpers/createDoneRecipes';
import '../../styles/inProgressFood.css';

function InProgressDrink() {
  const { id } = useParams();
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [showFinish, setShowFinish] = useState(true);
  const [itemDetail, setItemDetail] = useState({
    drinks: null,
  });

  const arrayOfIngredients = [];
  const arrayOfMeasures = [];

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    createDoneRecipes(doneRecipes);

    const currentStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!currentStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { [id]: [] },
        meals: {},
      }));
    }

    if (currentStorage && currentStorage.cocktails[id]) {
      setUsedIngredients(currentStorage.cocktails[id]);
    }

    const fetchFood = async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL);
      const detailRequest = await response.json();
      setItemDetail(manageDetailAPI(detailRequest));
    };
    fetchFood();

    if (arrayOfIngredients.length === usedIngredients.length) {
      setShowFinish(false);
    } else {
      setShowFinish(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    currentStorage.cocktails[id] = usedIngredients;
    localStorage.setItem('inProgressRecipes', JSON.stringify(currentStorage));
    // eslint-disable-next-line react-hooks/exhaustive-deps

    if (arrayOfIngredients.length === usedIngredients.length) {
      setShowFinish(false);
    } else {
      setShowFinish(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedIngredients, arrayOfIngredients]);

  // Parte que separa os ingredientes da receitas
  if (itemDetail.drinks !== null) {
    const food = itemDetail.drinks[0];

    const arrayOfIngredientsKey = Object
      .keys(food).filter((key) => key.includes('strIngredient'));
    const arrayOfMeasuresKey = Object
      .keys(food).filter((key) => key.includes('strMeasure'));
    arrayOfIngredientsKey
      .map((ingredient) => verifyIngredients(food[ingredient], arrayOfIngredients));
    arrayOfMeasuresKey
      .map((ingredient) => verifyIngredients(food[ingredient], arrayOfMeasures));
  }

  function handleCheckBox(ingredient) {
    return usedIngredients.includes(ingredient)
      ? setUsedIngredients(usedIngredients.filter((ing) => ing !== ingredient))
      : setUsedIngredients(usedIngredients.concat(ingredient));
  }

  const { drinks } = itemDetail;
  return itemDetail.drinks !== null && (
    <div className="d-flex flex-column container pb-4">
      <h1 className="align-self-center" data-testid="recipe-title">{drinks[0].strDrink}</h1>
      <img
        width="100%"
        src={ drinks[0].strDrinkThumb }
        alt={ `Foto da bebida chamada ${drinks[0].strDrink}` }
        data-testid="recipe-photo"
      />
      <div>
        <FavoriteButton currentItem={ drinks[0] } typeOf="Drink" />
        <ShareButton />
      </div>
      <p style={ { fontWeight: 'bold' } } data-testid="recipe-category">{drinks[0].strCategory}</p>
      <section>
        <h2>Ingredientes</h2>
        <div className="d-flex flex-column">
          { arrayOfIngredients.map((ingredient, i) => (
            <label
              htmlFor={ ingredient }
              key={ `${ingredient}-${i}` }
              data-testid={ `${i}-ingredient-step` }
            >
              <input
                type="checkbox"
                id={ ingredient }
                className="mr-1"
                onChange={ () => handleCheckBox(ingredient) }
                checked={ usedIngredients.includes(ingredient) }
              />
              {`${arrayOfIngredients[i]} - ${arrayOfMeasures[i]}`}
            </label>
          ))}
        </div>
      </section>
      <section>
        <h2>Instruções</h2>
        <p data-testid="instructions">{drinks[0].strInstructions}</p>
      </section>
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          className="finish-recipe-button"
          disabled={ showFinish }
          onClick={ () => setDoneRecipes(id, drinks[0], 'drinks') }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default InProgressDrink;
