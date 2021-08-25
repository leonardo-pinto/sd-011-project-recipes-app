import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const recipes = [
  { id: '52948', type: 'comida', area: 'Chinese', category: 'Pork', alcoholicOrNot: '', image: 'https://www.themealdb.com/images/media/meals/1525876468.jpg', name: 'Wontons' },
  { id: '15288', type: 'bebida', area: '', category: 'Shot', alcoholicOrNot: 'Alcoholic', image: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg', name: '252' },
];

describe('Testa componente <FavoriteRecipes.js />', () => {
  it('Contém o título Receitas Favoritas ', async () => {
    const { getByText } = renderWithRouter(<FavoriteRecipes />);
    expect(getByText(/Receitas Favoritas/)).toBeInTheDocument();
  });

  it('Contém os botões', async () => {
    const { getByTestId } = renderWithRouter(<FavoriteRecipes />);
    expect(getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  it('Contém todos os cards', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
    const { getByTestId, getByText } = renderWithRouter(<FavoriteRecipes />);
    expect(await getByText(/Wontons/)).toBeInTheDocument();
    expect(getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-image').src).toBe('https://www.themealdb.com/images/media/meals/1525876468.jpg');
    expect(getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-name').innerHTML).toBe('Wontons');
    expect(getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-name').innerHTML).toBe('252');
    expect(getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(getByTestId('1-horizontal-favorite-btn')).toBeInTheDocument();
  });
});
