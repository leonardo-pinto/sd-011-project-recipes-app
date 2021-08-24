import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import '../../App.css';
import styles from './FoodDetails.module.css';
import shareIcon from '../../images/shareIcon.svg';
import FavoriteButton from '../../globalComponents/FavoriteButtonMeals';
import Picture from '../../images/loginIMG.png';

function FoodDetails({ match }) {
  const [meals, setMeals] = useState({});
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [drinkRecomendation, setRecomendation] = useState([]);
  const { id } = match.params;

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const isDone = doneRecipes && doneRecipes.some((item) => item.id === id);

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgress = inProgressRecipes && inProgressRecipes.meals[id];

  const mN = 6;
  React.useEffect(() => {
    const fetchMeal = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setMeals(data.meals[0]));
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setRecomendation(data.drinks.filter((_, index) => index < mN)));
    };
    fetchMeal();
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favorites = favoriteRecipes && favoriteRecipes.some((item) => item.id === id);
    if (favorites) {
      setFavorite(true);
    }
  }, [id]);

  if (Object.keys(meals).length === 0) {
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
  const videoId = meals.strYoutube.split('=')[1];
  const ingredients = Object.keys(meals)
    .filter((item) => item.includes('Ingredient'))
    .filter((item) => meals[item]).map((item) => meals[item]);

  const measures = Object.keys(meals)
    .filter((item) => item.includes('Measure'))
    .filter((item) => meals[item]).map((item) => meals[item]);

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
          src={ meals.strMealThumb }
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
            { meals.strMeal }
          </h1>

          <p
            data-testid="recipe-category"
            className={ styles.category }
          >
            { meals.strCategory }
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
          <FavoriteButton
            meals={ meals }
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
        { meals.strInstructions }
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
      <h1>Video</h1>
      <iframe
        title={ meals.strMeal }
        src={ `https://www.youtube.com/embed/${videoId}` }
        data-testid="video"
        className={ styles.video }
      />
      <h1>Recommendations</h1>
      <div
        className={ styles.carousel }
      >
        {drinkRecomendation && drinkRecomendation.map((item, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            className={ styles.carouselItemDiv }
          >
            <Link to={ `/bebidas/${item.idDrink}` }>
              <img
                src={ item.strDrinkThumb }
                alt="recipe"
                className={ styles.carouselImg }
              />
              <p>{ item.strAlcoholic }</p>
              <h5
                data-testid={ `${index}-recomendation-title` }
              >
                { item.strDrink }
              </h5>
            </Link>
          </div>
        ))}
      </div>
      {!isDone && (
        <nav>
          <Link
            to={ `/comidas/${id}/in-progress` }
          >
            <button
              data-testid="start-recipe-btn"
              type="button"
              className={ styles.buttonBeggin }
            >
              {inProgress ? 'Continue recipe' : 'Start Recipe' }
            </button>
          </Link>
        </nav>
      )}
      <Link
        to="/comidas"
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

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FoodDetails;
