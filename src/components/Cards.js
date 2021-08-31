import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default function Cards(props) {
  const [source, setSource] = useState();
  const [recipeName, setRecipeName] = useState();
  const { recipe, index, type } = props;
  const history = useHistory();

  const styleCard = {
    margin: '20px auto',
    width: '340px',
    height: '240px',
    boxShadow: '0 0 5px',
  };

  const styleImg = {
    clipPath: 'inset(50px 0 50px 0)',
    position: 'relative',
    top: '-50px',
  };

  const styleText = {
    textShadow: '0px 0px 20px white',
    color: '#590202',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    position: 'relative',
    top: '-200px',
  };

  const boxStyle = {
    background: 'white',
    opacity: '70%',
    clipPath: 'polygon(5% 0, 100% 0%, 95% 100%, 0 100%)',
    border: '1px solid black',
  };

  let tipo = 'comidas';
  let shortName = 'idMeal';
  if (type === 'thecocktaildb') {
    tipo = 'bebidas';
    shortName = 'idDrink';
  }

  useEffect(() => {
    if (type === 'themealdb') {
      setRecipeName(recipe.strMeal);
      setSource(recipe.strMealThumb);
    }
    if (type === 'thecocktaildb') {
      setRecipeName(recipe.strDrink);
      setSource(recipe.strDrinkThumb);
    }
  }, [recipe, type]);

  return (
    <Card
      style={ styleCard }
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`/${tipo}/${recipe[shortName]}`) }
    >
      <Card.Img
        variant="top"
        style={ styleImg }
        src={ source }
        alt={ recipeName }
        data-testid={ `${index}-card-img` }
        objectFit="cover"
      />
      <Card.Body
        style={ styleText }
        data-testid={ `${index}-card-name` }
      >
        <div style={ boxStyle }>
          { recipeName }
        </div>
      </Card.Body>
    </Card>
  );
}

Cards.propTypes = {
  key: PropTypes.string,
  recipe: PropTypes.string,
}.isRequired;
