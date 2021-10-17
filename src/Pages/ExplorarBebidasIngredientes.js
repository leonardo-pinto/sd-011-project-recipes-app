import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import IngredientsDetails from '../components/IngredientsDetails';
import Footer from '../components/Footer';

function ExplorarBebidasIngredientes({ title }) {
  return (
    <div>
      <Header title={ title } />
      <IngredientsDetails />
      <Footer />
    </div>
  );
}

export default ExplorarBebidasIngredientes;

ExplorarBebidasIngredientes.propTypes = {
  title: PropTypes.string.isRequired,
};
