import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/explore.css';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <div className="explore">
        <Link to="/explorar/comidas">
          <button
            className="exploreFood"
            type="button"
            data-testid="explore-food"
          >
            <span>
              Explorar
              <br />
              Comidas
            </span>
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            className="exploreDrink"
            type="button"
            data-testid="explore-drinks"
          >
            <span>
              Explorar
              <br />
              Bebidas
            </span>
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
