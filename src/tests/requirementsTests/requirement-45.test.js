import React from 'react';
import { renderWithRouterAndStore } from '../helper/testConfig';
import * as requestMenu from '../../services/requestMenu';
import mealsFiltersByAll from '../mocks/meals/mockFilterMealsByAll';
import mealRecipeDetails from '../mocks/meals/mockMealRecipeDetails';
import drinksFiltersByAll from '../mocks/drinks/mockFilterDrinksByAll';
import drinkRecipeDetails from '../mocks/drinks/mockDrinkRecipeDetails';
import App from '../../App';

const mockMealPath = '/comidas/52977';
const mockDrinkPath = '/bebidas/15997';

jest
  .spyOn(requestMenu, 'searchMealByName')
  .mockImplementation(() => Promise.resolve(mealsFiltersByAll));

jest
  .spyOn(requestMenu, 'searchDrinkByName')
  .mockImplementation(() => Promise.resolve(drinksFiltersByAll));

jest
  .spyOn(requestMenu, 'mealsRecipeDetails')
  .mockImplementation(() => Promise.resolve(mealRecipeDetails));

jest
  .spyOn(requestMenu, 'drinksRecipeDetails')
  .mockImplementation(() => Promise.resolve(drinkRecipeDetails));

afterEach(() => jest.clearAllMocks());
beforeEach(() => jest.clearAllMocks());

describe(`45 - Implement the logic on the bookmark button, if clicked, the heart 
icon should change its current state, if filled it should change to "unfilled" 
and vice versa`, () => {
  it('Favorite food', () => {
    renderWithRouterAndStore(<App />, { route: mockMealPath });
  });

  it('Disfavors the food', () => {
    renderWithRouterAndStore(<App />, { route: mockMealPath });
  });

  it('Favorite drink', () => {
    renderWithRouterAndStore(<App />, { route: mockDrinkPath });
  });

  it('Disfavors drinking', () => {
    renderWithRouterAndStore(<App />, { route: mockDrinkPath });
  });
});
