import React from 'react';
import renderWithRouter from './renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

const recipes = [
  { id: '52948', type: 'comida', area: 'Chinese', category: 'Pork', alcoholicOrNot: '', image: 'https://www.themealdb.com/images/media/meals/1525876468.jpg', doneDate: '19/8/2021', name: 'Wontons', tags: ['MainMeal'] },
  { id: '15288', type: 'bebida', area: '', category: 'Shot', alcoholicOrNot: 'Alcoholic', image: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg', doneDate: '19/8/2021', name: '252', tags: [] },
];

describe('Testa componente <DoneRecipes.js />', () => {
  it('Contém o título Receitas Feitas', async () => {
    const { getByText } = renderWithRouter(<DoneRecipes />);
    expect(getByText(/Receitas Feitas/)).toBeInTheDocument();
  });

  it('Contém os botões', async () => {
    const { getByTestId } = renderWithRouter(<DoneRecipes />);
    expect(getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  it('Contém todos os cards', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
    const { getByTestId, getByText } = renderWithRouter(<DoneRecipes />);
    expect(await getByText(/Wontons/)).toBeInTheDocument();
    expect(getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-image').src).toBe('https://www.themealdb.com/images/media/meals/1525876468.jpg');
    expect(getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-name').innerHTML).toBe('Wontons');
    expect(getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-done-date').innerHTML).toBe('19/8/2021');
    expect(getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(getByTestId('0-MainMeal-horizontal-tag')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-name').innerHTML).toBe('252');
    expect(getByTestId('1-horizontal-done-date')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-done-date').innerHTML).toBe('19/8/2021');
    expect(getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
  });
});
