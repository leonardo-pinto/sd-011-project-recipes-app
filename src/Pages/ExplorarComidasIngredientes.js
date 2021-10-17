import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import IngredientsDetails from '../components/IngredientsDetails';
import Footer from '../components/Footer';

function ExplorarComidasIngredientes({ title }) {
  return (
    <div>
      <Header title={ title } />
      <IngredientsDetails />
      <Footer />
    </div>
  );
}

export default ExplorarComidasIngredientes;

ExplorarComidasIngredientes.propTypes = {
  title: PropTypes.string.isRequired,
};
