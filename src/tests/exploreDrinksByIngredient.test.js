import React from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup, render, screen } from '@testing-library/react';
import DrinkExplorerByIngredients from '../pages/drinks/DrinkExplorerByIngredients';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';
import { SearchBarProvider } from '../context/SearchBar';

const FOOD_BOTTOM_BTN = 'food-bottom-btn';
const DRINKS_BOTTOM_BTN = 'drinks-bottom-btn';
const EXPLORE_BOTTOM_BTN = 'explore-bottom-btn';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(drinkIngredients),
    }));
};

describe('Testa componente <ExploreDrinkByIngredient.js />', () => {
  beforeAll(mockFetch);
  beforeEach(cleanup);
  it('Possui título correto"', async () => {
    await act(async () => {
      render(<DrinkExplorerByIngredients />, { wrapper: SearchBarProvider });
    });
    expect(await screen.getByText('Explorar Ingredientes')).toBeInTheDocument();
  });
  it('Possui Header e Footer', async () => {
    await act(async () => {
      render(<DrinkExplorerByIngredients />, { wrapper: SearchBarProvider });
    });
    expect(screen.queryByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('page-title')).toBeInTheDocument();
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId(FOOD_BOTTOM_BTN)).toBeInTheDocument();
    expect(screen.queryByTestId(DRINKS_BOTTOM_BTN)).toBeInTheDocument();
    expect(screen.queryByTestId(EXPLORE_BOTTOM_BTN)).toBeInTheDocument();
  });

  it('Possui os cards', async () => {
    await act(async () => {
      render(<DrinkExplorerByIngredients />, { wrapper: SearchBarProvider });
    });
    const MAX = 12;
    for (let index = 0; index < MAX; index += 1) {
      expect(screen.getByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId('12-ingredient-card')).not.toBeInTheDocument();
  });
});
