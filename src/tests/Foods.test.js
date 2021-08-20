import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import { SearchBarProvider } from '../context/SearchBar';
import Foods from '../pages/foods/Foods';

describe('Testa a tela <Foods.js />', () => {
  it('A tela de comida possui header', () => {
    const screen = render(<Foods />, { wrapper: SearchBarProvider }); // pra ilustrar outra forma de renderizar o Foods
    screen.getByText(/Explorar Comidas/);
    screen.getByTestId('profile-top-btn');
    screen.getByTestId('search-top-btn');
  });

  it('A tela de comida possui footer', () => {
    const screen = render(<Foods />, { wrapper: SearchBarProvider });
    screen.getByTestId('food-bottom-btn');
    screen.getByTestId('drinks-bottom-btn');
    screen.getByTestId('explore-bottom-btn');
  });

  it('Possui os cards', async () => {
    const { getByTestId } = renderWithRouterAndContext(<Foods />); // já vem com Context envolvendo o componente Foods
    const teste = await getByTestId('0-recipe-card');
    expect(teste).toBeInTheDocument();
    // expect(getByText('Beef')).toBeInTheDocument();
  });
});
// describe('Testa componente <Login.js />', () => {
//   it('O botão deve estar ativado se o email e a senha forem válidos', () => {
//     const { getByTestId, history } = renderWithRouter(<Login />);
//     const inputEmail = getByTestId('email-input');
//     const inputPassword = getByTestId('password-input');
//     const buttonLogin = getByTestId('login-submit-btn');

//     expect(buttonLogin).toHaveAttribute('disabled');
//     fireEvent.change(inputEmail, { target: { value: 'alguem@algo.com' } });
//     expect(inputEmail.value).toBe('alguem@algo.com');
//     fireEvent.change(inputPassword, { target: { value: '1234567' } });
//     expect(inputPassword.value).toBe('1234567');
//     fireEvent.click(buttonLogin);
//     expect(history.location.pathname).toBe('/comidas');
//   });
// });
