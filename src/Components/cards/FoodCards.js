import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import MainContext from '../../Context/MainContext';
import { getFoodsInitial } from '../../Services/ApiFood';

function FoodCards() {
  const [initialFoods, setInitialFoods] = useState([]);
  const { dataFoods, limit, inputSearch, foodsByCategory } = useContext(MainContext);

  async function fetchFoodsInitial() {
    const foodsInitialAPI = await getFoodsInitial();
    setInitialFoods(foodsInitialAPI.meals);
  }

  useEffect(() => {
    fetchFoodsInitial();
  }, []);

  if (inputSearch) {
    return (
      <div className="card-foods">
        {dataFoods.map((item, index) => index < limit && (
          <Link to={ `/comidas/${item.idMeal}` }>
            <Card style={ { width: '10rem' } } key={ index }>
              <Card.Img variant="top" src={ item.strMealThumb } />
              <Card.Title><h3>{ item.strMeal }</h3></Card.Title>
            </Card>
            <br />
          </Link>
        )) }
      </div>
    );
  }

  if (foodsByCategory.length > 0) {
    return (
      <div className="card-foods">
        {foodsByCategory.map((item, index) => index < limit && (
          <Link to={ `/comidas/${item.idMeal}` }>
            <Card style={ { width: '10rem' } }>
              <Card.Img variant="top" src={ item.strMealThumb } />
              <Card.Title><h3>{ item.strMeal }</h3></Card.Title>
            </Card>
            <br />
          </Link>
        )) }
      </div>
    );
  }

  return (
    <div className="card-foods">
      {initialFoods.map((item, index) => index < limit && (
        <Link to={ `/comidas/${item.idMeal}` }>
          <Card style={ { width: '10rem' } }>
            <Card.Img variant="top" src={ item.strMealThumb } />
            <Card.Title><h3>{ item.strMeal }</h3></Card.Title>
          </Card>
          <br />
        </Link>
      )) }
    </div>
  );
}

export default FoodCards;
