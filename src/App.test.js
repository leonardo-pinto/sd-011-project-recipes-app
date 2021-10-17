import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { renderWithRouterAndStore } from './tests/renderWithRouterAndStore';

test('Farewell, front-end', () => {
  const { getByText } = renderWithRouterAndStore(<App />);
  const linkElement = getByText(/Entrar/i);
  expect(linkElement).toBeInTheDocument();
});
