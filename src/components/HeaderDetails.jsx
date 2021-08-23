import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import '../styles/details.css';

function HeaderDetails({ foodOrDrink, id, index }) {
  const { idDetails } = useContext(AppContext);
  const details = idDetails[0];

  return (
    <div>
      <div className="headerDetail">
        <div>
          <h1 data-testid="recipe-title">
            {foodOrDrink === 'Comidas' ? details.strMeal : details.strDrink }
          </h1>
          <h3 data-testid="recipe-category">
            { foodOrDrink === 'Comidas' ? details.strCategory : details.strAlcoholic }
          </h3>
        </div>
        <div>
          <ShareButton
            foodOrDrinkBtn={ foodOrDrink === 'Comidas' ? 'comidas' : 'bebidas' }
            id={ id }
            index={ index }
          />
          <FavoriteButton
            foodOrDrinkBtn={ foodOrDrink === 'Comidas' ? 'comidas' : 'bebidas' }
            id={ id }
            index={ index }
          />
        </div>

      </div>
    </div>
  );
}

export default HeaderDetails;

HeaderDetails.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  foodOrDrink: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

HeaderDetails.defaultProps = {
  index: 0,
};
