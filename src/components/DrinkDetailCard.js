import React, { useEffect, useState } from 'react';
import ButtonFavorite from './ButtonFavorite';
import ButtonShare from './ButtonShare';
import ButtonToProgress from './ButtonToProgress';
import Recommended from './Recommended';
import RenderVideo from './RenderVideo';
import '../App.css';

function DrinkDetailCard() {
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [rec, setRec] = useState([]);
  const [min, setMin] = useState([]);

  const path = window.location.pathname.split('/')[2];

  const drinkToDetail = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const foodRecomend = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const getUrlDrink = async () => {
      const drink = await fetch(`${drinkToDetail}${window.location.pathname
        .split('/')[2]}`);
      const response = drink.json().then((res) => setDrinkDetail(res.drinks[0]));
      return response;
    };

    const getRecomend = async () => {
      const recomend = await fetch(`${foodRecomend}`);
      const resRecom = recomend.json().then((res) => setRec(res.meals));
      const magicN = 20;
      setMin(parseInt(Math.random() * (magicN - 0) + 0, 10));
      return resRecom;
    };

    getRecomend();
    getUrlDrink();
  }, [path]);

  const {
    // idDrink,
    strAlcoholic,
    strCategory,
    strInstructions,
    strDrink,
    strDrinkThumb,
    strYoutube,
  } = drinkDetail;

  const objIngred = Object.entries(drinkDetail).map((e) => {
    if (e[0].includes('strIngredient') && (e[1] !== null)) {
      return e[1];
    }
    return undefined;
  }).filter((i) => i !== undefined);

  const objMeasure = Object.entries(drinkDetail).map((e) => {
    if (e[0].includes('strMeasure') && (e[1] !== null)) {
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
            src={ strDrinkThumb }
            alt="tumb"
          />
        </div>
        <div
          className="card-body"
          style={ { borderRadius: '0 0 5px 5px', textAlign: 'center' } }
        >
          <h5 className="card-details-text" data-testid="recipe-title">{strDrink}</h5>
          <h6 className="card-details-text">{strCategory}</h6>
          <p
            className="card-details-text"
            data-testid="recipe-category"
          >
            {strAlcoholic}
          </p>
        </div>
      </div>
      <div className="card-details-share">
        <ButtonFavorite objData={ drinkDetail } />
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
                      { objMeasure[i] !== (undefined || '')
                        ? `${e} - ${objMeasure[i]}` : `${e}` }
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
      { strYoutube
        && <RenderVideo
          src={ strYoutube }
          title={ `Recipe ${strDrink}` }
          id="video"
        /> }
      <div className="card-recommend">
        <Recommended value={ rec } type="drink" min={ min } />
      </div>
      <div style={ { marginLeft: '22%', marginRight: 'auto' } }>
        <ButtonToProgress data={ drinkDetail } />
      </div>
    </div>
  );
}

export default DrinkDetailCard;
