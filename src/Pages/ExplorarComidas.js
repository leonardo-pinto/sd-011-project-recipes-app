import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExploreButtons from '../components/ExploreButtons';
import Footer from '../components/Footer';

function ExplorarComidas({ title }) {
  return (
    <div>
      <Header title={ title } />
      <ExploreButtons />
      <Footer />
    </div>
  );
}

export default ExplorarComidas;

ExplorarComidas.propTypes = {
  title: PropTypes.string.isRequired,
};
