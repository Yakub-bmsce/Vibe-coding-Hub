import React from 'react';
import '../styles/LessonCard.css';

const LessonCard = ({ lesson, onClick }) => {
  return (
    <div className="lesson-card card" onClick={onClick}>
      <div className="lesson-icon">{lesson.icon}</div>
      <h3>{lesson.title}</h3>
      <p>{lesson.description}</p>
      <div className="lesson-meta">
        <span className="lesson-duration">⏱️ {lesson.duration}</span>
        <span className="lesson-xp">⚡ {lesson.xp} XP</span>
      </div>
      {lesson.completed && <div className="lesson-badge">✓ Completed</div>}
    </div>
  );
};

export default LessonCard;
