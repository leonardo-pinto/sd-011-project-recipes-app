import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import MainContext from '../../Context/MainContext';
import { getDrinksInitial } from '../../Services/ApiDrink';
import '../../css/Drinks.css';
import LoadingDrink from '../LoadingDrink';

function DrinkCards() {
  const [initialDrinks, setInitialDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { dataDrinks, limit, inputSearch, drinksByCategory } = useContext(MainContext);

  async function fetchDrinksInitial() {
    const drinksInitialAPI = await getDrinksInitial();
    setInitialDrinks(drinksInitialAPI.drinks);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchDrinksInitial();
  }, []);

  console.log(drinksByCategory);

  if (inputSearch) {
    return (
      <div className="card-drinks">
        { !isLoading ? dataDrinks.map((item, index) => index < limit && (
          <Link to={ `/bebidas/${item.idDrink}` }>
            <Card style={ { width: '10rem' } } key={ index }>
              <Card.Img variant="top" src={ item.strDrinkThumb } />
              <Card.Title><h3>{ item.strDrink }</h3></Card.Title>
            </Card>
            <br />
          </Link>
        )) : <LoadingDrink /> }
      </div>
    );
  }

  if (drinksByCategory.length > 0) {
    return (
      <div className="card-drinks">
        { !isLoading ? drinksByCategory.map((drink, index) => index < limit && (
          <Link to={ `/bebidas/${drink.idDrink}` }>
            <Card style={ { width: '10rem' } } key={ index }>
              <Card.Img variant="top" src={ drink.strDrinkThumb } />
              <Card.Title><h3>{ drink.strDrink }</h3></Card.Title>
            </Card>
            <br />
          </Link>
        )) : <LoadingDrink /> }
      </div>
    );
  }

  return (
    <div className="card-drinks">
      { !isLoading ? initialDrinks.map((item, index) => index < limit && (
        <Link to={ `/bebidas/${item.idDrink}` }>
          <Card style={ { width: '10rem' } } key={ index }>
            <Card.Img variant="top" src={ item.strDrinkThumb } />
            <Card.Title><h3>{ item.strDrink }</h3></Card.Title>
          </Card>
          <br />
        </Link>
      )) : <LoadingDrink />}
    </div>
  );
}

export default DrinkCards;
