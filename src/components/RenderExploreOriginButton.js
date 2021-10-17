import React from 'react';
import { Link } from 'react-router-dom';

function RenderExploreOriginButton() {
  return (
    <Link to="/explorar/comidas/area">
      <button
        type="button"
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </button>
    </Link>
  );
}

export default RenderExploreOriginButton;
