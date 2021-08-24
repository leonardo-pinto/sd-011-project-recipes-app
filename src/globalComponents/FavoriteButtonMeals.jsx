import PropTypes from 'prop-types';
import React from 'react';
import whiteHeart from '../images/whiteHeartIcon.svg';
import greenHeart from '../images/greenHeart.svg';
import styles from './FavoriteButtonMeals.module.css';

function FavoriteButton({ meals, favorite, setFavorite, id }) {
  const [heart, setHeart] = React.useState(whiteHeart);

  const favoriteBttnHandle = () => {
    setFavorite(!favorite);

    const favoriteObj = {
      id,
      type: 'comida',
      area: meals.strArea ? meals.strArea : '',
      category: meals.strCategory,
      alcoholicOrNot: '',
      name: meals.strMeal,
      image: meals.strMealThumb,
    };
    const prevStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favorite && prevStorage === null) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([favoriteObj]));
    } else if (!favorite && prevStorage !== null) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...prevStorage, favoriteObj]));
    } else if (favorite && prevStorage !== null) {
      const newStorage = prevStorage.filter((storage) => storage.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
  };
  return (
    <button
      type="button"
      onClick={ () => {
        favoriteBttnHandle();
        if (heart === whiteHeart) {
          setHeart(greenHeart);
        } else {
          setHeart(whiteHeart);
        }
      } }
    >
      <img
        src={ !favorite ? whiteHeart : greenHeart }
        alt="share"
        data-testid="favorite-btn"
        className={ heart === whiteHeart ? null
          : `${styles.greenHeart} ${styles.animeHeart}` }
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  favorite: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  meals: PropTypes.shape({
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  setFavorite: PropTypes.func.isRequired,
};

export default FavoriteButton;
