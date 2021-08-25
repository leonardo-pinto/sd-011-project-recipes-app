import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchBarContext } from '../context/SearchBar';
import Cards from './Cards';
import fetchByFilter from '../services/data';

export default function CardsList(props) {
  const { dataValues } = useContext(SearchBarContext);
  const { fetchType, ingredient, styleHeight } = props;
  const [renderArray, setRenderArray] = useState([]);
  const MAX_CARDS = 12;

  useEffect(() => {
  }, [dataValues]);

  useEffect(() => {
    const getRecipesByCategory = async () => {
      const urlToFetch = `https://www.${fetchType}.com/api/json/v1/1/filter.php?i=${ingredient}`;
      const recipesFromApi = await fetchByFilter(urlToFetch);
      const newRecipes = Object.values(recipesFromApi)[0];
      setRenderArray(newRecipes);
    };
    getRecipesByCategory();
  }, [dataValues, ingredient]);

  if (ingredient && ingredient.length > 0) {
    return (
      <div
        style={ { marginTop: '175px', paddingBottom: '60px' } }
      >
        { renderArray.slice(0, MAX_CARDS).map((eachRecipe, index) => (<Cards
          recipe={ eachRecipe }
          type={ fetchType }
          index={ index }
          key={ index }
        />
        ))}
      </div>
    );
  }
  if (dataValues && dataValues.length > 0) {
    return (
      <div
        style={ { marginTop: styleHeight ? '127px' : '175px', paddingBottom: '60px' } }
      >
        { dataValues.slice(0, MAX_CARDS).map((eachRecipe1, index1) => (<Cards
          recipe={ eachRecipe1 }
          type={ fetchType }
          index={ index1 }
          key={ index1 }
        />
        ))}
      </div>
    );
  }

  return (
    <div
      style={ {
        marginTop: styleHeight ? '127px' : '175px',
        textAlign: 'center',
      } }
    >
      Não há itens.
    </div>);
}

CardsList.propTypes = {
  fetchType: PropTypes.string,
}.isRequired;
