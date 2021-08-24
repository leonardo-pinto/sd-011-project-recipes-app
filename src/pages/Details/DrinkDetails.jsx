import PropTypes from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import styles from './DrinkDetails.module.css';
import shareIcon from '../../images/shareIcon.svg';
import FavoriteButtonDrinks from '../../globalComponents/FavoriteButtonDrinks';
import Picture from '../../images/loginIMG.png';

function DrinkDetails({ match }) {
  const [drinks, setDrinks] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [foodRecomendation, setRecomendation] = useState([]);
  const { id } = match.params;
  const mN = 6;

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const isDone = doneRecipes && doneRecipes.some((item) => item.id === id);

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgress = inProgressRecipes && inProgressRecipes.cocktails[id];

  React.useEffect(() => {
    const fetchDrink = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setDrinks(data.drinks[0]));
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setRecomendation(data.meals.filter((_, index) => index < mN)));
    };
    fetchDrink();
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favorites = favoriteRecipes && favoriteRecipes.some((item) => item.id === id);
    if (favorites) {
      setFavorite(true);
    }
  }, [id]);

  if (Object.keys(drinks).length === 0) {
    return (
      <div className={ styles.loadingContainer }>
        <img
          src={ Picture }
          alt="Prato de comida"
          className={ styles.rotation }
        />
        <h1>Loading...</h1>
      </div>
    );
  }
  const ingredients = Object.keys(drinks)
    .filter((item) => item.includes('Ingredient'))
    .filter((item) => drinks[item]).map((item) => drinks[item]);

  const measures = Object.keys(drinks)
    .filter((item) => item.includes('Measure'))
    .filter((item) => drinks[item]).map((item) => drinks[item]);

  const shareButtonHandle = () => {
    setCopied(true);
    const mSeconds = 2000;
    copy(window.location.href);
    setTimeout(() => {
      setCopied(false);
    }, mSeconds);
  };

  return (
    <main className={ `${styles.container} animeLeft` }>
      <div className={ styles.heroImageContainer }>
        <img
          src={ drinks.strDrinkThumb }
          alt="recipe"
          data-testid="recipe-photo"
          className={ styles.heroImage }
        />
      </div>
      <section className={ styles.heroContainer }>
        <div className={ styles.nameAndCategory }>
          <h1
            data-testid="recipe-title"
          >
            { drinks.strDrink }
          </h1>

          <p
            data-testid="recipe-category"
          >
            { drinks.strCategory }
        &nbsp; - &nbsp;
            { drinks.strAlcoholic }
          </p>
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
            drinks={ drinks }
            favorite={ favorite }
            setFavorite={ setFavorite }
            id={ id }
          />

          <p>{copied ? 'Link copiado!' : null}</p>
        </div>
      </section>

      <h1>Instructions</h1>
      <p
        data-testid="instructions"
        className={ styles.instruction }
      >
        { drinks.strInstructions }
      </p>
      <h1>Ingredients</h1>
      {ingredients.map((item, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ item }
          className={ styles.ingredients }
        >
          {item}
          &nbsp; - &nbsp;
          { measures[index] }
        </p>
      ))}
      <h1>Recommendations</h1>
      <div
        className={ styles.carousel }
      >
        {foodRecomendation && foodRecomendation.map((item, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            className={ styles.carouselItemDiv }
          >
            <Link to={ `/comidas/${item.idMeal}` }>
              <img
                src={ item.strMealThumb }
                alt="recipe"
                className={ styles.carouselImg }
              />
              <p>{ item.strCategory }</p>
              <h5
                data-testid={ `${index}-recomendation-title` }
              >
                { item.strMeal }
              </h5>
            </Link>
          </div>
        ))}
      </div>
      {!isDone && (
        <nav>
          <Link
            to={ `/bebidas/${id}/in-progress` }
          >
            <button
              data-testid="start-recipe-btn"
              type="button"
              className={ styles.buttonBeggin }
            >
              {inProgress ? 'Continue Recipe' : 'Start Recipe' }
            </button>
          </Link>
        </nav>
      )}
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
    </main>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkDetails;
