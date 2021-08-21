import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { InProgressProvider } from '../context/RecipeInProgress';
import RecipeInProgress from '../pages/RecipeInProgress';

const FOOD_BOTTOM_BTN = 'food-bottom-btn';
const DRINKS_BOTTOM_BTN = 'drinks-bottom-btn';
const EXPLORE_BOTTOM_BTN = 'explore-bottom-btn';

const match = {
  params: {
    id: '52771',
  },
  path: '/comidas/:id/in-progress',
};

const location = { pathname: '/comidas/52771/in-progress' };

const testHistory = createMemoryHistory(
  { initialEntries: ['/comidas/52771/in-progress'] },
);

const inProgressRecipes = { cocktails: {}, meals: {} };

describe('Testa componente <RecipeInProgress.js />', () => {
  it('Possui o texto "Carregando..."', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    await act(async () => {
      render(<RecipeInProgress
        match={ match }
        location={ location }
        history={ testHistory }
      />, { wrapper: InProgressProvider });
    });
    expect(await screen.getByText('Carregando...')).toBeInTheDocument();
  });
  it('Não possui Header e Footer', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    await act(async () => {
      render(<RecipeInProgress
        location={ location }
        history={ testHistory }
      />, { wrapper: InProgressProvider });
    });
    expect(screen.queryByTestId('profile-top-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('page-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId(FOOD_BOTTOM_BTN)).not.toBeInTheDocument();
    expect(screen.queryByTestId(DRINKS_BOTTOM_BTN)).not.toBeInTheDocument();
    expect(screen.queryByTestId(EXPLORE_BOTTOM_BTN)).not.toBeInTheDocument();
  });
});
