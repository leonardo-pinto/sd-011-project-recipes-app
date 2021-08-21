// import React from 'react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
// import renderWithRouterAndContext from './renderWithRouterAndContext';

// const EMAIL_INPUT = 'alguem@alguem.com';
// const PASSWORD_INPUT = '1234567';

// describe('Teste de página de Detalhes de Receita', () => {
//   test('Acesso aos Detalhes da primeira receita', async () => {
//     const { getByText, getByTestId , findAllByTestId, history } = renderWithRouterAndContext(<App />);
//     userEvent.type(getByTestId('email-input'), EMAIL_INPUT);
//     userEvent.type(getByTestId('password-input'), PASSWORD_INPUT);
//     userEvent.click(getByTestId('login-submit-btn'));

//     history.push('/comidas');

//     const cardByIndex = /.-recipe-card/;

//     const cards = await findAllByTestId(cardByIndex);
//     userEvent.click(getByTestId('0-recipe-card'));
//     console.log(cards);

//     expect(getByText('Detalhes da comida')).toBeInTheDocument();
//   });

//   test('Titulo da receita', async () => {
//     const { getByText, getByTestId , findAllByTestId, history } = renderWithRouterAndContext(<App />);
//     userEvent.type(getByTestId('email-input'), EMAIL_INPUT);
//     userEvent.type(getByTestId('password-input'), PASSWORD_INPUT);
//     userEvent.click(getByTestId('login-submit-btn'));

//     history.push('/comidas/52977');

//     expect(getByText('Detalhes da comida')).toBeInTheDocument();
//     expect(getByTestId('recipe-title')).toBeInTheDocument();
//   });
// });
