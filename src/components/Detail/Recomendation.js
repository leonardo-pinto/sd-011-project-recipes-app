import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { apiRecomendation } from '../../service/apiDetailsId';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

function RecomendationDrink({ recomendInverse }) {
  const diapatch = useDispatch();
  const { recomendation } = useSelector(({ detailsId }) => detailsId);

  useEffect(() => {
    async function getApiRecomendation() {
      diapatch(await apiRecomendation(recomendInverse));
    }

    getApiRecomendation();
  }, [diapatch, recomendInverse]);

  function recomendationDrinks() {
    return (
      <Carousel>
        {recomendation.map(({ strDrinkThumb, strDrink }, index) => (
          <Carousel.Item>
            <div className='container rec-name'>
            <div className="row">
            <div className='col-12 offset-3'>
            <img
              className="d-block w-50 "
              data-testid={`${index}-recomendation-card`}
              src={strDrinkThumb}
              alt={strDrink}
            />
              <h2 data-testid={`${index}-recomendation-title`}>
                {strDrink}
              </h2>
            </div>
              </div>
              </div>
          </Carousel.Item>
        ))}
        </Carousel>

    );
  }

  function recomendationMeals() {
    return (
      <Carousel>
        {recomendation.map(({ strMealThumb, strMeal }, index) => (
          <Carousel.Item>
            <div className='container rec-name'>
            <div className="row">
            <div className='col-12 offset-3'>
            <img
              className="d-block w-50 "
              data-testid={`${index}-recomendation-card`}
              src={strMealThumb}
              alt={strMeal}
            />
              <h2 data-testid={`${index}-recomendation-title`}>
                {strMeal}
              </h2>
            </div>
              </div>
              </div>
          </Carousel.Item>

        ))}
        </Carousel>

    );
  }

  return (
      <>
      {recomendInverse === 'meals'
        ? recomendationDrinks()
        : recomendationMeals()}
       </>
  
  );
}

export default RecomendationDrink;

RecomendationDrink.propTypes = {
  recomendInverse: PropTypes.string.isRequired,
};
