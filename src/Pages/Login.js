import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../redux/slices/user';

function Login() {
  const dispatch = useDispatch();
  const [disabledButton, setDisabledButton] = useState(true);
  const [formsInput, setFormsInput] = useState({
    userEmail: '',
    userPassword: '',
  });
  const { userEmail, userPassword } = formsInput;

  useEffect(() => {
    const format = /\S+@\S+\.\S+/;
    const minPassword = 6;
    if (userPassword.length > minPassword && userEmail.match(format)) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [userEmail, userPassword]);

  function handleInputChange({ target: { name, value } }) {
    setFormsInput({
      ...formsInput,
      [name]: value,
    });
  }

  function handleLogin() {
    dispatch(login(formsInput));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
  }

  return (
    <div>
      <form>
        <label htmlFor="email">
          E-mail:
          <input
            name="userEmail"
            type="email"
            value={ userEmail }
            placeholder="Digite seu email"
            onChange={ handleInputChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            name="userPassword"
            type="password"
            value={ userPassword }
            placeholder="Digite seu password"
            onChange={ handleInputChange }
            data-testid="password-input"
          />
        </label>
        <Link to="/comidas">
          <button
            type="button"
            disabled={ disabledButton }
            data-testid="login-submit-btn"
            onClick={ handleLogin }
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
