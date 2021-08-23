import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

import '../styles/details.css';
import videoIcon from '../images/VectorvideoIcon.svg';

function VideoEmbeded() {
  const { idDetails } = useContext(AppContext);
  const url = idDetails && idDetails[0].strYoutube;
  const videoID = url && url.split('watch?v=')[1];
  console.log('videUrl', url);
  console.log('videOdetails', videoID);
  return (
    <div className="video-responsive" data-testid="video">
      <div>
        <img src={ videoIcon } alt="icon" />
        <span>Video</span>
      </div>
      <iframe
        src={ `https://www.youtube.com/embed/${videoID}` }
        frameBorder="0"
        allow="accelerometer;
        autoplay; clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

export default VideoEmbeded;
