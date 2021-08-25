import React, { useContext } from 'react';
import Header from '../../components/Header';
import { SearchBarContext } from '../../context/SearchBar';
import Footer from '../../components/Footer';
import CardsList from '../../components/CardsList';

export default function Drinks() {
  const { ingred } = useContext(SearchBarContext);
  return (
    <main>
      <Header title="Explorar Bebidas" search filterBar fetchType="thecocktaildb" />
      <CardsList fetchType="thecocktaildb" ingredient={ ingred } />
      <Footer />
    </main>
  );
}
