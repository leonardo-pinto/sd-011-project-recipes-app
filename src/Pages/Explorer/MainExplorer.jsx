import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import HeaderExplore from '../../Components/headers/HeaderExplore';
import LowerMenu from '../../Components/footer/LowerMenu';
import '../../css/MainExplore.css';

export default function MainExplorer({ history }) {
  const handleClick = ({ target }) => {
    if (target.name === 'food') {
      history.push('/explorar/comidas');
    } else {
      history.push('/explorar/bebidas');
    }
  };

  return (
    <div className="explore-page">
      <HeaderExplore history={ history } title="Explorar" />
      <div className="explore-page-buttons">
        <Button
          variant="light"
          data-testid="explore-food"
          name="food"
          onClick={ handleClick }
          type="button"
        >
          Explorar Comidas
        </Button>
        <Button
          variant="light"
          data-testid="explore-drinks"
          name="drinks"
          onClick={ handleClick }
          type="button"
        >
          Explorar Bebidas
        </Button>
      </div>
      <footer>
        <LowerMenu />
      </footer>
    </div>
  );
}

MainExplorer.propTypes = {
  history: PropTypes.shape().isRequired,
};
