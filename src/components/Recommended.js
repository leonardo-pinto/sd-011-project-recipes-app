import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import '../App.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Recommended({ value, type, min }) {
  console.log(min);
  const magicN = 6;
  const sixCards = value.map((e) => e).slice(0, magicN);
  // console.log(sixCards);
  const kind = () => {
    if (type === 'meal') {
      return (
        Object.entries(sixCards).map((e, i) => (
          <a
            style={ { backgroundColor: 'white' } }
            href={ `/bebidas/${e[1].idDrink}` }
            key={ i }
          >
            <div data-testid={ `${i}-recomendation-card` } key={ i }>
              <img
                style={ { borderRadius: '5px 5px 0 0' } }
                width="100px"
                src={ e[1].strDrinkThumb }
                alt={ `img ${e[1].strDrink}` }
              />
              <div
                className="card-recom-text"
                data-testid={ `${i}-recomendation-title` }
              >
                { e[1].strDrink }
              </div>
            </div>
          </a>
        ))
      );
    }
    return (
      Object.entries(sixCards).map((e, i) => (
        <a href={ `/comidas/${e[1].idMeal}` } key={ i }>
          <div data-testid={ `${i}-recomendation-card` } key={ i }>
            <img
              style={ { borderRadius: '5px' } }
              width="100px"
              src={ e[1].strMealThumb }
              alt={ `img ${e[1].strMeal}` }
            />
            <div
              className="card-recom-text"
              data-testid={ `${i}-recomendation-title` }
            >
              { e[1].strMeal }
            </div>
          </div>
        </a>
      ))
    );
  };

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div style={ { textAlign: '-webkit-center' } }>
      <Slider { ...settings }>
        {
          kind()
        }
      </Slider>
    </div>
  );
}

Recommended.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
};

export default Recommended;
