import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardsList from '../../components/CardsList';
import ExplorerByCountry from '../../components/ExplorerByCountry';

export default function FoodExplorerByCountry() {
  return (
    <>
      <Header title="Explorar Origem" search fetchType="themealdb" />
      <ExplorerByCountry />
      <CardsList fetchType="themealdb" styleHeight="byarea" />
      <Footer />
    </>
  );
}
