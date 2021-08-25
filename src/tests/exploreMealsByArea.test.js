import React from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { SearchBarProvider } from '../context/SearchBar';
import areas from '../../cypress/mocks/areas';
import meals from '../../cypress/mocks/meals';
import FoodExplorerByCountry from '../pages/foods/FoodExplorerByCountry';

const PROFILE_TOP_BTN = 'profile-top-btn';
const SEARCH_TOP_BTN = 'search-top-btn';
const FOOD_BOTTOM_BTN = 'food-bottom-btn';
const DRINKS_BOTTOM_BTN = 'drinks-bottom-btn';
const EXPLORE_BOTTOM_BTN = 'explore-bottom-btn';

const mockFetchAreas = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(areas),
    }));
};

const mockFetchMeals = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(meals),
    }));
};

describe('Testa a tela <FoodExplorerByCountry.js />', () => {
  beforeAll(mockFetchAreas, mockFetchMeals);
  beforeEach(cleanup);
  it('A tela de explorer origem possui header', () => {
    const screenFoods = render(<FoodExplorerByCountry />, { wrapper: SearchBarProvider });
    screenFoods.getByText(/Explorar Origem/);
    screenFoods.getByTestId(PROFILE_TOP_BTN);
    screenFoods.getByTestId(SEARCH_TOP_BTN);
  });

  it('A tela de explorer origem possui footer', () => {
    const screenFoods = render(<FoodExplorerByCountry />, { wrapper: SearchBarProvider });
    screenFoods.getByTestId(FOOD_BOTTOM_BTN);
    screenFoods.getByTestId(DRINKS_BOTTOM_BTN);
    screenFoods.getByTestId(EXPLORE_BOTTOM_BTN);
  });

  it('Possui os cards e selects', async () => {
    await act(async () => {
      render(<FoodExplorerByCountry />, { wrapper: SearchBarProvider });
    });
    expect(await screen.getByTestId('American-option')).toBeInTheDocument();
    expect(await screen.getByTestId('Canadian-option')).toBeInTheDocument();
    expect(await screen.getByTestId('Jamaican-option')).toBeInTheDocument();
    expect(await screen.getByTestId('0-recipe-card')).toBeInTheDocument();
    expect(await screen.getByTestId('0-card-img')).toBeInTheDocument();
    expect(await screen.getByTestId('0-card-name')).toBeInTheDocument();
    expect(await screen.getByTestId('1-recipe-card')).toBeInTheDocument();
    expect(await screen.getByTestId('2-recipe-card')).toBeInTheDocument();
    expect(await screen.getByTestId('3-recipe-card')).toBeInTheDocument();
    const buttonSearch = await screen.getByTestId(SEARCH_TOP_BTN);
    fireEvent.click(buttonSearch);
    expect(await screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(await screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('exec-search-btn'));
  });
  it('Possui os botões search', async () => {
    await act(async () => {
      render(<FoodExplorerByCountry />, { wrapper: SearchBarProvider });
    });
    const buttonSearch = await screen.getByTestId(SEARCH_TOP_BTN);
    fireEvent.click(buttonSearch);
    expect(await screen.getByTestId('search-input')).toBeInTheDocument();
    expect(await screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(await screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(await screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    const inputSearch = await screen.getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'rice' } });
    expect(inputSearch.value).toBe('rice');
    fireEvent.click(screen.getByTestId('ingredient-search-radio'));
    fireEvent.click(screen.getByTestId('exec-search-btn'));
  });
});
