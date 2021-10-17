import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RedirectExploreFoodsAndDrinks from '../components/RedirectExploreFoodsAndDrinks';
import Footer from '../components/Footer';

function Explorar({ title }) {
  return (
    <div>
      <Header title={ title } />
      <RedirectExploreFoodsAndDrinks />
      <Footer />
    </div>
  );
}

export default Explorar;

Explorar.propTypes = {
  title: PropTypes.string.isRequired,
};
