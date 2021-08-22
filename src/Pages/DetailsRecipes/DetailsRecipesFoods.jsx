import React, { useEffect, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MainContext from '../../Context/MainContext';
import IngredientsFoods from '../../Components/IngredientsFoods';
import { getDrinksInitial } from '../../Services/ApiDrink';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './scroll.css';
import ItemsFoodDetails from '../../Components/ItemsFoodDetails';
import '../../css/DetailsRecipesFoods.css';

function DetailsRecipesFoods({ match: { params: { id } } }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { idFoodsAPI, setIdFoodsAPI,
    newDataDrinks, setNewDataDrinks, setStartButton,
    count } = useContext(MainContext);

  async function fetchDrinksInitial() {
    const drinksInitialAPI = await getDrinksInitial();
    setNewDataDrinks(drinksInitialAPI.drinks);
  }

  useEffect(() => {
    fetchDrinksInitial();
  }, []);
  console.log(newDataDrinks);

  useEffect(() => {
    const getAPIById = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setIdFoodsAPI(meals[0]);
    };
    getAPIById();
  }, [id, setIdFoodsAPI]);

  // ! Limita a quantidade de recomendação

  const isFavoriteInLocal = () => {
    const infoInLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(infoInLocal.some((item) => item.id === id));
  };

  useEffect(() => {
    isFavoriteInLocal();
  }, []);

  useEffect(() => {
    const handleFavorite = () => {
      const infoItem = [{
        id: idFoodsAPI.idMeal,
        type: 'comida',
        area: idFoodsAPI.strArea,
        category: idFoodsAPI.strCategory,
        alcoholicOrNot: '',
        name: idFoodsAPI.strMeal,
        image: idFoodsAPI.strMealThumb,
      }];
      const infoInLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (isFavorite) {
        if (infoInLocal) {
          const SomaDEArraysComOStorage = infoItem.concat(infoInLocal);
          const verify = JSON.stringify(SomaDEArraysComOStorage);
          return (idFoodsAPI
            && localStorage.setItem('favoriteRecipes', verify));
        }
        const verify = JSON.stringify(infoItem);
        return (idFoodsAPI
          && localStorage.setItem('favoriteRecipes', verify));
      }
      if (infoInLocal) {
        const newFavoriteRecipes = infoInLocal
          .filter((item) => item.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      }
    };
    handleFavorite();
  }, [isFavorite]);

  const handleColoredHeart = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="details-recipes-foods">
      <Link to="/comidas">
        <Button
          variant="light"
        >
          Back
        </Button>
      </Link>
      <br />
      <br />
      <ItemsFoodDetails />
      <Button
        type="button"
        variant="light"
        onClick={ () => handleColoredHeart() }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          data-testid="favorite-btn"
          alt="favorite icon"
        />
      </Button>
      <Button
        variant="light"
        type="button"
        // data-testid="favorite-btn"
        onClick={ () => handleColoredHeart() }
      >
        Favorite
      </Button>
      <br />
      <br />
      <IngredientsFoods />
      <p data-testid="instructions">
        {idFoodsAPI.strInstructions}
      </p>
      {/* //!===========================Implementar=============================== */}
      {/* <ul className="scrollmenu">
        { newDataDrinks.map((drink, index) => index < magicNumber && (
          <li
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <p
              data-testid={ `${index}-recomendation-title` }
              key={ index }
            >
              { drink.strDrink }
              { console.log(drink.strDrink) }
            </p>
          </li>
        )) }
      </ul> */}
      {/* //!=======================Recomendation Cards============================ */}
      <NavLink to={ `/comidas/${id}/in-progress` }>
        <Button
          type="button"
          variant="light"
          data-testid="start-recipe-btn"
          className="fixed-btn"
          onClick={ () => setStartButton(true) }
          hidden={ count }
        >
          Recipe Start!
        </Button>
      </NavLink>
    </div>
  );
}

export default DetailsRecipesFoods;

DetailsRecipesFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
