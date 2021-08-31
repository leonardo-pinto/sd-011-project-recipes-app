import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ButtonToProgress(props) {
  const { mealDetail, drinkDetail } = props;
  const [type, setType] = useState('comidas');
  // if (drinkDetail) setType('bebidas');

  const [toRedirect, setToRedirect] = useState(false);
  const [progress, setProgress] = useState(false);
  const [start, setStart] = useState(false);
  const path = window.location.pathname.split('/')[2];
  const inProgress = localStorage.getItem('inProgressRecipes');
  const doneRecipes = localStorage.getItem('doneRecipes');

  const styleBtn = {
    position: 'fixed',
    bottom: 0,
    height: '60px',
    background: '#f76c05',
    zIndex: '1',
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  };

  useEffect(() => {
    if (inProgress === null) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    if (inProgress.includes(path)) {
      setProgress(true);
    }

    if (doneRecipes === null) {
      return localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (doneRecipes.includes(path)) {
      // console.log(doneRecipes.includes(path), doneRecipes);
      setStart(true);
    }
  }, [path, doneRecipes, inProgress]);

  const handleClick = () => {
    if (window.location.pathname.split('/')[1] === 'bebidas') {
      setType('bebidas');
    }
    return setToRedirect(true);
  };

  const startButton = () => {
    const btn = (
      <div>
        <Button
          className="btn btn-primary"
          style={ styleBtn }
          data-testid="start-recipe-btn"
          type="button"
          onClick={ handleClick }
        >
          { progress ? 'Continuar Receita' : 'Iniciar Receita' }
        </Button>
        {
          toRedirect
            && <Redirect
              to={ `/${type}/${window.location.pathname.split('/')[2]}/in-progress` }
              state={ mealDetail || drinkDetail }
            />
        }
      </div>
    );
    return btn;
  };

  return !start && startButton();
}

ButtonToProgress.propTypes = {
  mealDetail: PropTypes.shape({
    idMeal: PropTypes.string,
  }),
  drinkDetail: PropTypes.shape({
    idDrink: PropTypes.string,
  }),
}.isRequired;

export default ButtonToProgress;
