import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { copyLink } from '../../Services/ApiDrink';
import MainContext from '../../Context/MainContext';

export default function DrinksDone() {
  const { show, setShow } = useContext(MainContext);

  const storage = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div>
      { storage.filter((item) => item.type === 'bebida').map((recipe, index) => (
        <div key={ index }>
          <Card style={ { width: '18rem' } }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <Card.Img variant="top" src={ recipe.image } />
            </Link>
            <Card.Body>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <Card.Title>
                  { recipe.name }
                </Card.Title>
              </Link>
              <Card.Text>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${recipe.area} - ${recipe.category}` }
                  { recipe.alcoholicOrNot }
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  { recipe.doneDate }
                </p>
                { recipe.tags !== null ? recipe.tags.map((item, i) => (
                  <p
                    key={ i }
                    data-testid={ `${index}-${item}-horizontal-tag` }
                  >
                    { item }
                  </p>
                )) : '' }
              </Card.Text>
              <Button
                type="button"
                src="src/images/shareIcon.svg"
                alt="share"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => copyLink(copy, setShow, `${recipe.type}s`, recipe.id) }
              >
                Compartilhar
              </Button>
              <p>{ show && 'Link copiado!'}</p>
            </Card.Body>
          </Card>
        </div>

      )) }
    </div>
  );
}
