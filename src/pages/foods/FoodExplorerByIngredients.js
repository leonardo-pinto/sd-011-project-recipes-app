import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SearchBarProvider } from '../../context/SearchBar';
import CardsListByIngredient from '../../components/CardsListByIngredient';

export default function FoodExplorerByIngredients() {
  return (
    <>
      <SearchBarProvider>
        <Header title="Explorar Ingredientes" />
      </SearchBarProvider>
      <div
        className="container-header-filters"
        style={ { zIndex: '1' } }
      >
        <h3
          className="container-header"
          style={ { marginTop: '60px', textAlign: 'center' } }
        >
          Ingredients
        </h3>
      </div>
      <CardsListByIngredient />
      <Footer />
    </>
  );
}
