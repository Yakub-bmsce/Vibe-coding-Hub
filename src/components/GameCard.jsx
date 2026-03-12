import React from 'react';
import '../styles/GameCard.css';

const GameCard = ({ game, onClick }) => {
  return (
    <div className="game-card card" onClick={onClick}>
      <div className="game-icon">{game.icon}</div>
      <h3>{game.title}</h3>
      <p>{game.description}</p>
      <div className="game-meta">
        <span>⚡ {game.xp} XP</span>
        <span>⏱️ {game.duration}</span>
      </div>
    </div>
  );
};

export default GameCard;
