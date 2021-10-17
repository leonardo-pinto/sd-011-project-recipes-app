import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user'))
      || { email: 'Se você chegou aqui até aqui, parabéns' };
    setUserEmail(email);
  }, []);

  return (
    <div>
      <Header title="Perfil" />
      <div>
        <p data-testid="profile-email">{userEmail.email}</p>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>

        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>

        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
        <Footer />
      </div>
    </div>
  );
}

export default Perfil;
