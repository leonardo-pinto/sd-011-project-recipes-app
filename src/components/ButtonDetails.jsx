import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import AppContext from '../context/AppContext';
import '../styles/details.css';
// import doneRecipes from '../helper/localSotrageHelper';

export default function ButtonDetails({ foodOrDrink, id }) {
  const { idDetails } = useContext(AppContext);
  const [button, setbutton] = useState(false);
  const details = idDetails[0];
  const now = new Date();
  const day = String(now.getDay()).padStart(2, '0'); // corrigir
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const fullDate = `${day}/${month}/${year}`;

  // const tags = details.strTags && details.strTags.split(',');

  const doneRecipes = {
    id: foodOrDrink === 'Comidas' ? details.idMeal : details.idDrink,
    type: foodOrDrink === 'Comidas' ? 'comida' : 'bebida',
    area: details.strArea || '',
    category: details.strCategory || '',
    alcoholicOrNot: details.strAlcoholic || '',
    name: foodOrDrink === 'Comidas' ? details.strMeal : details.strDrink,
    image: foodOrDrink === 'Comidas' ? details.strMealThumb : details.strDrinkThumb,
    doneDate: fullDate,
    tags: details.strTags ? details.strTags.split(',') || '' : '',
  };

  const local = localStorage.getItem('doneRecipes');
  const getLocal = JSON.parse(local);
  const hasId = local && Object.keys(getLocal)
    .map((el) => getLocal[el].id).some((x) => x === id);
  console.log(hasId);

  function handleClick() {
    setbutton(!button);
    if (!local) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipes]));
    } else if (!hasId) {
      localStorage.setItem('doneRecipes', JSON.stringify([...getLocal, doneRecipes]));
    }
  }

  return (
    <div>
      <Link
        to={
          foodOrDrink === 'Comidas'
            ? `/comidas/${id}/in-progress`
            : `/bebidas/${id}/in-progress`
        }
      >
        <Button
          type="button"
          variant="success"
          data-testid="start-recipe-btn"
          className="fixed-bottom"
          onClick={ handleClick }
        >
          {button ? 'Iniciar Receita' : 'Continuar Receita'}
        </Button>
      </Link>
    </div>

  );
}

ButtonDetails.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
