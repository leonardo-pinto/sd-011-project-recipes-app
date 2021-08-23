import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
// import { Link } from 'react-router-dom';
// import ShareButton from './ShareButton';
import '../styles/carousel.css';
import '../styles/localStorageButtons.css';
// import FavoriteButton from './FavoriteButton';
import renderFaveRecipes from '../helper/FavFunction';
import renderDoneRecipes from '../helper/DoneFunction';

function LocalStorageButtons({ doneRecipes }) {
  const { bttnFav, setBttnFav } = useContext(AppContext);
  const [filter, setFilter] = useState('all');

  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  const fave = JSON.parse(localStorage.getItem('favoriteRecipes'));

  function handleClick(e) {
    if (doneRecipes) {
      setBttnFav(done);
      setFilter(e.target.value);
    } else {
      setBttnFav(fave);
      setFilter(e.target.value);
    }
    setBttnFav(bttnFav);
  }

  console.log('filter', bttnFav);
  useEffect(() => {
    if (doneRecipes) {
      setBttnFav(done);
    } else {
      setBttnFav(fave);
    }
  }, []);

  return (
    <>
      <section className="localStorageBttns">
        <button
          type="button"
          value="all"
          onClick={ (e) => { handleClick(e); } }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          value="comida"
          onClick={ (e) => { handleClick(e); } }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          value="bebida"
          onClick={ (e) => { handleClick(e); } }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <div className="body">
        { bttnFav && bttnFav
          .filter((item) => (filter !== 'all' ? filter === item.type : bttnFav))
          .map((doneRecipes ? renderDoneRecipes : renderFaveRecipes))}
      </div>
    </>
  );
}

LocalStorageButtons.propTypes = {
  doneRecipes: PropTypes.bool,
};

LocalStorageButtons.defaultProps = {
  doneRecipes: false,
};

export default LocalStorageButtons;
