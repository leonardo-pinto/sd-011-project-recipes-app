import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderPerfil from '../Components/headers/HeaderPerfil';
import LowerMenu from '../Components/footer/LowerMenu';
import '../css/User.css';

const User = () => {
  if (localStorage.getItem('user')) {
    const { email } = JSON.parse(localStorage.getItem('user'));
    return (
      <div className="user-page">
        <HeaderPerfil />
        <h2 data-testid="profile-email">{ email }</h2>
        <div>
          <ButtonGroup aria-label="user-buttons">
            <Link to="/receitas-feitas">
              <Button
                variant="secondary"
                data-testid="profile-done-btn"
              >
                Receitas Feitas
              </Button>
            </Link>
            <Link to="/receitas-favoritas">
              <Button
                variant="secondary"
                data-testid="profile-favorite-btn"
              >
                Receitas Favoritas
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="secondary"
                data-testid="profile-logout-btn"
                onClick={ () => localStorage.clear() }
              >
                Sair
              </Button>
            </Link>
          </ButtonGroup>
        </div>
        <LowerMenu />
      </div>
    );
  } return (
    <div>
      <HeaderPerfil />
      <div>
        <ButtonGroup aria-label="user-buttons">
          <Link to="/receitas-feitas">
            <Button
              variant="secondary"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </Button>
          </Link>
          <Link to="/receitas-favoritas">
            <Button
              variant="secondary"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="secondary"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </Button>
          </Link>
        </ButtonGroup>
      </div>
      <LowerMenu />
    </div>
  );
};

export default User;
