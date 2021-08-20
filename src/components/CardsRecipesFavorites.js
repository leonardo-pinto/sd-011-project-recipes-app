import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import ButtonShare from './ButtonShare';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardsRecipesFavorites(props) {
  const { index, recipe, handleDisfavor } = props;
  const { id, name, image } = recipe;
  const history = useHistory();

  // const card = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'space-around',
  //   padding: '2px',
  //   border: '1px solid #e6e6e6',
  //   margin: '20px auto',
  //   float: 'none',
  //   marginBottom: '10px',
  //   width: '304px',
  //   boxShadow: '0 0 5px',
  // };

  const cardTitle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
  };

  const onClickTitleOrImage = () => (
    recipe.type === 'comida' ? history.push(`/comidas/${id}`)
      : history.push(`/bebidas/${id}`));

  const href = window.location.origin;
  const path = (
    recipe.type === 'comida' ? `${href}/comidas/${id}` : `${href}/bebidas/${id}`);

  const lastDiv = () => (
    <div style={ { display: 'flex' } }>
      <button
        type="button"
        onClick={ () => handleDisfavor(id) }
        style={ { background: 'none', opacity: 'none', border: 'none' } }
      >
        <img
          src={ blackHeartIcon }
          alt="ícone de desfavoritar"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
      <ButtonShare
        path={ path }
        testid={ `${index}-horizontal-share-btn` }
      />
    </div>
  );

  return (
    <div className="card-favor-and-done">
      <Card.Img
        variant="top"
        data-testid={ `${index}-horizontal-image` }
        src={ image }
        alt={ name }
        role="button"
        tabIndex="-1"
        onClick={ onClickTitleOrImage }
        onKeyPress={ onClickTitleOrImage }
      />
      <Card.Body>
        <Card.Text
          data-testid={ `${index}-horizontal-top-text` }
          onClick={ onClickTitleOrImage }
          onKeyPress={ onClickTitleOrImage }
        >
          { recipe.type === 'bebida'
            ? `${recipe.alcoholicOrNot}` : `${recipe.area} - ${recipe.category}`}
        </Card.Text>
        <div style={ cardTitle }>
          <Card.Title
            style={ { fontWeight: 'bold', margin: '10px' } }
            data-testid={ `${index}-horizontal-name` }
            role="button"
            tabIndex="0"
            onClick={ onClickTitleOrImage }
            onKeyPress={ onClickTitleOrImage }
          >
            { name }
          </Card.Title>
          { lastDiv() }
        </div>
      </Card.Body>
    </div>
  );
}

CardsRecipesFavorites.propTypes = {
  index: PropTypes.number,
}.isRequired;

export default CardsRecipesFavorites;
