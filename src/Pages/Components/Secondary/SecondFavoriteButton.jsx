import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { verifyFavoritesDrink,
  verifyFavoritesFood } from '../../../Helpers/VerifyFavorites';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';

function SecondFavoriteButton({ itemId, type, currentItem, setUpdate, update, testId }) {
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
    <button style={{border: 'none', backgroundColor: 'none'}} type="button" onClick={ () => toggleFavorite() }>
      <img
        data-testid={ testId }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Botão de receita favorita"
      />
    </button>
  );
}

export default SecondFavoriteButton;

SecondFavoriteButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  setUpdate: PropTypes.func.isRequired,
  update: PropTypes.bool.isRequired,
  currentItem: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};
