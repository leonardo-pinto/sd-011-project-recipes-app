import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import FavoriteButtonDrinks from '../../globalComponents/FavoriteButtonDrinks';
import shareIcon from '../../images/shareIcon.svg';
import '../../App.css';
import styles from './DrinkInProgress.module.css';

function DrinkInProgress({ match }) {
  const { id } = match.params;
  const [ingredients, setIngredients] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [checked, setChecked] = useState({});
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem('checkings');
    const parsed = cached && JSON.parse(cached);
    if (parsed) setChecked(parsed);
  }, []);

  useEffect(() => {
    localStorage.setItem('checkings', JSON.stringify(checked));
    const inputCheckboxs = document.querySelectorAll('input');
    const hasValues = Object.values(checked).length === inputCheckboxs.length;
    const verifyChecked = hasValues && Object
      .values(checked).every((item) => item === true);
    if (verifyChecked) setDisable(false);
    if (!verifyChecked) setDisable(true);
  }, [checked]);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((result) => result.json())
      .then((result) => {
        setIngredients(result.drinks);
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
    copy(`http://localhost:3000/bebidas/${id}`);
    setTimeout(() => {
      setCopied(false);
    }, mSeconds);
  };

  function handleFinish() {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const objectStorage = {
      id,
      type: 'bebida',
      area: '',
      category: ingredients[0].strCategory ? ingredients[0].strCategory : '',
      alcoholicOrNot: ingredients[0].strAlcoholic ? ingredients[0].strAlcoholic : '',
      name: ingredients[0] && ingredients[0].strDrink.split(' ')[0],
      image: ingredients[0].strDrinkThumb,
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
    setChecked({});
    localStorage.setItem('checkings', JSON.stringify({}));
  }

  return (
    <main className={ `${styles.container} animeLeft` }>
      {ingredients && ingredients.map(toList)
        .map(({ ingredientList, ...drink }, index) => (
          <div key={ index }>
            <img
              data-testid="recipe-photo"
              src={ drink.strDrinkThumb }
              alt={ `${drink.strDrink}` }
              className={ styles.heroImage }
            />
            <section className={ styles.heroContainer }>
              <div className={ styles.nameAndCategory }>
                <h1 data-testid="recipe-title">{drink.strDrink}</h1>
                <p data-testid="recipe-category">{drink.strCategory}</p>
              </div>

              <div className={ styles.sharedAndFavoriteButtons }>
                <button
                  data-testid="share-btn"
                  type="button"
                  onClick={ shareButtonHandle }
                >
                  <img src={ shareIcon } alt="share" />
                </button>
                <FavoriteButtonDrinks
                  drinks={ ingredients[0] }
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
                  checked={ checked[i.toString()] }
                  onClick={ (event) => setChecked({ ...checked,
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
              {drink.strInstructions}
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

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkInProgress;
