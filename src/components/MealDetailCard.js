import React, { useEffect, useState } from 'react';
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
    <div>
      <div className="card">
        <div>
          <img
            className="card-img-top"
            style={ { boxShadow: '0px 0px 5px' } }
            data-testid="recipe-photo"
            width="150px"
            src={ strMealThumb }
            alt="tumb"
          />
        </div>
        <div
          className="card-body"
          style={ { borderRadius: '0 0 5px 5px', textAlign: 'center' } }
        >
          <h5 className="card-details-text" data-testid="recipe-title">{strMeal}</h5>
          <h6 className="card-details-text">{strArea}</h6>
          <p className="card-details-text" data-testid="recipe-category">{strCategory}</p>
        </div>
      </div>
      <div className="card-details-share">
        <ButtonFavorite objData={ mealDetail } />
        <ButtonShare path={ window.location.href } testid="share-btn" />
      </div>
      <h4 style={ { padding: '0 10px 0 10px' } }>Ingredients</h4>
      <div style={ { paddingLeft: '40px', fontStyle: 'italic' } }>
        <table>
          <tbody>
            <tr>
              {/* <td> */}
              { objIngred.map((e, i) => {
                if (e !== null) {
                  return (
                    <div
                      data-testid={ `${i}-ingredient-name-and-measure` }
                      key={ i }
                    >
                      {objMeasure[i] !== (undefined || '')
                        ? `${e} - ${objMeasure[i]}` : `${e}`}
                    </div>
                  );
                }
                return undefined;
              }) }
              {/* </td> */}
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h4 style={ { padding: '0 10px 0 10px' } }>Instructions</h4>
        <h6
          style={ { padding: '0 20px 0 20px', textAlign: 'justify' } }
          data-testid="instructions"
        >
          {strInstructions}
        </h6>
      </div>
      <div>
        { strYoutube
          && <RenderVideo
            src={ strYoutube }
            title={ `Recipe ${strMeal}` }
            id="video"
          /> }
      </div>
      <div className="card-recommend">
        <Recommended value={ rec } type="meal" min={ min } />
      </div>
      <div style={ { marginLeft: '22%', marginRight: 'auto' } }>
        <ButtonToProgress data={ mealDetail } />
      </div>
    </div>
  );
}

export default MealDetailCard;
