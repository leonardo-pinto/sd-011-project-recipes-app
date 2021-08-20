import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../../components/Header';
import { SearchBarProvider } from '../../context/SearchBar';
import Footer from '../../components/Footer';
import fetchByFilter from '../../services/data';

export default function FoodExplorer() {
  const history = useHistory();
  const [idRandomFood, setIdRandomFood] = useState('');

  useEffect(() => {
    const getRandomFood = async () => {
      const urlToFetch = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const { meals } = await fetchByFilter(urlToFetch);
      setIdRandomFood(meals[0].idMeal);
    };
    getRandomFood();
  }, []);

  return (
    <>
      <SearchBarProvider>
        <Header title="Explorar Comidas" />
      </SearchBarProvider>
      <section className="container-buttons">
        <Button
          style={ { fontSize: '18px' } }
          className="button-style"
          variant="dark"
          size="lg"
          type="button"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </Button>
        <Button
          style={ { fontSize: '18px' } }
          className="button-style"
          variant="dark"
          size="lg"
          data-testid="explore-by-area"
          type="button"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </Button>
        <Button
          style={ { fontSize: '18px' } }
          className="button-style"
          variant="dark"
          size="lg"
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/comidas/${idRandomFood}`) }
        >
          Me Surpreenda!
        </Button>
      </section>
      <Footer />
    </>
  );
}
