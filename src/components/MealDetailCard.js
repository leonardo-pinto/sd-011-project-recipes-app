import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ButtonToProgress from './ButtonToProgress';
import ButtonShare from './ButtonShare';
import Recommended from './Recommended';
import RenderVideo from './RenderVideo';
import ButtonFavorite from './ButtonFavorite';
import '../App.css';

function MealDetailCard() {
  const [mealDetail, setMealDetail] = useState([]);
  const [rec, setRec] = useState([]);
  const [min, setMin] = useState([]);

  const path = window.location.pathname.split('/')[1] === 'comidas';
  const foodToDetail = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const drinkRecommend = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const getUrlMeal = async () => {
      const meal = await fetch(`${foodToDetail}${window.location.pathname
        .split('/')[2]}`);
      const response = meal.json().then((res) => setMealDetail(res.meals[0]));
      return response;
    };

    const getRecomend = async () => {
      const recomend = await fetch(`${drinkRecommend}`);
      const resRecom = recomend.json().then((res) => setRec(res.drinks));
      const magicN = 20;
      setMin(parseInt(Math.random() * (magicN - 0) + 0, 10));
      return resRecom;
    };

    getRecomend();
    getUrlMeal();
  }, [path]);

  const styleDiv = {
    borderRadius: '0 0 15px 15px',
    backgroundColor: 'rgba(3, 127, 140, .3)',
  };

  const {
    // idMeal,
    strArea,
    strCategory,
    strInstructions,
    strMeal,
    strMealThumb,
    strYoutube,
  } = mealDetail;

  // console.log((rec.meals));

  const objIngred = Object.entries(mealDetail).map((e) => {
    if (e[0].includes('strIngredient') && e[1] !== '') {
      return e[1];
    }
    return undefined;
  }).filter((i) => i !== undefined);

  const objMeasure = Object.entries(mealDetail).map((e) => {
    if (e[0].includes('strMeasure') && e[1] !== ' ') {
      return e[1];
    }
    return undefined;
  }).filter((i) => i !== undefined);

  return (
    <>
      <Card style={ { width: '95%', margin: '15px auto' } }>
        <Card.Body>
          <Card.Img
            style={ { boxShadow: '0 0 5px' } }
            data-testid="recipe-photo"
            width="150px"
            src={ strMealThumb }
            alt="tumb"
          />
          <div
            style={ styleDiv }
          >
            <Card.Text
              className="card-details-text"
              data-testid="recipe-title"
            >
              {strMeal}
            </Card.Text>
            <Card.Text
              className="card-details-text"
            >
              {strArea}
            </Card.Text>
            <Card.Text
              className="card-details-text"
              data-testid="recipe-category"
            >
              {strCategory}
            </Card.Text>
          </div>
          <div className="card-details-share">
            <ButtonFavorite objData={ mealDetail } />
            <ButtonShare path={ window.location.href } testid="share-btn" />
          </div>
          <div
            style={ { borderRadius: '15px', backgroundColor: 'rgba(3, 127, 140, .3)' } }
          >
            <h4 style={ { padding: '0 10px 0 10px' } }>Ingredients</h4>
            <div style={ { textAlign: 'center', fontStyle: 'italic' } }>
              { objIngred.map((e, i) => (
                <div
                  style={ { marginBottom: '0' } }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ i }
                >
                  { objMeasure[i] ? `${e} - ${objMeasure[i]}` : `${e}`}
                </div>
              ))}
            </div>
          </div>
          <h4 style={ { padding: '0 10px 0 10px' } }>Instructions</h4>
          <h6
            style={ { textAlign: 'justify' } }
            data-testid="instructions"
          >
            {strInstructions}
          </h6>
          { strYoutube
            && <RenderVideo
              src={ strYoutube }
              title={ `Recipe ${strMeal}` }
              id="video"
            /> }
        </Card.Body>
        <Recommended value={ rec } type="meal" min={ min } />
        {/* <Card.Text style={ { margin: '30px 0 30px 0' } }>
        </Card.Text> */}
      </Card>
      <ButtonToProgress data={ mealDetail } />
    </>
  );
}

export default MealDetailCard;
