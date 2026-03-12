import React, { useState } from 'react';
import '../styles/Flashcard.css';

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`flip-card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front card">
          <div className="card-label">Question</div>
          <div className="card-content">
            <h3>{question}</h3>
          </div>
          <div className="card-hint">Click to reveal answer</div>
        </div>
        <div className="flip-card-back card">
          <div className="card-label">Answer</div>
          <div className="card-content">
            <p>{answer}</p>
          </div>
          <div className="card-hint">Click to see question</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
