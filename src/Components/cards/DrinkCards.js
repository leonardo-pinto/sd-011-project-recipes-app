import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import MainContext from '../../Context/MainContext';
import { getDrinksInitial } from '../../Services/ApiDrink';
import '../../css/Drinks.css';

function DrinkCards() {
  const [initialDrinks, setInitialDrinks] = useState([]);
  const { dataDrinks, limit, inputSearch, drinksByCategory } = useContext(MainContext);

  async function fetchDrinksInitial() {
    const drinksInitialAPI = await getDrinksInitial();
    setInitialDrinks(drinksInitialAPI.drinks);
  }

  useEffect(() => {
    fetchDrinksInitial();
  }, []);

  console.log(drinksByCategory);

  if (inputSearch) {
    return (
      <div className="card-drinks">
        { dataDrinks.map((item, index) => index < limit && (
          <Link to={ `/bebidas/${item.idDrink}` }>
            <Card style={ { width: '10rem' } } key={ index }>
              <Card.Img variant="top" src={ item.strDrinkThumb } />
              <Card.Title><h3>{ item.strDrink }</h3></Card.Title>
            </Card>
            <br />
          </Link>
        )) }
      </div>
    );
  }

  if (drinksByCategory.length > 0) {
    return (
      <div className="card-drinks">
        { drinksByCategory.map((drink, index) => index < limit && (
          <Link to={ `/bebidas/${drink.idDrink}` }>
            <Card style={ { width: '10rem' } } key={ index }>
              <Card.Img variant="top" src={ drink.strDrinkThumb } />
              <Card.Title><h3>{ drink.strDrink }</h3></Card.Title>
            </Card>
            <br />
          </Link>
        )) }
      </div>
    );
  }

  return (
    <div className="card-drinks">
      { initialDrinks.map((item, index) => index < limit && (
        <Link to={ `/bebidas/${item.idDrink}` }>
          <Card style={ { width: '10rem' } } key={ index }>
            <Card.Img variant="top" src={ item.strDrinkThumb } />
            <Card.Title><h3>{ item.strDrink }</h3></Card.Title>
          </Card>
          <br />
        </Link>
      )) }
    </div>
  );
}

export default DrinkCards;
