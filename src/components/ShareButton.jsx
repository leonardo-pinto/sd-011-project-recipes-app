import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton({ index, foodOrDrinkBtn, id }) {
  const { copySuccess, setCopySuccess } = useContext(AppContext);

  const url = foodOrDrinkBtn === 'comidas' ? `http://localhost:3000/comidas/${id}` : `http://localhost:3000/bebidas/${id}`;

  function copyLink() {
    const timeout = 3000;
    copy(url);
    setCopySuccess('Link copiado!');
    setTimeout(() => setCopySuccess(''), timeout);
  }
  // console.log('id', id);
  // console.log('url', url);

  return (
    <button type="button" data-testid="share-btn" onClick={ () => copyLink() }>
      <img
        src={ shareIcon }
        alt="Imagem do ícone de comportilhamento"
        data-testid={ `${index}-horizontal-share-btn` }
      />
      <span>{copySuccess}</span>
    </button>
  );
}

ShareButton.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  foodOrDrinkBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

ShareButton.defaultProps = {
  index: 0,
};
