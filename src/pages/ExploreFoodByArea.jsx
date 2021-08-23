import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/exploreByArea.css';
import {Spinner} from 'reactstrap';
import '../styles/loading.css';

function ExploreFoodByArea() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [recipesByLocal, setRecipesByLocal] = useState([]);

  const maxLengthItems = 12;

  async function fetchCountries() {
    let endPointItems = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const endPointCountries = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    if (selectedCountry.length > 0 && selectedCountry !== 'all') {
      endPointItems = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`;
    }
    const requireItems = await fetch(endPointItems);
    const responseItems = await requireItems.json();
    const dataItems = responseItems.meals;
    const requestCounties = await fetch(endPointCountries);
    const resultCounties = await requestCounties.json();
    const dataCountries = resultCounties.meals;
    setCountries(dataCountries);
    setRecipesByLocal(dataItems);
    setLoading(false);
  }

  function renderRecipesArea(item, index) {
    return (
      <Link
        key={ index }
        to={ `/comidas/${item.idMeal}` }
      >
        <div className="areaCard" data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            src={ item.strMealThumb }
            alt="food_image"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>
            { item.strMeal }
          </p>
        </div>
      </Link>
    );
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchCountries();
  }, [selectedCountry]);

  return (
    <div>
      <Header title="Explorar Origem" searchButton />
      {loading ? <div className="loading"> <Spinner animation="border" variant="primary" className="spinner"/></div> : (
        <div className="exploreArea">
          <select
            onChange={ (e) => setSelectedCountry(e.target.value) }
            data-testid="explore-by-area-dropdown"
          >
            <option>Select Country</option>
            <option value="all" data-testid="All-option">All</option>
            {countries.map((country, index) => (
              <option
                data-testid={ `${country.strArea}-option` }
                key={ index }
                value={ country.strArea }
              >
                {country.strArea}
              </option>))}
          </select>
          <div className="areaCardsAll">
            {recipesByLocal
              .filter((item, index) => index < maxLengthItems).map(renderRecipesArea) }
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ExploreFoodByArea;
