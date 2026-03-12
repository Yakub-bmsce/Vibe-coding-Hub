import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import GameCard from '../components/GameCard';
import FlashcardCarousel from '../components/FlashcardCarousel';
import { addXP, XP_REWARDS } from '../utils/xpSystem';
import '../styles/GameLearningPage.css';

// Random content generators
const generateRandomFlashcards = () => {
  const allFlashcards = [
    { question: 'What is a variable?', answer: 'A container for storing data values that can change during program execution.' },
    { question: 'What is a function?', answer: 'A reusable block of code that performs a specific task when called.' },
    { question: 'What is an array?', answer: 'A data structure that stores multiple values in a single variable.' },
    { question: 'What is a loop?', answer: 'A programming construct that repeats a block of code multiple times.' },
    { question: 'What is recursion?', answer: 'A function that calls itself to solve a problem by breaking it into smaller subproblems.' },
    { question: 'What is an object?', answer: 'A collection of key-value pairs that represent a real-world entity.' },
    { question: 'What is a class?', answer: 'A blueprint for creating objects with predefined properties and methods.' },
    { question: 'What is inheritance?', answer: 'A mechanism where a class can inherit properties and methods from another class.' },
    { question: 'What is an API?', answer: 'Application Programming Interface - a way for different software to communicate.' },
    { question: 'What is async/await?', answer: 'A modern way to handle asynchronous operations in JavaScript.' }
  ];
  
  return allFlashcards.sort(() => Math.random() - 0.5).slice(0, 5);
};

const generateRandomQuiz = () => {
  const allQuestions = [
    {
      question: 'Which keyword is used to declare a constant in JavaScript?',
      options: ['var', 'let', 'const', 'static'],
      correct: 2
    },
    {
      question: 'What does CSS stand for?',
      options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
      correct: 1
    },
    {
      question: 'Which method adds an element to the end of an array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      correct: 0
    },
    {
      question: 'What is the correct syntax for a for loop?',
      options: ['for (i = 0; i < 5)', 'for (let i = 0; i < 5; i++)', 'for i in range(5)', 'foreach (i in 5)'],
      correct: 1
    },
    {
      question: 'Which HTML tag is used for the largest heading?',
      options: ['<head>', '<h6>', '<h1>', '<heading>'],
      correct: 2
    },
    {
      question: 'What does DOM stand for?',
      options: ['Document Object Model', 'Data Object Management', 'Digital Oriented Markup', 'Document Orientation Mode'],
      correct: 0
    }
  ];
  
  return allQuestions.sort(() => Math.random() - 0.5).slice(0, 4);
};

const generateRandomMatching = () => {
  const allPairs = [
    { id: 1, concept: 'Variable', definition: 'Stores data values' },
    { id: 2, concept: 'Function', definition: 'Reusable code block' },
    { id: 3, concept: 'Array', definition: 'Ordered list of values' },
    { id: 4, concept: 'Object', definition: 'Key-value pairs' },
    { id: 5, concept: 'Loop', definition: 'Repeats code' },
    { id: 6, concept: 'Conditional', definition: 'Makes decisions' },
    { id: 7, concept: 'String', definition: 'Text data type' },
    { id: 8, concept: 'Boolean', definition: 'True or false value' }
  ];
  
  return allPairs.sort(() => Math.random() - 0.5).slice(0, 5);
};

const generateRandomCodeCompletion = () => {
  const allChallenges = [
    {
      question: 'Complete the function to add two numbers:',
      code: 'function add(a, b) {\n  return ___;\n}',
      options: ['a + b', 'a - b', 'a * b', 'a / b'],
      correct: 0
    },
    {
      question: 'Complete the array method to filter even numbers:',
      code: 'const evens = numbers.filter(n => n ___ 2 === 0);',
      options: ['*', '/', '%', '+'],
      correct: 2
    },
    {
      question: 'Complete the loop to iterate 5 times:',
      code: 'for (let i = 0; i ___ 5; i++) {\n  console.log(i);\n}',
      options: ['>', '>=', '<', '<='],
      correct: 2
    },
    {
      question: 'Complete the conditional statement:',
      code: 'if (age ___ 18) {\n  console.log("Adult");\n}',
      options: ['<', '<=', '>', '>='],
      correct: 3
    }
  ];
  
  return allChallenges.sort(() => Math.random() - 0.5).slice(0, 3);
};

