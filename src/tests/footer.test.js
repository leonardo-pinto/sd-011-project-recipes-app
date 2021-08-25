import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import Drinks from '../pages/drinks/Drinks';

const EMAIL_INPUT = 'alguem@alguem.com';
const PASSWORD_INPUT = '1234567';

describe('Tests relacted by Footer component', () => {
  test('Elementos do menu inferior na pagina /comidas', () => {
    const { getByTestId } = renderWithRouterAndContext(<App />);
    userEvent.type(getByTestId('email-input'), EMAIL_INPUT);
    userEvent.type(getByTestId('password-input'), PASSWORD_INPUT);
    userEvent.click(getByTestId('login-submit-btn'));
    // console.log(getByTestId('email-input'));
    // history.push('/comidas');

    // expect(window.location.pathname).toBe('/comidas');
    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });

  test('Elementos do menu inferior na pagina /bebidas', () => {
    const { getByTestId, getByText } = renderWithRouterAndContext(<Drinks />);
    // userEvent.type(getByTestId('email-input'), EMAIL_INPUT);
    // userEvent.type(getByTestId('password-input'), PASSWORD_INPUT);
    // userEvent.click(getByTestId('login-submit-btn'));
    // userEvent.click(getByTestId('drinks-bottom-btn'));
    // history.push('/bebidas');
    expect(getByText('Explorar Bebidas')).toBeInTheDocument();
    // expect(window.location.pathname).toBe('/bebidas');
    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
  });
});
