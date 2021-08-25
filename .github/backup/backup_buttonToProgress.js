import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function ButtonToProgress({ data }) {
  const [toRedirect, setToRedirect] = useState(false);
  const [progress, setProgress] = useState(false);
  const [start, setStart] = useState(false);
  const [type, setType] = useState('comidas');
  const path = window.location.pathname.split('/')[2];
  const inProgress = localStorage.getItem('inProgressRecipes');
  const doneRecipes = localStorage.getItem('doneRecipes');

  useEffect(() => {
    if (inProgress === null) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    // Object.keys(inProgress.cocktails).find((e) => (e === path))
    // Object.keys(inProgress.meals).find((e) => (e === path))
    if (inProgress.includes(path)) {
      setProgress(true);
    }
    // if () {
    //   setProgress(true);
    // }

    if (doneRecipes === null) {
      return localStorage.setItem('doneRecipes', JSON.stringify([{}]));
    }
    // doneRecipes.find((e) => (e.id === parseInt(path, 10)))
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
        <button
          style={ { position: 'fixed', bottom: 0 } }
          data-testid="start-recipe-btn"
          type="button"
          onClick={ handleClick }
        >
          { progress ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>
        {
          toRedirect
            && <Redirect
              to={ `/${type}/${window.location.pathname.split('/')[2]}/in-progress` }
              data={ data }
            />
        }
      </div>
    );
    return btn; 
    };
    
    return !start && startButton();
  };

ButtonToProgress.propTypes = {
  data: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default ButtonToProgress;
