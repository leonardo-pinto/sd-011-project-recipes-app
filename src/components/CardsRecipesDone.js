import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import ButtonShare from './ButtonShare';

export default function CardsRecipesDone(props) {
  const { index, recipe } = props;
  const { type, name, image, doneDate, category, id } = recipe;
  const { tags, alcoholicOrNot, area } = recipe;
  const history = useHistory();
  const firstTags = tags.filter((_tag, ind) => ind < 2);
  const href = window.location.origin;

  const onClickTitleOrImage = () => history.push(`/${type}s/${id}`);

  const cardTitle = {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-around',
    width: '160px',
    alignItems: 'center',
  };

  const cardTags = {
    background: '#e6e6e6',
    borderRadius: '5px',
    fontSize: '14px',
    margin: '2px',
    padding: '3px',
  };

  return (
    <div className="card-favor-and-done">
      <Card.Img
        variant="top"
        data-testid={ `${index}-horizontal-image` }
        src={ image }
        alt="Foto da receita"
        role="button"
        tabIndex="-1"
        onClick={ onClickTitleOrImage }
        onKeyPress={ onClickTitleOrImage }
      />
      <Card.Body style={ { width: '160px' } }>
        <Card.Text>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { area ? `${area} - ${category}` : alcoholicOrNot }
          </p>
          <p style={ { fontSize: '13px' } }>
            Feita em:
            { ' ' }
            <span data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</span>
          </p>
        </Card.Text>
        <div style={ cardTitle }>
          <Card.Title
            style={ { fontWeight: 'bold', margin: '10px 70px' } }
            data-testid={ `${index}-horizontal-name` }
            role="button"
            tabIndex="0"
            onClick={ onClickTitleOrImage }
            onKeyPress={ onClickTitleOrImage }
          >
            { name }
          </Card.Title>
          <ButtonShare
            testid={ `${index}-horizontal-share-btn` }
            path={ `${href}/${type}s/${id}` }
          />
        </div>
        <div style={ cardTitle }>
          { tags && firstTags.map((tag) => (
            <span
              style={ cardTags }
              className="tags"
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>
          ))}
        </div>
      </Card.Body>
    </div>
  );
}

CardsRecipesDone.propTypes = {
  key: PropTypes.number,
}.isRequired;
