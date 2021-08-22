import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import FooterBar from './Components/FooterBar';
// import PropTypes from 'prop-types';

function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user')) || {};
  const history = useHistory();

  function Leave() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <section className="container pt-3 px-3">
        <div className="header">
          <h1 data-testid="page-title">Perfil</h1>
          <Link to="/perfil">
            <img
              data-testid="profile-top-btn"
              className="profile-icon"
              src={ profileIcon }
              alt="Botão que direciona para a tela de perfil"
            />
          </Link>
        </div>
        <section className="d-flex flex-column">
          <div className="align-self-center" style={{fontWeight: 'bold'}} data-testid="profile-email">{userEmail && userEmail.email}</div>
          <div className="d-flex flex-column">
            <button
              type="button"
              className="button"
              style={ { marginTop: '120px', marginBottom: '20px' } }
              data-testid="profile-done-btn"
              onClick={ () => history.push('/receitas-feitas') }
            >
              Receitas Feitas
            </button>

            <button
              type="button"
              className="button"
              style={{marginBottom: '20px'}}
              data-testid="profile-favorite-btn"
              onClick={ () => history.push('/receitas-favoritas') }
            >
              Receitas Favoritas
            </button>
            <button
              type="button"
              className="button"
              data-testid="profile-logout-btn"
              onClick={ () => Leave() }
            >
              Sair
            </button>
          </div>
        </section>
      </section>
      <FooterBar />
    </div>
  );
}

export default Profile;
