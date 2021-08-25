import React from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { SearchBarProvider } from '../context/SearchBar';
import Drinks from '../pages/drinks/Drinks';
import drinks from '../../cypress/mocks/drinks';
import drinksCategories from '../../cypress/mocks/drinkCategories';

const mockFetchDrinks = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(drinks),
    }));
};

const mockFetchCategories = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(drinksCategories),
    }));
};

describe('Testa a tela <Drinks.js />', () => {
  beforeAll(mockFetchDrinks, mockFetchCategories);
  beforeEach(cleanup);
  it('A tela de bebidas possui header', () => {
    const screenDrinks = render(<Drinks />, { wrapper: SearchBarProvider });
    screenDrinks.getByText(/Explorar Bebidas/);
    screenDrinks.getByTestId('profile-top-btn');
    screenDrinks.getByTestId('search-top-btn');
  });

  it('A tela de bebidas possui footer', () => {
    const screenDrinks = render(<Drinks />, { wrapper: SearchBarProvider });
    screenDrinks.getByTestId('food-bottom-btn');
    screenDrinks.getByTestId('drinks-bottom-btn');
    screenDrinks.getByTestId('explore-bottom-btn');
  });

  it('Possui os cards', async () => {
    await act(async () => {
      render(<Drinks />, { wrapper: SearchBarProvider });
    });
    expect(await screen.getByTestId('Cocktail-category-filter')).toBeInTheDocument();
    expect(await screen.getByTestId('0-recipe-card')).toBeInTheDocument();
    expect(await screen.getByTestId('0-card-img')).toBeInTheDocument();
    expect(await screen.getByTestId('0-card-name')).toBeInTheDocument();
    expect(await screen.getByText('GG')).toBeInTheDocument();
    expect(await screen.getByText('A1')).toBeInTheDocument();
  });
  it('Possui os botão search', async () => {
    await act(async () => {
      render(<Drinks />, { wrapper: SearchBarProvider });
    });
    const buttonSearch = await screen.getByTestId('search-top-btn');
    fireEvent.click(buttonSearch);
    expect(await screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(await screen.getByTestId('search-input')).toBeInTheDocument();
    expect(await screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(await screen.getByTestId('name-search-radio')).toBeInTheDocument();
    const inputSearch = await screen.getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'gin' } });
    expect(inputSearch.value).toBe('gin');
    fireEvent.click(screen.getByTestId('ingredient-search-radio'));
    fireEvent.click(screen.getByTestId('exec-search-btn'));
  });
});
