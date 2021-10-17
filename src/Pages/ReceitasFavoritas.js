import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RenderFavoriteRecipes from '../components/RenderFavoriteRecipes';

function ReceitasFavoritas({ title }) {
  return (
    <div>
      <Header title={ title } />
      <RenderFavoriteRecipes />
    </div>
  );
}

export default ReceitasFavoritas;

ReceitasFavoritas.propTypes = {
  title: PropTypes.string.isRequired,
};
