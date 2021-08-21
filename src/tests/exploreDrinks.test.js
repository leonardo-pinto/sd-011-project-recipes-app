import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import DrinkExplorer from '../pages/drinks/DrinkExplorer';

describe('Testa a tela <DrinkExplorer.js />', () => {
  it('A tela de explorar comidas possui header', () => {
    const { getByTestId } = renderWithRouter(<DrinkExplorer />);
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(getByTestId('page-title').innerHTML).toBe('Explorar Bebidas');
  });

  it('A tela de explorar bebidas possui footer', () => {
    const { getByTestId } = renderWithRouter(<DrinkExplorer />);
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
  });

  it('Possui o botão Por Ingredientes', () => {
    const { getByTestId, history } = renderWithRouter(<DrinkExplorer />);
    const exploreByIngredient = getByTestId('explore-by-ingredient');
    expect(exploreByIngredient).toBeInTheDocument();
    expect(exploreByIngredient.innerHTML).toBe('Por Ingredientes');
    fireEvent.click(exploreByIngredient);
    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });

  it('Possui o botão Me Surpreenda!', () => {
    const { getByTestId, history } = renderWithRouter(<DrinkExplorer />);
    const exploreSurprise = getByTestId('explore-surprise');
    expect(exploreSurprise).toBeInTheDocument();
    expect(exploreSurprise.innerHTML).toBe('Me Surpreenda!');
    fireEvent.click(exploreSurprise);
    expect(history.location.pathname).toBe('/bebidas/');
  });
});
