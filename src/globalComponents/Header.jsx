import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Picture1 from '../images/profileIcon.svg';
import Picture2 from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

function Header({ className, title, glass, match: { url } }) {
  const [modal, setModal] = React.useState(false);
  const { data } = useSelector((state) => state.Filter);

  if (data.drinks && data.drinks.length === 1) {
    return <Redirect to={ `/bebidas/${data.drinks[0].idDrink}` } />;
  }
  if (data.meals && data.meals.length === 1) {
    return <Redirect to={ `/comidas/${data.meals[0].idMeal}` } />;
  }

  return (
    <>
      <header className={ styles.headerContainer } src="profileIcon">
        <Link to="/perfil">
          <img src={ Picture1 } alt="perfil" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title" className={ className }>{ title }</h1>

        {glass
      && (
        <button
          data-testid="search-top-btn"
          className={ styles.glassButton }
          type="button"
          src="searchIcon"
          onClick={ () => setModal(!modal) }
        >
          <img src={ Picture2 } alt="lupa" />
        </button>
      )}

      </header>
      <SearchBar modal={ modal } url={ url } />
    </>
  );
}

Header.propTypes = {
  className: PropTypes.string.isRequired,
  glass: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
