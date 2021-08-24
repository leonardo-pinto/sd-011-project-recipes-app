import PropTypes from 'prop-types';
import React from 'react';
import whiteHeart from '../images/whiteHeartIcon.svg';
import greenHeart from '../images/greenHeart.svg';
import styles from './FavoriteButtonDrinks.module.css';

function FavoriteButtonDrinks({ drinks, favorite, setFavorite, id }) {
  const [heart, setHeart] = React.useState(whiteHeart);

  const favoriteBttnHandle = () => {
    setFavorite(!favorite);

    const favoriteObj = {
      id,
      type: 'bebida',
      area: drinks.strArea ? drinks.strArea : '',
      category: drinks.strCategory,
      alcoholicOrNot: drinks.strAlcoholic,
      name: drinks.strDrink,
      image: drinks.strDrinkThumb,
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

FavoriteButtonDrinks.propTypes = {
  favorite: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  drinks: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  setFavorite: PropTypes.func.isRequired,
};

export default FavoriteButtonDrinks;
