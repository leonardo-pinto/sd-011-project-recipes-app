import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Testa componente <Login.js />', () => {
  it('Contém o título Login', () => {
    const { getByText } = renderWithRouter(<Login />);
    const title = getByText(/Login/);
    expect(title).toBeInTheDocument();
  });

  it('O botão deve estar desativado se os campos email e senha estiverem vazios', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const buttonLogin = getByTestId('login-submit-btn');
    expect(buttonLogin).toHaveAttribute('disabled');
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    const { getByTestId, history } = renderWithRouter(<Login />);
    const inputEmail = getByTestId('email-input');
    const inputPassword = getByTestId('password-input');
    const buttonLogin = getByTestId('login-submit-btn');

    expect(buttonLogin).toHaveAttribute('disabled');
    fireEvent.change(inputEmail, { target: { value: 'alguem@algo.com' } });
    expect(inputEmail.value).toBe('alguem@algo.com');
    fireEvent.change(inputPassword, { target: { value: '1234567' } });
    expect(inputPassword.value).toBe('1234567');
    fireEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/comidas');
  });
});
