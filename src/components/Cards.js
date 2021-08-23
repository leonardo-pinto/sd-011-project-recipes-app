import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default function Cards(props) {
  const [source, setSource] = useState();
  const [recipeName, setRecipeName] = useState();
  const { recipe, index, type } = props;
  const history = useHistory();

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
      style={ { margin: '20px auto', width: '340px', boxShadow: '0 0 5px' } }
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`/${tipo}/${recipe[shortName]}`) }
    >
      <Card.Img
        variant="top"
        style={ { clipPath: 'inset(30px 0 30px 0)' } }
        src={ source }
        alt={ recipeName }
        data-testid={ `${index}-card-img` }
        objectFit="cover"
      />
      <Card.Body
        style={ { textAlign: 'center', fontSize: '20px', fontWeight: 'bold' } }
        data-testid={ `${index}-card-name` }
      >
        { recipeName }
      </Card.Body>
    </Card>
  );
}

Cards.propTypes = {
  key: PropTypes.string,
  recipe: PropTypes.string,
}.isRequired;
