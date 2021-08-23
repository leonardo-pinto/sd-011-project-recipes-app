import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import logo from '../images/undraw_cooking_lyxy 1.svg';
import doneIcon from '../images/doneIcon.svg';
import favIcon from '../images/favoriteIcon.svg';
import '../styles/profile.css';

function Profile() {
  const localStorageEmail = localStorage.getItem('user');
  const emailParse = JSON.parse(localStorageEmail);

  const handleClick = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Perfil" />
      <div className="profile">
        <div className="userInfo">
          <img src={ logo } alt="logoProfile" />
          <p data-testid="profile-email">{ emailParse && emailParse.email }</p>
        </div>
        <Link to="/receitas-feitas">
          <div className="iconButton">
            <img src={ doneIcon } alt="done" />
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </div>
        </Link>
        <Link to="/receitas-favoritas">
          <div className="iconButton">
            <img src={ favIcon } alt="fav" />
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </div>
        </Link>
        <Link to="/">
          <button
            className="bttnExit"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleClick }
          >
            Sair
          </button>
        </Link>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
