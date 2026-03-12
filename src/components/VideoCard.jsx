import React from 'react';
import '../styles/VideoCard.css';

const VideoCard = ({ video, onClick }) => {
  return (
    <div className="video-card card" onClick={onClick}>
      <div className="video-thumbnail">
        <img src={video.thumbnail} alt={video.title} />
        <div className="play-overlay">▶</div>
      </div>
      <div className="video-info">
        <h4>{video.title}</h4>
        <p className="video-channel">{video.channel}</p>
      </div>
    </div>
  );
};

export default VideoCard;
