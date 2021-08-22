import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import copy from 'clipboard-copy';
import { copyLink } from '../Services/ApiDrink';
import MainContext from '../Context/MainContext';

function ItemsFoodDetails() {
  const { idFoodsAPI, show,
    setShow } = useContext(MainContext);

  const getYoutubeUrl = ({ strYoutube }) => {
    if (strYoutube) {
      const youtubeVideoId = strYoutube.split('?v=', 2)[1];
      const iframeLink = `https://www.youtube.com/embed/${youtubeVideoId}`;
      return iframeLink;
    }
  };

  return (
    <div>
      <Card style={ { width: '15rem' } } className="recipe-foods-cards">
        <Card.Img
          variant="top"
          src={ idFoodsAPI.strMealThumb }
          alt={ `Comida selecionada: ${idFoodsAPI.strMeal}` }
          data-testid="recipe-photo"
        />
        <Card.Body>
          <Card.Title data-testid="recipe-title"><p>{idFoodsAPI.strMeal}</p></Card.Title>
          <Card.Text data-testid="recipe-category">
            {' '}
            {idFoodsAPI.strCategory}
            {' '}
            <p>{ show && 'Copy link!'}</p>
            {' '}
          </Card.Text>
          <Button
            variant="light"
            data-testid="share-btn"
            onClick={ () => copyLink(copy, setShow, 'comidas', idFoodsAPI.idMeal) }
          >
            Share
          </Button>
        </Card.Body>
      </Card>
      <br />
      <iframe
        className="video"
        data-testid="video"
        width="280"
        src={ getYoutubeUrl(idFoodsAPI) }
        title="YouTube video player"
        allowFullScreen
      />
    </div>
  );
}

export default ItemsFoodDetails;
