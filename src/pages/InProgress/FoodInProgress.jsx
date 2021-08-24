import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import FavoriteButton from '../../globalComponents/FavoriteButtonMeals';
import shareIcon from '../../images/shareIcon.svg';
import styles from './FoodInProgress.module.css';

function FoodInProgress({ match }) {
  const { id } = match.params;
  const [ingredients, setIngredients] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState({});
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem('adding');
    const parsed = JSON.parse(cached);
    if (parsed) setAdded(parsed);
  }, []);

  useEffect(() => {
    localStorage.setItem('adding', JSON.stringify(added));
    const inputCheckboxs = document.querySelectorAll('input');
    const hasValues = Object.values(added).length === inputCheckboxs.length;
    const verifyChecked = hasValues && Object
      .values(added).every((item) => item === true);
    if (verifyChecked) setDisable(false);
    if (!verifyChecked) setDisable(true);
  }, [added]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((result) => result.json())
      .then((result) => {
        setIngredients(result.meals);
      });
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favorites = favoriteRecipes && favoriteRecipes.some((item) => item.id === id);
    if (favorites) {
      setFavorite(true);
    }
  }, [id]);

  function toList(line) {
    const magicNumber = 20;
    const ingredientList = new Array(magicNumber).fill().map((_, i) => {
      const ingredientKey = `strIngredient${i + 1}`;
      const measureKey = `strMeasure${i + 1}`;
      return [line[ingredientKey], line[measureKey]];
    }).filter(([ingredient, measure]) => {
      if (ingredient && measure) {
        return [ingredient, measure];
      }
      return null;
    });
    return { ...line, ingredientList };
  }

  const shareButtonHandle = () => {
    setCopied(true);
    const mSeconds = 2000;
    copy(`http://localhost:3000/comidas/${id}`);
    setTimeout(() => {
      setCopied(false);
    }, mSeconds);
  };

  function handleFinish() {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const objectStorage = {
      id,
      type: 'comida',
      area: ingredients[0].strArea ? ingredients[0].strArea : '',
      category: ingredients[0].strCategory ? ingredients[0].strCategory : '',
      alcoholicOrNot: ingredients[0].strAlcoholic ? ingredients[0].strAlcoholic : '',
      name: ingredients[0] && ingredients[0].strMeal.split(' ')[0],
      image: ingredients[0].strMealThumb,
      doneDate: `Made in ${day}/${month}/${year}`,
      tags: ingredients[0].strTags ? [ingredients[0].strTags] : '',
    };
    const prevStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (prevStorage === null) {
      localStorage.setItem('doneRecipes',
        JSON.stringify([objectStorage]));
    } else if (prevStorage !== null) {
      localStorage.setItem('doneRecipes',
        JSON.stringify([...prevStorage, objectStorage]));
    }
    setAdded({});
    localStorage.setItem('adding', JSON.stringify({}));
  }

  return (
    <main className={ `${styles.container} animeLeft` }>
      {ingredients && ingredients.map(toList)
        .map(({ ingredientList, ...meal }, index) => (
          <div key={ index }>
            <img
              data-testid="recipe-photo"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              className={ styles.heroImage }
            />
            <section className={ styles.heroContainer }>
              <div className={ styles.nameAndCategory }>

                <h1 data-testid="recipe-title">{meal.strMeal}</h1>
                <p data-testid="recipe-category">{meal.strCategory}</p>
              </div>

              <div className={ styles.sharedAndFavoriteButtons }>
                <button
                  data-testid="share-btn"
                  type="button"
                  onClick={ shareButtonHandle }
                >
                  <img src={ shareIcon } alt="share" />
                </button>
                <FavoriteButton
                  meals={ ingredients[0] }
                  favorite={ favorite }
                  setFavorite={ setFavorite }
                  id={ id }
                />
                <p>{copied ? 'Link copiado!' : null}</p>
              </div>
            </section>

            <h1>Ingredients</h1>
            {ingredientList.map(([ingredient, measure], i) => (
              <div
                key={ i }
                data-testid={ `${i}-ingredient-step` }
                className={ styles.ingredientsContainer }
              >
                <input
                  type="checkbox"
                  checked={ added[i.toString()] }
                  onClick={ (event) => setAdded({ ...added,
                    [i]: event.target.checked }) }
                />
                <span>{ingredient}</span>
                :
                <span>{ measure }</span>
              </div>
            ))}

            <h1>Instructions</h1>
            <p
              data-testid="instructions"
              className={ styles.instruction }
            >
              {meal.strInstructions}
            </p>
            <Link to="/receitas-feitas">
              <button
                type="button"
                className={ styles.button }
                data-testid="finish-recipe-btn"
                disabled={ disable }
                onClick={ handleFinish }
              >
                Finish Recipe
              </button>
            </Link>

            <Link
              to="/bebidas"
            >
              <button
                type="button"
                className={ styles.buttonBack }
              >
                Back
              </button>
            </Link>
          </div>
        ))}
    </main>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FoodInProgress;
