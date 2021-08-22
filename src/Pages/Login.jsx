import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import credentialsVerify from '../Helpers/credentialsVerify';
import submitLocalStorage from '../Helpers/submitLocalStorage';
import chefImage from '../Extra Contents/pngwing.com.png';
import '../styles/login.css';

function Login() {
  const history = useHistory();
  function HandlerLogin() {
    history.push('/comidas');
  }
  const [user, setUser] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);

  function handleSubmit(e) {
    setUser({
      ...user, [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    setDisabled(credentialsVerify(user.email, user.password));
  }, [user]);

  return (
    <div className="container-fluid ">
      <img
        className="food-card w-100 rounded-circle mt-2 p-2"
        src={ chefImage }
        alt="Imagem de um chefe de cozinha com garfo e faca nas mãos"
      />
      <h1 className="d-flex justify-content-center h1 mt-3">Cook Time</h1>
      <form className="d-flex flex-wrap justify-content-center">
        <div className="form-group">
          <label htmlFor="email">
            <input
              onChange={ (e) => handleSubmit(e) }
              className="form-control"
              name="email"
              data-testid="email-input"
              id="email"
              type="email"
              placeholder="Email"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <input
              onChange={ (e) => handleSubmit(e) }
              className="form-control"
              name="password"
              data-testid="password-input"
              id="password"
              type="password"
              placeholder="Senha"
            />
          </label>
        </div>
      </form>
      <div className="d-flex justify-content-center">
        <button
          disabled={ disabled }
          className={ disabled ? 'btn btn-secondary' : 'btn btn-success' }
          type="button"
          data-testid="login-submit-btn"
          onClick={ () => { submitLocalStorage(user.email); HandlerLogin(); } }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
