import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import HeaderDetails from '../components/HeaderDetails';
import AppContext from '../context/AppContext';
import IngredientDetails from '../components/IngredientDetails';
import Recomendation from '../components/Recomendation';
import ButtonDetails from '../components/ButtonDetails';
import VideoEmbeded from '../components/VideoEmbeded';
import '../styles/details.css';
import {Spinner} from 'reactstrap';
import '../styles/loading.css';

function FoodDetails() {
  const { idDetails, setIdDetails } = useContext(AppContext);
  const details = idDetails[0];
  // console.log('details', idDetails)
  const { id } = useParams();

  async function fetchFoodDetails() {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const request = await fetch(endPoint);
    const response = await request.json();
    const data = response.meals;
    setIdDetails(data);
  }

  useEffect(
    () => { fetchFoodDetails(); }, [],
  );

  if (idDetails.length === 0) return <div className="loading"> <Spinner animation="border" variant="primary" className="spinner"/></div>;

  return (
    <div className="details">
      <img
        className="mainImg"
        data-testid="recipe-photo"
        src={ details.strMealThumb }
        alt="image_of_recipe"
      />
      <HeaderDetails foodOrDrink="Comidas" id={ id } />
      <IngredientDetails />
      <VideoEmbeded />
      <Recomendation foodOrDrink="Comidas" id={ id } />
      <ButtonDetails foodOrDrink="Comidas" id={ id } />
    </div>
  );
}

export default FoodDetails;
