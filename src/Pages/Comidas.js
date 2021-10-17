import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import RenderRecipes from '../components/RenderRecipes';
import { getRecipes } from '../redux/slices/fetchReceitas';
import Footer from '../components/Footer';
import CategoryButtons from '../components/CategoryButtons';

function Comidas({ title, location: { recipeName } }) {
  const { foods } = useSelector((state) => state.fetchReceitas);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!foods || Object.keys(foods).length === 0) {
      const URL = title === 'Comidas'
        ? 'foods'
        : 'drinks';
      dispatch(getRecipes(URL));
    }
  }, [foods, dispatch, title]);

  return (
    <div>
      <Header title={ title } />
      <CategoryButtons />
      {Object.keys(foods).length > 0
        && <RenderRecipes redirectedFromIngredients={ recipeName } />}
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
