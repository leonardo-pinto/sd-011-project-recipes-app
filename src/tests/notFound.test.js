import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// const EMAIL_INPUT = 'alguem@alguem.com';
// const PASSWORD_INPUT = '1234567';

describe('Teste de página não encontrada', () => {
  test('Not Found page - 1', () => {
    const { getByText, history } = renderWithRouter(<App />);
    // userEvent.type(getByTestId('email-input'), EMAIL_INPUT);
    // userEvent.type(getByTestId('password-input'), PASSWORD_INPUT);
    // userEvent.click(getByTestId('login-submit-btn'));
    history.push('/anyone');
    expect(getByText('Not Found')).toBeInTheDocument();
  });

  test('Not Found page - 2', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/explorer/anyone');
    expect(getByText('Not Found')).toBeInTheDocument();
  });
});
