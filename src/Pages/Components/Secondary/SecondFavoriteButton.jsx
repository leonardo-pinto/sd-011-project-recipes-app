import React, { useEffect, useState } from 'react';
import { verifyFavoritesDrink,
  verifyFavoritesFood } from '../../../Helpers/VerifyFavorites';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';

function SecondFavoriteButton({ itemId, type, currentItem, setUpdate, update }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function verifyIfIsFavorite() {
    const currentFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    setIsFavorite(currentFavoriteRecipes.some((any) => any.id === itemId));
  }

  useEffect(() => {
    const currentFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!currentFavoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    verifyIfIsFavorite();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  function toggleFavorite() {
    setUpdate(!update);
    const currentFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'bebida') {
      verifyFavoritesDrink(currentItem, itemId, currentFavoriteRecipes);
    }
    if (type === 'comida') {
      verifyFavoritesFood(currentItem, itemId, currentFavoriteRecipes);
    }
    verifyIfIsFavorite();
  }

  return (
    <button type="button" onClick={ () => toggleFavorite() }>
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Botão de receita favorita"
      />
    </button>
  );
}

export default SecondFavoriteButton;
