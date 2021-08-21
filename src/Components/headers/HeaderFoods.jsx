import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import SearchBar from '../SearchBar';
import '../../css/Headers.css';

function HeaderFoods() {
  const [searchBar, getSearchBar] = useState(false);
  return (
    <header
      className="header-foods"
    >
      <Link to="/perfil">
        <button
          type="button"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="user profile"
            width="30px"
            height="40px"
          />
        </button>
      </Link>
      <h1 data-testid="page-title">Comidas</h1>
      <button
        type="button"
        onClick={ () => (searchBar ? getSearchBar(false) : getSearchBar(true)) }
      >
        <img
          src={ searchIcon }
          data-testid="search-top-btn"
          alt="explore search"
          width="30px"
          height="30px"
        />
      </button>
      {
        searchBar && <SearchBar />
      }
    </header>
  );
}

export default HeaderFoods;
