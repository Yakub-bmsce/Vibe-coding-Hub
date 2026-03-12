import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import RoadmapNode from '../components/RoadmapNode';
import { generateLesson } from '../api/groqAI';
import { addXP, XP_REWARDS } from '../utils/xpSystem';
import '../styles/RoadmapPage.css';

const RoadmapPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [lessonContent, setLessonContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completedNodes, setCompletedNodes] = useState([0]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('completedRoadmapNodes');
    if (savedProgress) {
      setCompletedNodes(JSON.parse(savedProgress));
    }
  }, []);

  const roadmapNodes = [
    { id: 0, title: 'HTML', icon: '📄', level: 0 },
    { id: 1, title: 'CSS', icon: '🎨', level: 1 },
    { id: 2, title: 'JavaScript', icon: '⚡', level: 2 },
    { id: 3, title: 'Git', icon: '🔀', level: 3 },
    { id: 4, title: 'React', icon: '⚛️', level: 4 },
    { id: 5, title: 'APIs', icon: '🌐', level: 5 },
    { id: 6, title: 'Databases', icon: '🗄️', level: 6 },
    { id: 7, title: 'Full Stack', icon: '🚀', level: 7 }
  ];

  const handleNodeClick = async (node) => {
    setSelectedNode(node);
    setIsLoading(true);
    
    try {
      const content = await generateLesson(node.title);
      setLessonContent(content);
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteNode = () => {
    if (selectedNode) {
      addXP(XP_REWARDS.LESSON_COMPLETE);
      const newCompletedNodes = [...completedNodes, selectedNode.id];
      setCompletedNodes(newCompletedNodes);
      
      // Check if all nodes are completed
      const allNodesCompleted = newCompletedNodes.length === roadmapNodes.length;
      
      if (allNodesCompleted) {
        // Show completion modal
        setShowCompletionModal(true);
      } else {
        // Save progress
        localStorage.setItem('completedRoadmapNodes', JSON.stringify(newCompletedNodes));
      }
      
      setSelectedNode(null);
    }
  };

  const handleResetRoadmap = () => {
    setCompletedNodes([0]); // Reset to only HTML unlocked
    localStorage.removeItem('completedRoadmapNodes'); // Clear saved progress
    setShowCompletionModal(false);
  };

  const isNodeUnlocked = (nodeId) => {
    return nodeId === 0 || completedNodes.includes(nodeId - 1);
  };

  return (
    <div className="roadmap-page">
      <Navbar />
      <Sidebar />
      
      <main className="roadmap-content">
        <div className="container">
          <h1 className="gradient-text">Learning Roadmap</h1>
          <p className="page-subtitle">Follow the path to become a full-stack developer</p>

          {!selectedNode ? (
            <div className="roadmap-container">
              <svg className="roadmap-connections" width="100%" height="100%">
                {roadmapNodes.slice(0, -1).map((node, idx) => {
                  const startX = 150 + (idx % 4) * 200;
                  const startY = 150 + Math.floor(idx / 4) * 250;
                  const endX = 150 + ((idx + 1) % 4) * 200;
                  const endY = 150 + Math.floor((idx + 1) / 4) * 250;
                  
                  return (
                    <line
                      key={idx}
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      className={`connection ${isNodeUnlocked(idx + 1) ? 'active' : ''}`}
                    />
                  );
                })}
              </svg>

              <div className="roadmap-nodes">
                {roadmapNodes.map((node, idx) => (
                  <div 
                    key={node.id}
                    className="node-wrapper"
                    style={{
                      gridColumn: (idx % 4) + 1,
                      gridRow: Math.floor(idx / 4) + 1
                    }}
                  >
                    <RoadmapNode
                      node={{ ...node, completed: completedNodes.includes(node.id) }}
                      onClick={handleNodeClick}
                      isUnlocked={isNodeUnlocked(node.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="lesson-view fade-in">
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedNode(null)}
              >
                ← Back to Roadmap
              </button>

              <div className="lesson-header">
                <h2>{selectedNode.icon} {selectedNode.title}</h2>
              </div>

              {isLoading ? (
                <div className="skeleton-loader">
                  <div className="skeleton" style={{ height: '200px' }}></div>
                </div>
              ) : (
                <div className="lesson-content card">
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{lessonContent}</pre>
                  <button 
                    className="btn btn-primary"
                    onClick={handleCompleteNode}
                  >
                    ✓ Complete & Unlock Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="completion-modal-overlay">
          <div className="completion-modal card">
            <div className="completion-icon">🎉</div>
            <h2>Congratulations!</h2>
            <p>You've completed the entire learning roadmap!</p>
            <p className="completion-message">
              You've mastered: HTML, CSS, JavaScript, Git, React, APIs, Databases, and Full Stack development!
            </p>
            <button 
              className="btn btn-primary"
              onClick={handleResetRoadmap}
            >
              🔄 Start Fresh Journey
            </button>
            <p className="completion-note">
              Note: Each time you restart, you'll get fresh, unique content from our AI tutor!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;
