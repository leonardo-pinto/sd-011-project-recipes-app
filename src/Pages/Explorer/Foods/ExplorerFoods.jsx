import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderExploreFoods from '../../../Components/headers/HeaderExploreFoods';
import LowerMenu from '../../../Components/footer/LowerMenu';
import '../../../css/ExploreFoods.css';

const ExplorerFoods = () => {
  const [randowMeam, setRandoMeal] = useState([]);

  useEffect(() => {
    const getAPIById = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setRandoMeal(meals[0].idMeal);
    };
    getAPIById();
  }, [setRandoMeal]);

  return (
    <div className="explore-food-page">
      <HeaderExploreFoods />
      <section>
        <Link to="/explorar/comidas/ingredientes">
          <Button
            variant="light"
            type="button"
            data-testid="explore-by-ingredient"
          >
            For ingredients
          </Button>
        </Link>
        <Link to="/explorar/comidas/area">
          <Button
            variant="light"
            type="button"
            data-testid="explore-by-area"
          >
            For origin local
          </Button>
        </Link>
        <Link to={ `/comidas/${randowMeam}` }>
          <Button
            variant="light"
            type="button"
            data-testid="explore-surprise"
          >
            Surprese-me!
          </Button>
        </Link>
      </section>
      <footer>
        <LowerMenu />
      </footer>
    </div>
  );
};

export default ExplorerFoods;
