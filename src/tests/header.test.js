import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import renderWithRouter from './renderWithRouter';
import '@testing-library/jest-dom/extend-expect';
import Login from '../pages/Login';

const EMAIL_INPUT = 'alguem@alguem.com';
const PASSWORD_INPUT = '1234567';
const profileBtn = 'profile-top-btn';
const pageTitle = 'page-title';
const searchTop = 'search-top-btn';

const desc = 'Teste do componente Header os data-testids';
const test1 = 'O header na tela de principal de receitas de comidas e bebidas';
const test3 = 'O header na tela de principal de receitas de bebidas';

describe(desc, () => {
  test(test1, () => {
    const { getByText, getByTestId } = renderWithRouterAndContext(<App />);

    userEvent.type(getByTestId('email-input'), EMAIL_INPUT);
    userEvent.type(getByTestId('password-input'), PASSWORD_INPUT);
    userEvent.click(getByTestId('login-submit-btn'));

    expect(getByText('Explorar Comidas')).toBeInTheDocument();
    expect(getByTestId(profileBtn)).toBeInTheDocument();
    expect(getByTestId(pageTitle)).toBeInTheDocument();
    expect(getByTestId(searchTop)).toBeInTheDocument();
  });

  test('Não tem Header na página Login', () => {
    const { queryAllByTestId, getByText } = renderWithRouter(<Login />);
    // const { getByText, queryAllByTestId } = await renderWithRouter(<App />);

    // userEvent.type(getByTestId('email-input'), EMAIL_INPUT);
    // userEvent.type(getByTestId('password-input'), PASSWORD_INPUT);
    // userEvent.click(getByTestId('login-submit-btn'));

    expect(getByText('Login')).toBeInTheDocument();

    expect(queryAllByTestId(profileBtn)).toHaveLength(0);
    expect(queryAllByTestId(pageTitle)).toHaveLength(0);
    expect(queryAllByTestId(searchTop)).toHaveLength(0);
    // Para utilizar getBy é necessário utilizar async await
    // https://testing-library.com/docs/guide-disappearance
  });

  test(test3, async () => {
    const { getByTestId, history } = await renderWithRouter(<Login />);
    // const { getByText, getByTestId } = renderWithRouterAndContext(<App />);
    const inputEmail = getByTestId('email-input');
    const inputPassword = getByTestId('password-input');
    const buttonLogin = getByTestId('login-submit-btn');

    fireEvent.change(inputEmail, { target: { value: 'alguem@algo.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234567' } });
    fireEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/comidas');
    // fireEvent.click(await getByTestId('drinks-bottom-btn'));

    // expect(getByText('Explorar Bebidas')).toBeInTheDocument();

    // expect(getByTestId(profileBtn)).toBeInTheDocument();
    // expect(getByTestId(pageTitle)).toBeInTheDocument();
    // expect(getByTestId(searchTop)).toBeInTheDocument();
  });
});
