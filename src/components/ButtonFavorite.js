import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ButtonFavorite({ objData }) {
  const [black, setBlack] = useState(false);
  const path = window.location.pathname.split('/')[2];

  useEffect(() => {
    const acumulate = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (acumulate === null) {
      return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    acumulate.forEach((e) => (e.id === path) && setBlack(true));
  }, [path]);

  const handleClickToBlack = () => {
    const magicN = -1;
    const objToStorage = {
      id: objData.idMeal ? objData.idMeal : objData.idDrink,
      type: (`${window.location.pathname.split('/')[1]}`).slice(0, magicN),
      area: objData.strArea ? objData.strArea : '',
      category: objData.strCategory ? objData.strCategory : '',
      alcoholicOrNot: objData.strAlcoholic ? objData.strAlcoholic : '',
      name: objData.strMeal ? objData.strMeal : objData.strDrink,
      image: objData
        .strMealThumb ? objData.strMealThumb : objData.strDrinkThumb,
    };

    const acumulate = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const update = JSON.stringify([...acumulate, objToStorage]);
    localStorage.setItem('favoriteRecipes', update);
    return setBlack(true);
  };

  const handleClickToWhite = () => {
    const acumulate = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // console.log('fora', acumulate);
    const update = acumulate
      .filter((e) => (e.id !== window.location.pathname.split('/')[2]));
    // console.log('update', update);
    localStorage.setItem('favoriteRecipes', JSON.stringify(update));
    return setBlack(false);
  };

  const whiteHeart = () => {
    const ret = (
      <button
        type="button"
        style={ { background: 'none', opacity: 'none', border: 'none' } }
        onClick={ () => handleClickToBlack() }
      >
        <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="not-favorite btn" />
      </button>
    );
    return ret;
  };

  const blackHeart = () => {
    const ret = (
      <button
        style={ { background: 'none', opacity: 'none', border: 'none' } }
        type="button"
        onClick={ () => handleClickToWhite() }
      >
        <img data-testid="favorite-btn" src={ blackHeartIcon } alt="favorite btn" />
      </button>
    );
    return ret;
  };

  return (
    <>
      { black && blackHeart() }
      { !black && whiteHeart() }
    </>
  );
}

ButtonFavorite.propTypes = {
  objData: PropTypes.shape(
    PropTypes.string,
    PropTypes.object,
  ).isRequired,
};

export default ButtonFavorite;
