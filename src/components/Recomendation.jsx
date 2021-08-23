import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import Carousel from 'react-bootstrap/Carousel'; https://react-bootstrap.github.io/components/carousel/#carousel-item-props
import '../styles/carousel.css';
import '../styles/details.css';
import recomendationIcon from '../images/Vectorrecomendation.svg';
import {Spinner} from 'reactstrap';
import '../styles/loading.css';

export default function Recomendation({ foodOrDrink }) {
  const [recomendation, setRecomendation] = useState([]);

  async function fetchRecomendedItem() {
    let endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (foodOrDrink === 'Bebidas') {
      endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }
    const request = await fetch(endPoint);
    const response = await request.json();
    const data = foodOrDrink === 'Bebidas' ? response.meals : response.drinks;
    setRecomendation(data);
  }

  useEffect(() => {
    fetchRecomendedItem();
  }, []);

  const maxLength = 6;

  function renderRecomendations(item, index) {
    return (
      <div
        key={ index }
        data-testid={ `${index}-recomendation-card` }
        className="recomendationItem"
      >
        <img
          data-testid="recomendation-photo"
          src={ foodOrDrink === 'Bebidas' ? item.strMealThumb : item.strDrinkThumb }
          alt="image_of_recipe"
          className="recomendationImg"
        />

        <p data-testid={ `${index}-recomendation-title` }>
          { foodOrDrink === 'Bebidas' ? item.strMeal : item.strDrink }
        </p>
      </div>
    );
  }

  return (
    <div className="recomendations">
      {recomendation.length === 0 ? <div className="loading"> <Spinner animation="border" variant="primary" className="spinner"/></div> : (
        <div>
          <div>
            <img src={ recomendationIcon } alt="icon" className="icon" />
            <span>Recomendations</span>
          </div>
          <section className="containerRecomendation">
            {recomendation.filter((_, index) => index < maxLength)
              .map(renderRecomendations)}
          </section>
        </div>)}
    </div>
  );
}

Recomendation.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};
