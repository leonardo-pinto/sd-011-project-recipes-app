import React from 'react';
import { fireEvent } from '@testing-library/react';
import Explorer from '../pages/Explorer';
import renderWithRouter from './renderWithRouter';

describe('Testa a tela <Explorer.js />', () => {
  it('A tela de explorar possui header', () => {
    const { getByTestId } = renderWithRouter(<Explorer />);
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(getByTestId('page-title').innerHTML).toBe('Explorar');
  });

  it('A tela de explorar possui footer', () => {
    const { getByTestId } = renderWithRouter(<Explorer />);
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
  });

  it('Possui o botão Explorar Comidas', () => {
    const { getByTestId, history } = renderWithRouter(<Explorer />);
    const exploreFood = getByTestId('explore-food');
    expect(exploreFood).toBeInTheDocument();
    expect(exploreFood.innerHTML).toBe('Explorar Comidas');
    fireEvent.click(exploreFood);
    expect(history.location.pathname).toBe('/explorar/comidas');
  });

  it('Possui o botão Explorar Bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<Explorer />);
    const exploreDrinks = getByTestId('explore-drinks');
    expect(exploreDrinks).toBeInTheDocument();
    expect(exploreDrinks.innerHTML).toBe('Explorar Bebidas');
    fireEvent.click(exploreDrinks);
    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
