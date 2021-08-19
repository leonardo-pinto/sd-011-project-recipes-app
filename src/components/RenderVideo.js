import React from 'react';
import PropTypes from 'prop-types';

function RenderVideo({ src, title, id }) {
  const url = (src).replace('watch?v=', 'embed/');
  return (
    <div style={ { textAlign: '-webkit-center' } }>
      <iframe
        width="auto"
        height="150"
        src={ url }
        title={ title }
        frameBorder="0"
        allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        data-testid={ `${id}` }
        style={ { borderRadius: '10px' } }
      />
    </div>
  );
}

RenderVideo.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RenderVideo;
