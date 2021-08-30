import React, { useState, useEffect } from 'react';
import { Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFoodsInitial } from '../../../Services/ApiFood';
import HeaderExpFoodsOrigin from '../../../Components/headers/HeaderExploreFoodsOrigin';
import LowerMenu from '../../../Components/footer/LowerMenu';
import '../../../css/Origin.css';

const Origen = () => {
  const [originList, setOriginList] = useState([]);
  const [mealsByOrigin, setMealsByOrigin] = useState([]);
  const [originSelected, setOriginSelected] = useState('');

  const handleChange = (event) => {
    setOriginSelected(event.target.value);
  };

  useEffect(() => {
    const getAPI = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setOriginList(meals);
    };
    getAPI();
  }, [setOriginList]);

  useEffect(() => {
    const getAPI = async () => {
      if (originSelected !== 'All') {
        const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${originSelected}`;
        const { meals } = await fetch(endpoint).then((data) => data.json());
        setMealsByOrigin(meals);
      } else if (originSelected === 'All') {
        const foodsInitialAPI = await getFoodsInitial();
        setMealsByOrigin(foodsInitialAPI.meals);
      }
    };
    getAPI();
  }, [originSelected]);

  const magicNumber = 12;

  return (
    <div className="food-origin-page">
      <HeaderExpFoodsOrigin />
      <section>
        <Form.Select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => handleChange(e) }
        >
          <option>Open this select origin</option>
          { originList && originList.map(({ strArea }, index) => (
            <option
              key={ index }
              data-testid={ `${strArea}-option` }
              value={ strArea }
            >
              { strArea }
            </option>
          ))}
          <option value="All" data-testid="All-option">All</option>
        </Form.Select>
      </section>
      <section>
        { mealsByOrigin && mealsByOrigin.slice(0, magicNumber).map((food, i) => (
          <Link key={ food.idMeal } to={ `/comidas/${food.idMeal}` }>
            <Card style={ { width: '18rem' } }>
              <Card.Img variant="top" src={ food.strMealThumb } />
              <Card.Body>
                <Card.Title>{ food.strMeal }</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        )) }
        <br />
        <br />
      </section>
      <footer>
        <LowerMenu />
      </footer>
    </div>
  );
};

export default Origen;
