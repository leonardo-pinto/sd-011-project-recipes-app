import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Figure } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { getDrinkByID } from '../Services/ApiDrink';
import getDate from '../Services/getDate';
import MainContext from '../Context/MainContext';
import { copyLink } from '../Services/ApiFood';
import FavoriteButtons from '../Components/FavoriteButtons';
import '../css/DrinkProgress.css';

function DrinkProgress(props) {
  const [drinkById, setDrinkById] = useState([]);
  const [drinkIngredient, setDrinkIngredient] = useState([]);
  const [button, setButton] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState({});
  const { match } = props;
  const { id } = match.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const { idDrinksAPI, setIdDrinksAPI, show, setShow } = useContext(MainContext);

  async function fetchDrinkByID() {
    const drinkByIdAPI = await getDrinkByID(id);
    setDrinkById(drinkByIdAPI.drinks);
  }

  // console.log(drinkById);

  useEffect(() => {
    const getAPIById = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setIdDrinksAPI(drinks[0]);
    };
    getAPIById();
  }, [id, setIdDrinksAPI]);

  const isFavoriteInLocal = () => {
    const infoInLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(infoInLocal.some((item) => item.id === id));
  };

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
  }, [idDrinksAPI, isFavorite]);

  const handleColoredHeart = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    drinkById.forEach((ingredient) => {
      const data = [];
      const number = 15;
      Object.entries(ingredient).filter((item) => {
        for (let index = 0; index <= number; index += 1) {
          if (item.includes(`strIngredient${index}`) && item[1]) {
            data.push(Object.values(item).splice(1, 1));
          }
        }
        return data;
      });
      console.log(data);
      setDrinkIngredient(data);
    });
  }, [drinkById]);

  function ingredientsChecked() {
    let sum = 0;
    const checkeds = document.getElementsByTagName('input');
    for (let index = 0; index < checkeds.length; index += 1) {
      if (checkeds[index].checked) {
        sum += 1;
        // console.log(sum);
        if (sum === checkeds.length) {
          setButton(true);
        } else setButton(false);
      }
    }
    return button;
  }

  function handleCLick() {
    const now = getDate();
    setDrinkById(drinkById[0].doneDate = now);
    const doneRecipes = drinkById.map((drink) => ({
      id: drink.idDrink,
      type: 'bebida',
      area: drink.strArea,
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      doneDate: now,
      tags: [drink.strTags],
    }));
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }

  const getStorage = (storageItem) => JSON
    .parse(localStorage.getItem(storageItem));

  const setStorage = (storageItem, value) => localStorage
    .setItem(storageItem, JSON.stringify(value));

  useEffect(() => {
    fetchDrinkByID();
    isFavoriteInLocal();
    const recipesInProgress = getStorage('inProgressRecipes') || {};
    setInProgressRecipe(recipesInProgress);
  }, []);

  const addIngredientStorage = (value, storageIngredient) => {
    const realoadItem = {
      ...storageIngredient,
      [id]: [
        ...(storageIngredient[id] || []),
        value,
      ].sort(),
    };

    setStorage('inProgressRecipes', realoadItem);
    setInProgressRecipe(realoadItem);
  };

  const removeingredientStorage = (value, storageItem) => {
    const realoadItem = {
      ...storageItem,
      [id]: storageItem[id].filter((item) => item !== value),
    };
    if (realoadItem[id].length === 0) delete realoadItem[id];
    setStorage('inProgressRecipes', realoadItem);
    setInProgressRecipe(realoadItem);
  };

  const ingredientsDone = (target, index) => {
    const recipesInProgress = getStorage('inProgressRecipes') || {};
    if (target.checked) addIngredientStorage(index, recipesInProgress);
    else removeingredientStorage(index, recipesInProgress);
  };

  return (
    <div className="drink-progress-page">
      <Link to="/bebidas">
        <Button
          variant="light"
          type="button"
        >
          Back
        </Button>
      </Link>
      <br />
      <br />
      { drinkById.map((item, index) => (
        <div key={ index }>
          <Figure>
            <Figure.Image
              width={ 288 }
              height={ 280 }
              alt={ `Drink ${item.strDrink}` }
              src={ item.strDrinkThumb }
            />
            <Figure.Caption>
              <h2 data-testid="recipe-title">
                { item.strDrink }
              </h2>
              <h3 data-testid="recipe-category">
                { item.strCategory }
              </h3>
            </Figure.Caption>
          </Figure>
          <Card style={ { width: '18rem' } }>
            <Card.Body>
              <Card.Title>
                { item.strMeal }
              </Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
              >
                Ingredients and Instructions
              </Card.Subtitle>
              <Card.Text>
                <ul>
                  {
                    drinkIngredient.map((ingredient, i) => (
                      <li
                        data-testid={ `${i}-ingredient-step` }
                        key={ i }
                      >
                        <label
                          htmlFor={ i }
                        >
                          <input
                            name={ Object.values(ingredient) }
                            id={ i }
                            type="checkbox"
                            checked={ inProgressRecipe[id]
                        && inProgressRecipe[id].includes(i + 1) }
                            onChange={ ({ target }) => ingredientsDone(target, i + 1) }
                            onClick={ () => ingredientsChecked() }
                          />
                          { Object.values(ingredient) }
                        </label>
                      </li>
                    ))
                  }
                </ul>
                <p data-testid="instructions">
                  { item.strInstructions }
                </p>
              </Card.Text>
            </Card.Body>
            <div className="buttons-card-drink">
              { FavoriteButtons(handleColoredHeart, isFavorite) }
              <Button
                variant="light"
                type="button"
                data-testid="share-btn"
                onClick={ () => copyLink(copy, setShow, 'bebidas', id) }
              >
                Share
              </Button>
            </div>
            <p>{ show && 'Copy link!'}</p>
          </Card>
        </div>
      )) }
      <div className="buttons-progress-drink">
        <br />
        <Link to="/receitas-feitas">
          <Button
            type="button"
            variant="light"
            data-testid="finish-recipe-btn"
            disabled={ !button }
            onClick={ () => handleCLick() }
          >
            Finish
          </Button>
        </Link>
      </div>
    </div>
  );
}

DrinkProgress.propTypes = {
  match: PropTypes.object,
  params: PropTypes.shape({
    id: PropTypes.number,
  }),
}.isRequired;

export default DrinkProgress;
