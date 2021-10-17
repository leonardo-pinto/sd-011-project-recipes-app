import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RenderDoneRecipes from '../components/RenderDoneRecipes';

function ReceitasFeitas({ title }) {
  return (
    <div>
      <Header title={ title } />
      <RenderDoneRecipes />
    </div>
  );
}

export default ReceitasFeitas;

ReceitasFeitas.propTypes = {
  title: PropTypes.string.isRequired,
};
