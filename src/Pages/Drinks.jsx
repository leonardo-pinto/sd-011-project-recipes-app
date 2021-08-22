/* eslint-disable react/jsx-max-depth */
import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../Context_Configs/Context';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './Components/SearchBar';
import FooterBar from './Components/FooterBar';
import DrinkCards from './Components/DrinkCards';
import DrinkCategoryButtons from './Components/DrinkCategoryButtons';
import DrinkCategoryCards from './Components/DrinkCategoryCards';
import '../styles/drinks.css';

function Drinks() {
  const history = useHistory();
  const { dataDrinks,
    setRequestDrinksParams,
    renderCategory,
    requestDrinksParams } = useContext(Context);

  const [showSearch, setShowSearch] = useState(false);
  const drinks = 'drinks';

  // Busca por bebidas quando monta a tela de bebidas
  useEffect(() => {
    if (requestDrinksParams.searchInput === ''
    && requestDrinksParams.searchMethod === '') {
      setRequestDrinksParams({
        searchInput: '', searchMethod: '' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderCategory]);

  if (dataDrinks !== null && dataDrinks.length === 1) {
    const oneResult = dataDrinks[0];
    history.push(`/bebidas/${oneResult.idDrink}`);
  }

  return (
    <div className="pb-5">
      <div className="container pt-3 px-3">
        <div className="bebidas-header">
          <div>
            <h1 data-testid="page-title">Bebidas</h1>
          </div>
          <section>
            <Link to="/perfil">
              <img
                data-testid="profile-top-btn"
                className="profile-icon"
                src={ profileIcon }
                alt="Botão que direciona para a tela de perfil"
              />
            </Link>
            <button
              onClick={ () => setShowSearch(!showSearch) }
              type="button"
              className="search-icon-button"
            >
              <img
                data-testid="search-top-btn"
                className="search-icon"
                src={ searchIcon }
                alt="Botão com imagem de uma lupa: abre uma barra de pesquisa"
              />
            </button>
          </section>
        </div>
        { showSearch && <SearchBar value={ drinks } /> }
      </div>
      <DrinkCategoryButtons />
      { renderCategory ? <DrinkCards /> : <DrinkCategoryCards />}

      <FooterBar />
    </div>
  );
}

export default Drinks;

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
