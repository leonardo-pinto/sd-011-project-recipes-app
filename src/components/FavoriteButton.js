import PropTypes from 'prop-types';
import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ onClick, testFavorite, favorited }) {
  return (
    <button
      type="button"
      className='btn btn-default'
      src={ favorited ? blackHeartIcon : whiteHeartIcon }
      onClick={ onClick }
      data-testid={ testFavorite }
    >
      <img src={ favorited ? blackHeartIcon : whiteHeartIcon } alt="heart" />
    </button>
  );
}

FavoriteButton.propTypes = {
  favorited: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  testFavorite: PropTypes.string.isRequired,
};

export default FavoriteButton;
