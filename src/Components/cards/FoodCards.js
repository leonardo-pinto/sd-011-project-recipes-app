import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import MainContext from '../../Context/MainContext';
import { getFoodsInitial } from '../../Services/ApiFood';
import Loading from '../Loading';

function FoodCards() {
  const [initialFoods, setInitialFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { dataFoods, limit, inputSearch, foodsByCategory } = useContext(MainContext);

  async function fetchFoodsInitial() {
    const foodsInitialAPI = await getFoodsInitial();
    setInitialFoods(foodsInitialAPI.meals);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchFoodsInitial();
  }, []);

  if (inputSearch) {
    return (
      <div className="card-foods">
        { !isLoading ? dataFoods.map((item, index) => index < limit && (
          <Link to={ `/comidas/${item.idMeal}` }>
            <Card style={ { width: '10rem' } } key={ index }>
              <Card.Img variant="top" src={ item.strMealThumb } />
              <Card.Title><h3>{ item.strMeal }</h3></Card.Title>
            </Card>
            <br />
          </Link>
        )) : <Loading /> }
      </div>
    );
  }

  if (foodsByCategory.length > 0) {
    return (
      <div className="card-foods">
        { !isLoading ? foodsByCategory.map((item, index) => index < limit && (
          <Link to={ `/comidas/${item.idMeal}` }>
            <Card style={ { width: '10rem' } }>
              <Card.Img variant="top" src={ item.strMealThumb } />
              <Card.Title><h3>{ item.strMeal }</h3></Card.Title>
            </Card>
            <br />
          </Link>
        )) : <Loading /> }
      </div>
    );
  }

  return (
    <div className="card-foods">
      { !isLoading ? initialFoods.map((item, index) => index < limit && (
        <Link to={ `/comidas/${item.idMeal}` }>
          <Card style={ { width: '10rem' } }>
            <Card.Img variant="top" src={ item.strMealThumb } />
            <Card.Title><h3>{ item.strMeal }</h3></Card.Title>
          </Card>
          <br />
        </Link>
      )) : <Loading />}
    </div>
  );
}

export default FoodCards;
