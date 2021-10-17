import React from 'react';
import { Link } from 'react-router-dom';

function RedirectExploreFoodsAndDrinks() {
  return (
    <section>
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </Link>
    </section>
  );
}

export default RedirectExploreFoodsAndDrinks;
