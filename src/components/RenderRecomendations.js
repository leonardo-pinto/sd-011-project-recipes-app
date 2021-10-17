import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function RenderRecomendations({ typeReco }) {
  const [recipeType, setRecipeType] = useState({
    type: '',
    name: '',
    image: '',
  });
  const { drinks, foods } = useSelector((state) => state.fetchReceitas);

  useEffect(() => {
    if (typeReco === 'comidas') {
      setRecipeType({
        recipes: foods.meals,
        type: 'meals',
        id: 'idMeal',
        name: 'strMeal',
        image: 'strMealThumb',
      });
    } else {
      setRecipeType({
        recipes: drinks.drinks,
        type: 'drinks',
        id: 'idDrink',
        name: 'strDrink',
        image: 'strDrinkThumb',
      });
    }
  }, [drinks.drinks, foods.meals]);

  const { recipes, type, name, image, id } = recipeType;
  const limitRecipes = 6;

  if (recipes === undefined) return <p>Loading</p>;

  return (
    <section className="images">
      <Carousel responsive={ responsive }>
        {(type !== '' && recipes !== null)
          && recipes.slice(0, limitRecipes).map((recipe, index) => (
            <Link to={ `/${typeReco}/${recipe[id]}` } key={ index }>
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ index }
              >
                <p data-testid={ `${index}-recomendation-title` }>{recipe[name]}</p>
                <img
                  className="imageCard"
                  data-testid={ `${index}-card-img` }
                  src={ recipe[image] }
                  alt={ name }
                  width="150px"
                />
              </div>
            </Link>
          ))}
      </Carousel>

    </section>
  );
}

export default RenderRecomendations;

RenderRecomendations.propTypes = {
  typeReco: PropTypes.string.isRequired,
};
