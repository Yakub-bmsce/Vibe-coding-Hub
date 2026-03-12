import React, { useState, useEffect } from 'react';
import { generateFlashcard } from '../api/flashcardGenerator';
import '../styles/FlashcardCarousel.css';

const FlashcardCarousel = ({ flashcards: initialFlashcards, onComplete }) => {
  const [flashcards, setFlashcards] = useState(initialFlashcards || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [totalViewed, setTotalViewed] = useState(0);

  // Generate initial cards if none provided
  useEffect(() => {
    if (flashcards.length === 0) {
      generateInitialCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateInitialCards = async () => {
    setIsGenerating(true);
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const card = await generateFlashcard('programming');
      cards.push(card);
    }
    setFlashcards(cards);
    setIsGenerating(false);
  };

  const generateNextCard = async () => {
    setIsGenerating(true);
    const newCard = await generateFlashcard('programming');
    setFlashcards(prev => [...prev, newCard]);
    setIsGenerating(false);
  };

  const handleCardClick = async () => {
    if (!isFlipped) {
      // First click - flip to show answer
      setIsFlipped(true);
      setTotalViewed(totalViewed + 1);
      
      // Auto-advance to next card after 1.5 seconds
      setTimeout(async () => {
        // Check if we need to generate more cards
        if (currentIndex >= flashcards.length - 2) {
          await generateNextCard();
        }
        
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
      }, 1500);
    }
  };

  const handleNext = async () => {
    // Check if we need to generate more cards
    if (currentIndex >= flashcards.length - 2) {
      await generateNextCard();
    }
    
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleStop = () => {
    if (onComplete) {
      onComplete();
    }
  };

  if (flashcards.length === 0 && isGenerating) {
    return (
      <div className="flashcard-carousel">
        <div className="generating-message">
          <div className="spinner"></div>
          <p>Generating flashcards...</p>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="flashcard-carousel">
      <div className="carousel-progress">
        <div className="progress-text">
          Card {currentIndex + 1} • {totalViewed} viewed • ∞ Unlimited
        </div>
        <div className="progress-info">
          <span className="info-badge">🎯 Keep learning!</span>
          <button className="btn-stop" onClick={handleStop}>
            Stop & Complete
          </button>
        </div>
      </div>

      <div 
        className={`flashcard-single ${isFlipped ? 'flipped' : ''} ${isGenerating ? 'generating' : ''}`}
        onClick={handleCardClick}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="card-label">QUESTION</div>
            <div className="card-content">
              <h2>{currentCard?.question || 'Loading...'}</h2>
            </div>
            <div className="card-hint">👆 Click to reveal answer</div>
          </div>
          <div className="flashcard-back">
            <div className="card-label">ANSWER</div>
            <div className="card-content">
              <p>{currentCard?.answer || 'Loading...'}</p>
            </div>
            <div className="card-hint">✨ Moving to next card...</div>
          </div>
        </div>
      </div>

      {isGenerating && (
        <div className="generating-indicator">
          <div className="spinner-small"></div>
          <span>Generating next card...</span>
        </div>
      )}

      <div className="carousel-controls">
        <button 
          className="btn btn-secondary carousel-btn"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>
        <div className="carousel-stats">
          <span className="stat-item">📚 {totalViewed} cards learned</span>
        </div>
        <button 
          className="btn btn-secondary carousel-btn"
          onClick={handleNext}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default FlashcardCarousel;
