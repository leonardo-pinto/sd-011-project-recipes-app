import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LowerMenu from '../../../Components/footer/LowerMenu';
import HeaderExplore from '../../../Components/headers/HeaderExploreDrinks';
import '../../../css/ExplorerDrinks.css';

const ExplorerDrinks = () => {
  const [randowDrink, setRandoDrink] = useState([]);

  useEffect(() => {
    const getAPIById = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setRandoDrink(drinks[0].idDrink);
    };
    getAPIById();
  }, [setRandoDrink]);

  return (
    <div className="explore-drink-page">
      <HeaderExplore />
      <section>
        <Link to="/explorar/bebidas/ingredientes">
          <Button type="button" variant="light" data-testid="explore-by-ingredient">
            For Ingredients
          </Button>
        </Link>
        <Link to={ `/bebidas/${randowDrink}` }>
          <Button type="button" variant="light" data-testid="explore-surprise">
            Surprise-me!
          </Button>
        </Link>
      </section>
      <footer>
        <LowerMenu />
      </footer>
    </div>
  );
};

export default ExplorerDrinks;
