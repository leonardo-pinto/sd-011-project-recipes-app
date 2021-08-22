import React, { useEffect, useContext, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import MainContext from '../../Context/MainContext';
import IngredientsDrinks from '../../Components/IngredientsDrinks';
import { getFoodsInitial, copyLink } from '../../Services/ApiFood';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './scroll.css';
import '../../css/DetailsRecipesDrinks.css';

function DetailsRecipesFoods({ match: { params: { id } } }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { idDrinksAPI, setIdDrinksAPI, newDataFoods,
    show, setShow,
    setNewDataFoods, count, setStartButton } = useContext(MainContext);

  async function fetchFoodsInitial() {
    const foodsInitialAPI = await getFoodsInitial();
    setNewDataFoods(foodsInitialAPI.meals);
  }

  useEffect(() => {
    fetchFoodsInitial();
  }, []);
  console.log(newDataFoods);

  useEffect(() => {
    const getAPIById = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setIdDrinksAPI(drinks[0]);
    };
    getAPIById();
  }, [id, setIdDrinksAPI]);

  // ! =====================================================================================================================================
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
        id: idDrinksAPI.idDrink,
        type: 'bebida',
        area: '',
        category: idDrinksAPI.strCategory,
        alcoholicOrNot: idDrinksAPI.strAlcoholic,
        name: idDrinksAPI.strDrink,
        image: idDrinksAPI.strDrinkThumb,
      }];
      const infoInLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (isFavorite) {
        if (infoInLocal) {
          const SomaDEArraysComOStorage = infoItem.concat(infoInLocal);
          const verify = JSON.stringify(SomaDEArraysComOStorage);
          return (idDrinksAPI
            && localStorage.setItem('favoriteRecipes', verify));
        }
        const verify = JSON.stringify(infoItem);
        return (idDrinksAPI
          && localStorage.setItem('favoriteRecipes', verify));
      }
      if (infoInLocal) {
        const newFavoriteRecipes = infoInLocal
          .filter((item) => item.id !== idDrinksAPI.idDrink);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      }
    };
    handleFavorite();
  }, [isFavorite]);

  const handleColoredHeart = () => {
    setIsFavorite(!isFavorite);
  };

  // ? pergunta que não quer calar, como "despreencher" o coração ? ;-;

  return (
    <div className="details-recipes-drinks">
      <Link to="/bebidas">
        <Button
          variant="light"
        >
          Back
        </Button>
      </Link>
      <br />
      <br />
      <Card style={ { width: '15rem' } } className="recipe-drinks-cards">
        <Card.Img
          variant="top"
          src={ idDrinksAPI.strDrinkThumb }
          alt={ `Bebida selecionada: ${idDrinksAPI.strDrink}` }
          data-testid="recipe-photo"
        />
        <Card.Body>
          <Card.Title>{idDrinksAPI.strDrink}</Card.Title>
          <Card.Text>
            {idDrinksAPI.strAlcoholic}
            <p>
              {idDrinksAPI.strCategory}
            </p>
          </Card.Text>
          <Button
            type="button"
            variant="light"
            data-testid="share-btn"
            onClick={ () => copyLink(copy, setShow, 'bebidas', id) }
          >
            Share
          </Button>
          <p>{ show && 'Link copiado!'}</p>
          <Button
            variant="light"
            type="button"
            onClick={ () => handleColoredHeart() }
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
            onClick={ () => handleColoredHeart() }
          >
            Favorite
          </Button>
        </Card.Body>
      </Card>
      <br />
      <IngredientsDrinks />
      {/* //!===========================Implementar=============================== */}
      {/* <ul className="scrollmenu">
        { newDataFoods.map((food, i) => i < magicNumber && (
          <li
            data-testid={ `${i}-recomendation-card` }
            key={ i }
          >
            <p data-testid={ `${i}-recomendation-title` }>
              { food.strMeal }
            </p>
          </li>
        )) }
      </ul> */}
      {/* //!=======================Recomendation Cards============================ */}
      <NavLink to={ `/bebidas/${id}/in-progress` }>
        <Button
          type="button"
          variant="light"
          data-testid="start-recipe-btn"
          className="fixed-btn"
          onClick={ () => setStartButton(true) }
          hidden={ count }
        >
          Start recipe!
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
