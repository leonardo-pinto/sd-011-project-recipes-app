import React, { useContext } from 'react';
import YouTube from 'react-youtube';
import DetailsContext from '../../context/DetailsContext';

function Video() {
  const { recipe } = useContext(DetailsContext);

  return (
    <section data-testid="video">
      <h6>Video:</h6>
      <YouTube
        videoId={ recipe.strYoutube.split('=')[1] }
        title={ recipe.strMeal }
        opts={ { height: '150', width: '200' } }
      />
    </section>
  );
}

export default Video;
