import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RenderOrigin() {
  const selectOptionsURL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const { data: selectOptions } = useFetch(selectOptionsURL);
  const [selectedArea, setSelectedArea] = useState('All');
  const [currentData, setCurrentData] = useState(null);

  const fetchFoods = async () => {
    const url = selectedArea === 'All'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
    const resp = await fetch(url);
    const result = await resp.json();
    setCurrentData(result);
  };

  useEffect(() => {
    fetchFoods();
  }, [selectedArea]);

  const limitCards = 12;

  if (selectOptions === null || currentData === null) return <p>Loading...</p>;

  return (
    <div>
      <label htmlFor="recipe-origin">
        <select
          id="recipe-origin"
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => setSelectedArea(e.target.value) }
        >
          <option data-testid="All-option" value="All">All</option>
          {selectOptions.meals.map(({ strArea }, index) => (
            <option
              data-testid={ `${strArea}-option` }
              value={ strArea }
              key={ index }
            >
              {strArea}
            </option>
          ))}
        </select>
      </label>
      {currentData.meals.slice(0, limitCards)
        .map(({ strMeal, strMealThumb, idMeal }, index) => (
          <Link key={ index } to={ `/comidas/${idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
                width="50px"
              />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default RenderOrigin;
