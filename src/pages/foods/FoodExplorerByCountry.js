import React from 'react';
import Header from '../../components/Header';
import { SearchBarProvider } from '../../context/SearchBar';
import Footer from '../../components/Footer';
import CardsList from '../../components/CardsList';
import ExplorerByCountry from '../../components/ExplorerByCountry';

export default function FoodExplorerByCountry() {
  return (
    <>
      <SearchBarProvider>
        <Header title="Explorar Origem" search fetchType="themealdb" />
        <ExplorerByCountry />
        <CardsList fetchType="themealdb" styleHeight="byarea" />
      </SearchBarProvider>
      <Footer />
    </>
  );
}
