import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { verifyFavoritesDrink, verifyFavoritesFood } from '../../Helpers/VerifyFavorites';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function FavoriteButton({ currentItem, typeOf }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  function verifyIfIsFavorite() {
    const currentFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    setIsFavorite(currentFavoriteRecipes.some((any) => any.id === id));
  }

  useEffect(() => {
    const currentFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!currentFavoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    verifyIfIsFavorite();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleFavorite() {
    const currentFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (typeOf === 'Drink') {
      verifyFavoritesDrink(currentItem, id, currentFavoriteRecipes);
    }
    if (typeOf === 'Meal') {
      verifyFavoritesFood(currentItem, id, currentFavoriteRecipes);
    }
    verifyIfIsFavorite();
  }

  return (
    <button style={{border: 'none', backgroundColor: '#F8D4E4'}} type="button" onClick={ () => toggleFavorite() }>
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Botão de receita favorita"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  currentItem: PropTypes.objectOf(PropTypes.object).isRequired,
  typeOf: PropTypes.string.isRequired,
};
