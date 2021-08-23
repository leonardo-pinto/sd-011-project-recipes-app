import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { InProgressContext } from '../../context/RecipeInProgress';

export default function ButtonFinish(props) {
  const { recipe } = props;
  const { enableFinishBtn } = useContext(InProgressContext);
  const history = useHistory();

  const getDate = () => {
    const date = new Date();
    return (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
  };

  const handleClick = () => {
    const {
      idMeal,
      strMeal,
      strTags,
      strArea,
      idDrink,
      strCategory,
      strAlcoholic,
      strDrinkThumb,
      strDrink,
      strMealThumb,
    } = recipe;

    let newRecipeDone;
    if (idDrink) {
      newRecipeDone = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        image: strDrinkThumb,
        doneDate: getDate(),
        name: strDrink,
        tags: [],
      };
    } else {
      newRecipeDone = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        image: strMealThumb,
        doneDate: getDate(),
        name: strMeal,
        tags: strTags ? strTags.split(',') : [],
      };
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const itemToSave = doneRecipes
      ? [...doneRecipes, newRecipeDone]
      : [newRecipeDone];

    localStorage.setItem('doneRecipes', JSON.stringify(itemToSave));
    return history.push('/receitas-feitas');
  };

  return (
    <Button
      style={ { width: '100%', backgroundColor: '#4B2C0D' } }
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ !enableFinishBtn }
      onClick={ handleClick }
    >
      Finalizar Receita
    </Button>
  );
}

ButtonFinish.propTypes = {
  idMeal: PropTypes.string,
  strMeal: PropTypes.string,
  strTags: PropTypes.array,
  strArea: PropTypes.string,
  idDrink: PropTypes.string,
  strCategory: PropTypes.string,
  strAlcoholic: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strDrink: PropTypes.string,
  strMealThumb: PropTypes.string,
}.isRequired;
