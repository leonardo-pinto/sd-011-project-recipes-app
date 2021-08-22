/* eslint-disable react/jsx-max-depth */
import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../Context_Configs/Context';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './Components/SearchBar';
import FooterBar from './Components/FooterBar';
import FoodCategoryButtons from './Components/FoodCategoryButtons';
import FoodsCards from './Components/FoodsCards';
import FoodCategoryCards from './Components/FoodCategoryCards';
import '../styles/foods.css';

// import PropTypes from 'prop-types';

function Foods() {
  const history = useHistory();
  const { dataFood,
    setRequestFoodParams,
    renderCategory,
    // setRenderFoodCategory,
    requestFoodParams,
  } = useContext(Context);

  const [showSearch, setShowSearch] = useState(false);
  const foods = 'foods';

  // Busca por comidas ao renderizar a tela de comidas.
  useEffect(() => {
    if (requestFoodParams.searchInput === '' && requestFoodParams.searchMethod === '') {
      setRequestFoodParams({
        searchInput: '', searchMethod: '' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderCategory]);

  if (dataFood !== null && dataFood.length === 1) {
    const oneResult = dataFood[0];
    history.push(`/comidas/${oneResult.idMeal}`);
  }

  return (
    <section className="pb-5">
      <div className="container pt-3 px-3">
        <div className="comida-header">
          <div>
            <h1 data-testid="page-title">Comida</h1>
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
        { showSearch && <SearchBar value={ foods } /> }
      </div>
      <FoodCategoryButtons />
      {
        renderCategory ? <FoodsCards /> : <FoodCategoryCards />
      }

      <FooterBar />
    </section>
  );
}

export default Foods;

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
