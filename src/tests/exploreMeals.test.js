import React from 'react';
import { fireEvent } from '@testing-library/react';
import FoodExplorer from '../pages/foods/FoodExplorer';
import renderWithRouter from './renderWithRouter';

describe('Testa a tela <FoodExplorer.js />', () => {
  it('A tela de explorar comidas possui header', () => {
    const { getByTestId } = renderWithRouter(<FoodExplorer />);
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(getByTestId('page-title').innerHTML).toBe('Explorar Comidas');
  });

  it('A tela de explorar comidas possui footer', () => {
    const { getByTestId } = renderWithRouter(<FoodExplorer />);
    expect(getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('explore-bottom-btn')).toBeInTheDocument();
  });

  it('Possui o botão Por Ingredientes', () => {
    const { getByTestId, history } = renderWithRouter(<FoodExplorer />);
    const exploreByIngredient = getByTestId('explore-by-ingredient');
    expect(exploreByIngredient).toBeInTheDocument();
    expect(exploreByIngredient.innerHTML).toBe('Por Ingredientes');
    fireEvent.click(exploreByIngredient);
    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });

  it('Possui o botão Por Local de Origem', () => {
    const { getByTestId, history } = renderWithRouter(<FoodExplorer />);
    const exploreByArea = getByTestId('explore-by-area');
    expect(exploreByArea).toBeInTheDocument();
    expect(exploreByArea.innerHTML).toBe('Por Local de Origem');
    fireEvent.click(exploreByArea);
    expect(history.location.pathname).toBe('/explorar/comidas/area');
  });

  it('Possui o botão Me Surpreenda!', () => {
    const { getByTestId, history } = renderWithRouter(<FoodExplorer />);
    const exploreSurprise = getByTestId('explore-surprise');
    expect(exploreSurprise).toBeInTheDocument();
    expect(exploreSurprise.innerHTML).toBe('Me Surpreenda!');
    fireEvent.click(exploreSurprise);
    expect(history.location.pathname).toBe('/comidas/');
  });
});
