import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndStore from './renderWithRouterAndStore';
import 'jest-localstorage-mock';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT = 'login-submit-btn';
const EMAIL = 'email@email.com';

describe('1 - Testando a página de Login', () => {
  it('Existe um input para Email', () => {
    const { getByTestId } = renderWithRouterAndStore(<App />);
    const inputEmail = getByTestId(EMAIL_INPUT);
    expect(inputEmail).toBeInTheDocument();
  });
  it('Existe um input para Password', () => {
    const { getByTestId } = renderWithRouterAndStore(<App />);
    const inputPassword = getByTestId(PASSWORD_INPUT);
    expect(inputPassword).toBeInTheDocument();
  });
  it('Existe um botão e ele está desabilitado', () => {
    const { getByTestId } = renderWithRouterAndStore(<App />);
    const button = getByTestId(LOGIN_SUBMIT);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  it('Botão é habilitado após inserir email e senha', () => {
    const { getByTestId } = renderWithRouterAndStore(<App />);
    const inputEmail = getByTestId(EMAIL_INPUT);
    const button = getByTestId(LOGIN_SUBMIT);
    const inputPassword = getByTestId(PASSWORD_INPUT);
    userEvent.type(inputEmail, 'email');
    expect(button).toBeDisabled();
    userEvent.type(inputPassword, '123456');
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputPassword, '1234567');
    expect(button).not.toBeDisabled();
  });
  it('Clicar no botão rota altera e salva as informações', () => {
    const { getByTestId, store } = renderWithRouterAndStore(<App />);
    const inputEmail = getByTestId(EMAIL_INPUT);
    const button = getByTestId(LOGIN_SUBMIT);
    const inputPassword = getByTestId(PASSWORD_INPUT);
    userEvent.type(inputEmail, EMAIL);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    expect(store.getState().userLogin.email).toBe(EMAIL);
  });
});
