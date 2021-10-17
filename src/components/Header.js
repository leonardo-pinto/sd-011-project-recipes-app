import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RenderSearchBar from './RenderSearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
// import { setInitialCategories } from '../redux/slices/fetchReceitas';
// import { allFoodsCategories, allDrinksCategories } from '../helpers/endpoints';
// import useFetchInitial from '../hooks/useFetchInitial';

function Header({ title }) {
  // const dispatch = useDispatch();
  // const { data, isLoading, error } = useFetchInitial(allFoodsCategories, allDrinksCategories);
  // const { foodsCategories, drinksCategories } = useSelector((state) => state.fetchReceitas);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // if (error) return <p>{error}</p>;

  // if (isLoading) return <p>Loading...</p>;

  // if (data) {
  //   dispatch(setInitialCategories(data));
  // }

  const pagesThatContainsSearchButton = [
    'Comidas',
    'Bebidas',
    'Explorar Origem',
  ];

  // const renderSearchComponents = {
  //   Comidas: (<RenderSearchBar />),
  //   Bebidas: (<RenderSearchBar />),
  // };

  return (
    <div>
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile-icon"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {(pagesThatContainsSearchButton.includes(title))
        && (
          <div>
            <button
              type="button"
              onClick={ () => setShowSearchBar(!showSearchBar) }
            >
              <img src={ searchIcon } data-testid="search-top-btn" alt="search-icon" />
            </button>
            {/* {(!hiddenSearchBar && renderSearchComponents[title])} */}
          </div>)}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
