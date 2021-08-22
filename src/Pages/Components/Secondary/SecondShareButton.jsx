import React from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../../../images/shareIcon.svg';

function SecondShareButton({ itemId, type, testID }) {
  const [showCopy, setShowCopy] = React.useState(false);

  function copyToClipBoard() {
    copy(`http://localhost:3000/${type.includes('bebida')
      ? 'bebidas' : 'comidas'}/${itemId}`);
    setShowCopy(true);
  }
  return (
    <div className="d-flex alignt-items-center" role="button" onClick={ () => copyToClipBoard() } >
      { /* <button type="button" onClick={ () => copyToClipBoard() }>*/}
      {!showCopy ? (
        <img
          data-testid={ testID }
          src={ shareIcon}
          alt="Botão compartilhar"
        />) : (<p>Link copiado!</p>)
      }
    
      {/*</button>*/}

    </div>
  );
}

export default SecondShareButton;

SecondShareButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  testID: PropTypes.string.isRequired,
};