const generateRandomDragDrop = () => {
  const allChallenges = [
    {
      question: 'Arrange the code to create a function:',
      correctOrder: ['function greet(name) {', '  console.log("Hello " + name);', '}', 'greet("World");']
    },
    {
      question: 'Arrange the code to create an array and loop:',
      correctOrder: ['const numbers = [1, 2, 3];', 'for (let num of numbers) {', '  console.log(num);', '}']
    },
    {
      question: 'Arrange the code to create an if-else statement:',
      correctOrder: ['if (score > 50) {', '  console.log("Pass");', '} else {', '  console.log("Fail");', '}']
    }
  ];
  
  const challenge = allChallenges[Math.floor(Math.random() * allChallenges.length)];
  return {
    ...challenge,
    shuffledOrder: [...challenge.correctOrder].sort(() => Math.random() - 0.5)
  };
};

const GameLearningPage = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Random content state
  const [flashcards, setFlashcards] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [matchingPairs, setMatchingPairs] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [codeCompletionChallenges, setCodeCompletionChallenges] = useState([]);
  const [dragDropChallenge, setDragDropChallenge] = useState(null);
  const [draggedItems, setDraggedItems] = useState([]);

  const games = [
    { id: 1, title: 'Flashcard Memory', icon: '🃏', description: 'Test your knowledge with flashcards', xp: 40, duration: '10 min' },
    { id: 2, title: 'Concept Matching', icon: '🎯', description: 'Match concepts with definitions', xp: 40, duration: '15 min' },
    { id: 3, title: 'Code Completion', icon: '💻', description: 'Complete the code snippets', xp: 40, duration: '20 min' },
    { id: 4, title: 'Timed Quiz', icon: '⏰', description: 'Answer questions before time runs out', xp: 40, duration: '15 min' },
    { id: 5, title: 'Drag & Drop', icon: '🎮', description: 'Arrange code in correct order', xp: 40, duration: '12 min' }
  ];

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setScore(0);
    setCurrentQuestion(0);
    
    // Generate random content for each game
    if (game.id === 1) {
      setFlashcards(generateRandomFlashcards());
    } else if (game.id === 2) {
      const pairs = generateRandomMatching();
      setMatchingPairs(pairs);
      setSelectedConcept(null);
      setMatchedPairs([]);
    } else if (game.id === 3) {
      setCodeCompletionChallenges(generateRandomCodeCompletion());
    } else if (game.id === 4) {
      setQuizQuestions(generateRandomQuiz());
    } else if (game.id === 5) {
      const challenge = generateRandomDragDrop();
      setDragDropChallenge(challenge);
      setDraggedItems(challenge.shuffledOrder);
    }
  };

  const handleQuizAnswer = (selectedIndex) => {
    if (selectedIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
      addXP(XP_REWARDS.QUIZ_PASS);
    }
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz Complete! Score: ${score + (selectedIndex === quizQuestions[currentQuestion].correct ? 1 : 0)}/${quizQuestions.length}`);
      addXP(XP_REWARDS.GAME_WIN);
      setSelectedGame(null);
    }
  };

  const handleMatchClick = (pair, type) => {
    if (type === 'concept') {
      setSelectedConcept(pair);
    } else if (selectedConcept && !matchedPairs.includes(pair.id)) {
      if (selectedConcept.id === pair.id) {
        setMatchedPairs([...matchedPairs, pair.id]);
        setScore(score + 1);
        addXP(10);
        setSelectedConcept(null);
        
        if (matchedPairs.length + 1 === matchingPairs.length) {
          setTimeout(() => {
            alert(`Matching Complete! Score: ${matchedPairs.length + 1}/${matchingPairs.length}`);
            addXP(XP_REWARDS.GAME_WIN);
            setSelectedGame(null);
          }, 500);
        }
      } else {
        setSelectedConcept(null);
      }
    }
  };

  const handleCodeAnswer = (selectedIndex) => {
    if (selectedIndex === codeCompletionChallenges[currentQuestion].correct) {
      setScore(score + 1);
      addXP(XP_REWARDS.QUIZ_PASS);
    }
    
    if (currentQuestion < codeCompletionChallenges.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Code Completion Complete! Score: ${score + (selectedIndex === codeCompletionChallenges[currentQuestion].correct ? 1 : 0)}/${codeCompletionChallenges.length}`);
      addXP(XP_REWARDS.GAME_WIN);
      setSelectedGame(null);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('index'));
    const newItems = [...draggedItems];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    setDraggedItems(newItems);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkDragDropAnswer = () => {
    const isCorrect = JSON.stringify(draggedItems) === JSON.stringify(dragDropChallenge.correctOrder);
    if (isCorrect) {
      alert('Correct! Well done!');
      addXP(XP_REWARDS.GAME_WIN);
      setSelectedGame(null);
    } else {
      alert('Not quite right. Try again!');
    }
  };

  const handleGameComplete = () => {
    addXP(XP_REWARDS.GAME_WIN);
    setSelectedGame(null);
  };

  return (
    <div className="game-page">
      <Navbar />
      <Sidebar />
      
      <main className="game-content">
        <div className="container">
          <h1 className="gradient-text">Learn by Games</h1>
          <p className="page-subtitle">Make learning fun with interactive games</p>

          {!selectedGame ? (
            <div className="games-grid">
              {games.map(game => (
                <GameCard 
                  key={game.id}
                  game={game}
                  onClick={() => handleGameClick(game)}
                />
              ))}
            </div>
          ) : (
            <div className="game-view fade-in">
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedGame(null)}
              >
                ← Back to Games
              </button>

              <div className="game-header">
                <h2>{selectedGame.icon} {selectedGame.title}</h2>
              </div>

              {/* Flashcard Memory Game */}
              {selectedGame.id === 1 && (
                <div className="flashcard-game">
                  <FlashcardCarousel 
                    flashcards={flashcards}
                    onComplete={handleGameComplete}
                  />
                </div>
              )}

              {/* Concept Matching Game */}
              {selectedGame.id === 2 && (
                <div className="matching-game card">
                  <p className="game-instruction">Click a concept, then click its matching definition</p>
                  <div className="matching-score">Matched: {matchedPairs.length}/{matchingPairs.length}</div>
                  
                  <div className="matching-grid">
                    <div className="matching-column">
                      <h3>Concepts</h3>
                      {matchingPairs.map(pair => (
                        <button
                          key={`concept-${pair.id}`}
                          className={`matching-item ${selectedConcept?.id === pair.id ? 'selected' : ''} ${matchedPairs.includes(pair.id) ? 'matched' : ''}`}
                          onClick={() => handleMatchClick(pair, 'concept')}
                          disabled={matchedPairs.includes(pair.id)}
                        >
                          {pair.concept}
                        </button>
                      ))}
                    </div>
                    
                    <div className="matching-column">
                      <h3>Definitions</h3>
                      {matchingPairs.sort(() => Math.random() - 0.5).map(pair => (
                        <button
                          key={`def-${pair.id}`}
                          className={`matching-item ${matchedPairs.includes(pair.id) ? 'matched' : ''}`}
                          onClick={() => handleMatchClick(pair, 'definition')}
                          disabled={matchedPairs.includes(pair.id)}
                        >
                          {pair.definition}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Code Completion Game */}
              {selectedGame.id === 3 && (
                <div className="code-completion-game card">
                  <div className="quiz-progress">
                    Challenge {currentQuestion + 1} of {codeCompletionChallenges.length}
                  </div>
                  <h3>{codeCompletionChallenges[currentQuestion].question}</h3>
                  <pre className="code-block">{codeCompletionChallenges[currentQuestion].code}</pre>
                  <div className="quiz-options">
                    {codeCompletionChallenges[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        className="btn btn-secondary quiz-option"
                        onClick={() => handleCodeAnswer(idx)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="quiz-score">Score: {score}</div>
                </div>
              )}

              {/* Timed Quiz Game */}
              {selectedGame.id === 4 && (
                <div className="quiz-game card">
                  <div className="quiz-progress">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </div>
                  <h3>{quizQuestions[currentQuestion].question}</h3>
                  <div className="quiz-options">
                    {quizQuestions[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        className="btn btn-secondary quiz-option"
                        onClick={() => handleQuizAnswer(idx)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="quiz-score">Score: {score}</div>
                </div>
              )}

              {/* Drag & Drop Game */}
              {selectedGame.id === 5 && dragDropChallenge && (
                <div className="drag-drop-game card">
                  <h3>{dragDropChallenge.question}</h3>
                  <p className="game-instruction">Drag the code lines to arrange them in the correct order</p>
                  
                  <div className="drag-drop-container">
                    {draggedItems.map((item, index) => (
                      <div
                        key={index}
                        className="drag-item"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragOver={handleDragOver}
                      >
                        <span className="drag-handle">☰</span>
                        <code>{item}</code>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    className="btn btn-primary"
                    onClick={checkDragDropAnswer}
                    style={{ marginTop: '24px' }}
                  >
                    Check Answer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GameLearningPage;
