import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TopicCard.css';

const TopicCard = ({ topic, domainId }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const handleClick = () => {
    navigate(`/topic/${domainId}/${topic.id}`);
  };

  return (
    <div className="topic-card card" onClick={handleClick}>
      <div className="topic-icon">{topic.icon}</div>
      <h3>{topic.name}</h3>
      <p>{topic.description}</p>
      <div className="topic-badges">
        <span 
          className="difficulty-badge" 
          style={{ backgroundColor: getDifficultyColor(topic.difficulty) }}
        >
          {topic.difficulty}
        </span>
        <span className="xp-badge">
          ⚡ {topic.xp} XP
        </span>
      </div>
    </div>
  );
};

export default TopicCard;
