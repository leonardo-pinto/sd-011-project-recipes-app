import React from 'react';
import renderWithRouter from './renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa componente <Profile.js />', () => {
  it('Contém o título Perfil e email não encontrado (localStorage vazio)', async () => {
    const { getByText } = renderWithRouter(<Profile />);
    expect(getByText(/Perfil/)).toBeInTheDocument();
    expect(getByText(/E-mail não encontrado/)).toBeInTheDocument();
  });
  it('Contém todos os botões e o e-mail salvo', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'alguem@algo.com' }));
    const { getByTestId, getByText } = renderWithRouter(<Profile />);
    expect(await getByText(/alguem@algo.com/)).toBeInTheDocument();
    expect(getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('profile-logout-btn')).toBeInTheDocument();
  });
});
