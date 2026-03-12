import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import LessonCard from '../components/LessonCard';
import { generateLesson, simplifyExplanation } from '../api/groqAI';
import { addXP, XP_REWARDS } from '../utils/xpSystem';
import { trackLessonProgress } from '../utils/progressTracker';
import '../styles/ConceptLearningPage.css';

const ConceptLearningPage = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonContent, setLessonContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const lessons = [
    { id: 1, title: 'Variables & Data Types', icon: '📦', description: 'Learn about storing data', duration: '15 min', xp: 50 },
    { id: 2, title: 'Functions', icon: '⚙️', description: 'Reusable code blocks', duration: '20 min', xp: 50 },
    { id: 3, title: 'Loops', icon: '🔄', description: 'Repeat code efficiently', duration: '25 min', xp: 50 },
    { id: 4, title: 'Arrays', icon: '📊', description: 'Store multiple values', duration: '20 min', xp: 50 },
    { id: 5, title: 'Objects', icon: '🎯', description: 'Complex data structures', duration: '30 min', xp: 50 },
    { id: 6, title: 'Recursion', icon: '♻️', description: 'Functions calling themselves', duration: '35 min', xp: 50 },
    { id: 7, title: 'Async/Await', icon: '⏳', description: 'Handle asynchronous code', duration: '30 min', xp: 50 },
    { id: 8, title: 'APIs', icon: '🌐', description: 'Connect to external services', duration: '40 min', xp: 50 }
  ];

  const handleLessonClick = async (lesson) => {
    setSelectedLesson(lesson);
    setIsLoading(true);
    setShowQuiz(false);
    
    try {
      const content = await generateLesson(lesson.title);
      setLessonContent(content);
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimplify = async () => {
    if (!selectedLesson || !lessonContent) return;
    
    setIsLoading(true);
    try {
      const simplified = await simplifyExplanation(selectedLesson.title, lessonContent);
      setLessonContent(simplified);
    } catch (error) {
      console.error('Error simplifying:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteLesson = () => {
    if (selectedLesson) {
      addXP(XP_REWARDS.LESSON_COMPLETE);
      trackLessonProgress(selectedLesson.id, true);
      setShowQuiz(true);
    }
  };

  return (
    <div className="concept-page">
      <Navbar />
      <Sidebar />
      
      <main className="concept-content">
        <div className="container">
          <h1 className="gradient-text">Learn by Concepts</h1>
          <p className="page-subtitle">Master programming concepts step by step</p>

          {!selectedLesson ? (
            <div className="lessons-grid">
              {lessons.map(lesson => (
                <LessonCard 
                  key={lesson.id}
                  lesson={lesson}
                  onClick={() => handleLessonClick(lesson)}
                />
              ))}
            </div>
          ) : (
            <div className="lesson-view fade-in">
              <button 
                className="btn btn-secondary back-btn"
                onClick={() => setSelectedLesson(null)}
              >
                ← Back to Lessons
              </button>

              <div className="lesson-header">
                <h2>{selectedLesson.icon} {selectedLesson.title}</h2>
              </div>

              {isLoading ? (
                <div className="skeleton-loader">
                  <div className="skeleton" style={{ height: '200px', marginBottom: '16px' }}></div>
                  <div className="skeleton" style={{ height: '150px', marginBottom: '16px' }}></div>
                  <div className="skeleton" style={{ height: '100px' }}></div>
                </div>
              ) : (
                <div className="lesson-content card">
                  <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {lessonContent}
                  </pre>

                  <div className="lesson-actions">
                    <button 
                      className="btn btn-secondary"
                      onClick={handleSimplify}
                    >
                      🤔 I still don't understand
                    </button>
                    
                    <button 
                      className="btn btn-primary"
                      onClick={handleCompleteLesson}
                    >
                      ✓ Complete Lesson
                    </button>
                  </div>
                </div>
              )}

              {showQuiz && (
                <div className="quiz-section card">
                  <h3>🎯 Quick Quiz</h3>
                  <p>Great job completing the lesson! You earned {XP_REWARDS.LESSON_COMPLETE} XP!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ConceptLearningPage;
