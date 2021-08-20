import React, { useContext, useEffect, useState } from 'react';
// import { DropdownButton, Dropdown } from 'react-bootstrap';
import { SearchBarContext } from '../context/SearchBar';
import fetchByFilter from '../services/data';

export default function FoodExplorerByCountry() {
  const [areas, setAreas] = useState([]);
  const [filterOrigin, setFilterOrigin] = useState('All');
  const { setDataValues } = useContext(SearchBarContext);

  useEffect(() => {
    const getCategories = async () => {
      const urlToFetch = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const { meals } = await fetchByFilter(urlToFetch);
      setAreas(meals);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getRecipes = async () => {
      const URL_ALL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const URL_FILTER = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filterOrigin}`;
      const URL_FETCH = filterOrigin !== 'All' ? URL_FILTER : URL_ALL;
      const { meals } = await fetchByFilter(URL_FETCH);
      setDataValues(meals);
    };
    getRecipes();
  }, [filterOrigin]);

  const handleChangeArea = ({ target }) => {
    setFilterOrigin(target.value);
  };

  // por enquanto, deixar select e options por conta do teste
  return (
    <section className="container-explore-by-area">
      <label htmlFor="explore-by-area" className="container-explore-by-area-buttons">
        <select
          style={ { width: '130px' } }
          data-testid="explore-by-area-dropdown"
          id="explore-by-area"
          onChange={ handleChangeArea }
        >
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          { areas && areas.length > 0 && areas.map(({ strArea }) => (
            <option
              data-testid={ `${strArea}-option` }
              key={ strArea }
              value={ strArea }
            >
              { strArea }
            </option>))}
        </select>
        {/* <DropdownButton
          variant="dark"
          title={ filterOrigin }
          data-testid="explore-by-area-dropdown"
          id="explore-by-area"
          value={ filterOrigin }
        >
          <Dropdown.Item
            data-testid="All-option"
            as="button"
            value="All"
            onClick={ handleChangeArea }
          >
            All
          </Dropdown.Item>
          { areas && areas.length > 0 && areas.map(({ strArea }) => (
            <Dropdown.Item
              data-testid={ `${strArea}-option` }
              as="button"
              key={ strArea }
              value={ strArea }
              onClick={ handleChangeArea }
            >
              { strArea }
            </Dropdown.Item>))}
        </DropdownButton> */}
      </label>
    </section>
  );
}
