import React from 'react';
import PropTypes from "prop-types";

const VideoPlayer = ({videoUrl}) => {
  return (
    <div className="rounded-lg overflow-hidden w-9/12 lg:mt-10 mb-10 lg:mb-0">
      <video
        width="100%"
        controls
        src={videoUrl}/>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired
}

export default VideoPlayer;