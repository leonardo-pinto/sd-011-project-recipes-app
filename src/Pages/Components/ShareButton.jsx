import React from 'react';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton() {
  const { id } = useParams();
  const [showCopy, setShowCopy] = React.useState(false);
  function copyToClipBoard() {
    copy(`http://localhost:3000/${window.location.pathname.includes('bebidas')
      ? 'bebidas' : 'comidas'}/${id}`);
    setShowCopy(true);
  }
  return (
    <>
      <button style={{border: 'none', backgroundColor: '#F8D4E4'}} type="button" data-testid="share-btn" onClick={ () => copyToClipBoard() }>
        <img
          src={ shareIcon }
          alt="Botão compartilhar"
        />
      </button>
      { showCopy && <p>Link copiado!</p> }
    </>
  );
}

export default ShareButton;
