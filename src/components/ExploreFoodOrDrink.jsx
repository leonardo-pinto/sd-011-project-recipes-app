import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import '../styles/exploreFoodOrDrink.css';
import carrot from '../images/Vectorcarrot.svg';
import surprise from '../images/Vectorsurprise.svg';
import world from '../images/Vectorworld.svg';
import {Spinner} from 'reactstrap';
import '../styles/loading.css';

function ExploreFoodOrDrink({ foodOrDrink }) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function randomFetch() {
    setLoading(true);
    let endPoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
    if (foodOrDrink === 'Bebidas') {
      endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    }
    const request = await fetch(endPoint);
    const response = await request.json();
    const data = foodOrDrink === 'Comidas' ? response.meals : response.drinks;
    if (foodOrDrink === 'Comidas') {
      history.push(`/comidas/${data[0].idMeal}`);
      return;
    }
    history.push(`/bebidas/${data[0].idDrink}`);
  }

  return (
    <div className="exploreFoodOrDrink">
      {loading ? <div className="loading"> <Spinner animation="border" variant="primary" className="spinner"/></div> : (
        <div className="exploreBttn">
          <Link
            to={ foodOrDrink === 'Comidas' ? '/explorar/comidas/ingredientes'
              : '/explorar/bebidas/ingredientes' }
          >
            <div>
              <img src={ carrot } alt="icon" />
              <button type="button" data-testid="explore-by-ingredient">
                Por Ingredientes
              </button>
            </div>
          </Link>
          {foodOrDrink === 'Comidas' && (
            <Link to="/explorar/comidas/area">
              <div>
                <img src={ world } alt="icon" />
                <button
                  type="button"
                  data-testid="explore-by-area"
                >
                  Por Local de Origem
                </button>
              </div>
            </Link>
          )}
          <div>
            <img src={ surprise } alt="icon" />
            <button
              type="button"
              data-testid="explore-surprise"
              onClick={ randomFetch }
            >
              Me Surpreenda!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreFoodOrDrink;

ExploreFoodOrDrink.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};
