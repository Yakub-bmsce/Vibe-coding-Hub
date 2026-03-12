import React from 'react';
import '../styles/RoadmapNode.css';

const RoadmapNode = ({ node, onClick, isUnlocked }) => {
  return (
    <div 
      className={`roadmap-node ${isUnlocked ? 'unlocked' : 'locked'} ${node.completed ? 'completed' : ''}`}
      onClick={() => isUnlocked && onClick(node)}
    >
      <div className="node-icon">{node.icon}</div>
      <div className="node-title">{node.title}</div>
      {!isUnlocked && <div className="lock-icon">🔒</div>}
      {node.completed && <div className="check-icon">✓</div>}
    </div>
  );
};

export default RoadmapNode;
