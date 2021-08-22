import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import FoodOrDrinkFilter from './Components/FoodOrDrinkFilter';
import SecondShareButton from './Components/Secondary/SecondShareButton';
import SecondFavoriteButton from './Components/Secondary/SecondFavoriteButton';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('all');
  const [update, setUpdate] = useState(false);
  const [filtereds, setFiltereds] = useState([]);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    if (filter === 'drinks') {
      setFiltereds(favoriteRecipes.filter((item) => item.type === 'bebida'));
    }
    if (filter === 'foods') {
      setFiltereds(favoriteRecipes.filter((item) => item.type === 'comida'));
    }
    if (filter === 'all') {
      setFiltereds(favoriteRecipes);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, update]);

  return (
    <div>
      <section className="container pt-3 px-3">
        <div className="header">
          <h1 data-testid="page-title">Receitas Favoritas</h1>
          <img
            data-testid="profile-top-btn"
            className="profile-icon"
            src={ profileIcon }
            alt="Botão que direciona para a tela de perfil"
          />
        </div>
        <FoodOrDrinkFilter setFilter={ setFilter } />
        <section className="d-flex flex-column mt-3">
          {filtereds && filtereds.map(({ id,
            image,
            name,
            area,
            alcoholicOrNot,
            category,
            type,
          }, index) => (
            <div className="d-flex div-food-area mt-3" key={ `${name}-${id}` }>
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  width="150"
                  style={{}}
                  data-testid={ `${index}-horizontal-image` }
                  alt="Imagem de comida"
                />
              </Link>
              <div className="d-flex flex-column justify-content-between ml-2">
                <p style={{fontWeight: 'bold'}} data-testid={ `${index}-horizontal-top-text` }>
                  {area !== '' ? `${area} - ${category}` : alcoholicOrNot }
                </p>
                <Link to={ `/${type}s/${id}` }>
                  <p className="a-p" data-testid={ `${index}-horizontal-name` }>{name}</p>
                </Link>
                <div className="d-flex">
                  <SecondFavoriteButton
                    itemId={ id }
                    type={ type }
                    testId={ `${index}-horizontal-favorite-btn` }
                    currentItem={ favoriteRecipes[index] }
                    setUpdate={ setUpdate }
                    update={ update }
                  />
                  <SecondShareButton
                    itemId={ id }
                    type={ type }
                    testID={ `${index}-horizontal-share-btn` }
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}

export default FavoriteRecipes;
