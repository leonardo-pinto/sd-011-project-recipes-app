import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RenderRecipes from '../components/RenderRecipes';
import Footer from '../components/Footer';

function Comidas({ title, location: { recipeName } }) {
  return (
    <div>
      <Header title={ title } />
      {/* <CategoryButtons /> */}
      {/* {Object.keys(foods).length > 0
        && <RenderRecipes redirectedFromIngredients={ recipeName } />} */}
      <RenderRecipes redirectedFromIngredients={ recipeName } />
      <Footer />
    </div>
  );
}

export default Comidas;

Comidas.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.shape({
    recipeName: PropTypes.string.isRequired,
  }).isRequired,
};
