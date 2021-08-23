import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import mealIconGreen from '../images/VectorfoodGreen.svg';
import drinkIconGreen from '../images/drinkGreen.svg';
import exploreIconGreen from '../images/VectorexploreGreen.svg';
import '../styles/footer.css';

function Footer() {
  const teste = useLocation().pathname;
  console.log(teste);
  return (
    <footer className="footer" data-testid="footer" style={ { position: 'fixed', bottom: 0 } }>
      <Link to="/bebidas">
        <button
          type="button"
        >
          <img
            src={ teste.includes('bebidas') ? drinkIconGreen : drinkIcon }
            alt="Imagem do ícone de acesso às bebidas"
            data-testid="drinks-bottom-btn"
          />
          <span style={ teste.includes('bebidas') ? { color: '#40CC8B' } : { color: '#344052' } }>Bebidas</span>
        </button>
      </Link>
      <Link to="/explorar">
        <button
          type="button"
        >
          <img
            src={ teste.includes('explorar') ? exploreIconGreen : exploreIcon }
            alt="Imagem do ícone de acesso aos conteúdos do app"
            data-testid="explore-bottom-btn"
          />
          <span style={ teste.includes('explorar') ? { color: '#40CC8B' } : { color: '#344052' } }>Explorar</span>
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
        >
          <img
            src={ teste.includes('comidas') ? mealIconGreen : mealIcon }
            alt="Imagem do ícone de acesso às comidas"
            data-testid="food-bottom-btn"
          />
          <span style={ teste.includes('comidas') ? { color: '#40CC8B' } : { color: '#344052' } }>Comidas</span>
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
