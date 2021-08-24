import React from 'react';
import { Button } from 'react-bootstrap';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteButtons(callBack, isFavorite) {
  return (
    <div>
      <Button
        variant="light"
        type="button"
        onClick={ () => callBack() }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
          data-testid="favorite-btn"
        />
      </Button>
      <Button
        variant="light"
        type="button"
        onClick={ () => callBack() }
      >
        Favorite
      </Button>
    </div>
  );
}
