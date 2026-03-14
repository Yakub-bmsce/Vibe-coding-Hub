import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import { getDomainById, getTopicByIds } from '../data/domains';
import { generateTopicExplanation, generateSimplifiedExplanation, generateTopicQuiz } from '../api/groqAI';
import { searchVideos } from '../api/growAPI';
import { addXP } from '../utils/xpSystem';
import '../styles/TopicDetailPage.css';

const TopicDetailPage = () => {
  const { domainName, topicName } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'concepts');
  
  const domain = getDomainById(domainName);
  const topic = getTopicByIds(domainName, topicName);
  
  // Tab content states
  const [explanation, setExplanation] = useState('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (activeTab === 'concepts' && !explanation) {
      loadExplanation();
    } else if (activeTab === 'videos' && videos.length === 0) {
      loadVideos();
    } else if (activeTab === 'games' && !quiz) {
      loadQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const loadExplanation = async () => {
    setIsLoadingExplanation(true);
    try {
      const result = await generateTopicExplanation(topic.name, domain.name);
      setExplanation(result);
    } catch (error) {
      setExplanation('Error loading explanation. Please try again.');
    } finally {
      setIsLoadingExplanation(false);
    }
  };

  const handleSimplify = async () => {
    setIsLoadingExplanation(true);
    try {
      const result = await generateSimplifiedExplanation(topic.name, explanation);
      setExplanation(result);
    } catch (error) {
      console.error('Simplification error:', error);
    } finally {
      setIsLoadingExplanation(false);
    }
  };

  const loadVideos = async () => {
    setIsLoadingVideos(true);
    try {
      const result = await searchVideos(`${topic.name} tutorial for beginners`);
      setVideos(result);
    } catch (error) {
      console.error('Video loading error:', error);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  const loadQuiz = async () => {
    setIsLoadingQuiz(true);
    setUserAnswers({});
    setShowResults(false);
    try {
      const result = await generateTopicQuiz(topic.name, 5);
      console.log('Quiz loaded:', result); // Debug log
      setQuiz(result);
    } catch (error) {
      console.error('Quiz loading error:', error);
      // Set fallback quiz if API fails
      setQuiz([
        {
          question: `What is the main purpose of ${topic.name}?`,
          options: [
            'To solve complex problems',
            'To make development easier',
            'To improve performance',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'This is a sample question. Click "Try New Quiz" to generate AI questions.'
        }
      ]);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (showResults) return; // Don't allow changes after submission
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: optionIndex
    });
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    // Calculate score and award XP
    if (quiz && Array.isArray(quiz)) {
      const correctCount = quiz.filter((q, idx) => userAnswers[idx] === q.correctAnswer).length;
      const xpEarned = correctCount * 10;
      addXP(xpEarned);
    }
  };

  const calculateScore = () => {
    if (!quiz || !Array.isArray(quiz)) return { correct: 0, total: 0 };
    const correct = quiz.filter((q, idx) => userAnswers[idx] === q.correctAnswer).length;
    return { correct, total: quiz.length };
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const getNextTopic = () => {
    const currentIndex = domain.topics.findIndex(t => t.id === topicName);
    if (currentIndex < domain.topics.length - 1) {
      return domain.topics[currentIndex + 1];
    }
    return null;
  };

  const handleNextSection = () => {
    // Move to next tab within the same topic
    const tabs = ['concepts', 'videos', 'games', 'roadmap'];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (currentIndex < tabs.length - 1) {
      // Move to next tab
      const nextTab = tabs[currentIndex + 1];
      changeTab(nextTab);
    } else {
      // If on last tab, move to next topic
      const nextTopic = getNextTopic();
      if (nextTopic) {
        addXP(topic.xp);
        navigate(`/topic/${domainName}/${nextTopic.id}`);
      }
    }
  };

  const getNextSectionName = () => {
    const tabNames = {
      'concepts': 'Videos',
      'videos': 'Games', 
      'games': 'Roadmap',
      'roadmap': getNextTopic() ? getNextTopic().name : 'Complete'
    };
    return tabNames[activeTab];
  };

  if (!domain || !topic) {
    return (
      <div className="topic-detail-page">
        <Navbar />
        <Sidebar />
        <div className="topic-content">
          <div className="error-message">
            <h2>Topic not found</h2>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: domain.name, path: `/domain/${domainName}` },
    { label: topic.name }
  ];

  const nextTopic = getNextTopic();

  return (
    <div className="topic-detail-page">
      <Navbar />
      <Sidebar />
      <div className="topic-content">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="topic-header">
          <div className="topic-icon">{topic.icon}</div>
          <h1>{topic.name}</h1>
          <p className="topic-description">{topic.description}</p>
          <div className="topic-badges">
            <span className={`difficulty-badge ${topic.difficulty.toLowerCase()}`}>
              {topic.difficulty}
            </span>
            <span className="xp-badge">+{topic.xp} XP</span>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs-nav">
            <button 
              className={`tab-btn ${activeTab === 'concepts' ? 'active' : ''}`}
              onClick={() => changeTab('concepts')}
            >
              📚 Concepts
            </button>
            <button 
              className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => changeTab('videos')}
            >
              🎥 Videos
            </button>
            <button 
              className={`tab-btn ${activeTab === 'games' ? 'active' : ''}`}
              onClick={() => changeTab('games')}
            >
              🎮 Games
            </button>
            <button 
              className={`tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
              onClick={() => changeTab('roadmap')}
            >
              🗺️ Roadmap
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'concepts' && (
              <div className="concepts-tab">
                {isLoadingExplanation ? (
                  <div className="loading">Loading explanation...</div>
                ) : (
                  <>
                    <div className="explanation-content">
                      <pre>{explanation}</pre>
                    </div>
                    <div className="concept-actions">
                      <button className="btn btn-secondary" onClick={handleSimplify}>
                        🤔 I still don't understand - Simplify more
                      </button>
                      <button className="btn btn-success" onClick={handleNextSection}>
                        ✅ I understood - Next: {getNextSectionName()}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="videos-tab">
                {isLoadingVideos ? (
                  <div className="loading">Loading videos...</div>
                ) : (
                  <>
                    {selectedVideo && (
                      <div className="video-player">
                        <iframe
                          width="100%"
                          height="500"
                          src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                          title={selectedVideo.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <button className="btn btn-secondary" onClick={() => setSelectedVideo(null)}>
                          ← Back to video list
                        </button>
                      </div>
                    )}
                    {!selectedVideo && (
                      <>
                        <div className="videos-grid">
                          {videos.map((video, idx) => (
                            <div key={idx} className="video-card" onClick={() => setSelectedVideo(video)}>
                              <img src={video.thumbnail} alt={video.title} />
                              <h3>{video.title}</h3>
                              <p>{video.channel}</p>
                            </div>
                          ))}
                        </div>
                        <div className="concept-actions" style={{ marginTop: '2rem' }}>
                          <button className="btn btn-success" onClick={handleNextSection}>
                            ✅ I understood - Next: {getNextSectionName()}
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {activeTab === 'games' && (
              <div className="games-tab">
                {isLoadingQuiz ? (
                  <div className="loading">Loading quiz...</div>
                ) : (
                  <>
                    {quiz && Array.isArray(quiz) && quiz.length > 0 ? (
                      <div className="quiz-container">
                        <h2>🎯 Topic Quiz</h2>
                        {showResults && (
                          <div className="quiz-score">
                            <h3>Your Score: {calculateScore().correct} / {calculateScore().total}</h3>
                            <p>You earned {calculateScore().correct * 10} XP! 🎉</p>
                          </div>
                        )}
                        
                        {quiz.map((question, qIdx) => (
                          <div key={qIdx} className="quiz-question">
                            <h3>Question {qIdx + 1}</h3>
                            <p className="question-text">{question.question}</p>
                            
                            <div className="quiz-options">
                              {question.options && question.options.map((option, oIdx) => {
                                const isSelected = userAnswers[qIdx] === oIdx;
                                const isCorrect = question.correctAnswer === oIdx;
                                const showCorrect = showResults && isCorrect;
                                const showIncorrect = showResults && isSelected && !isCorrect;
                                
                                return (
                                  <button
                                    key={oIdx}
                                    className={`quiz-option ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showIncorrect ? 'incorrect' : ''}`}
                                    onClick={() => handleAnswerSelect(qIdx, oIdx)}
                                    disabled={showResults}
                                  >
                                    <span className="option-letter">{String.fromCharCode(65 + oIdx)}</span>
                                    <span className="option-text">{option}</span>
                                    {showCorrect && <span className="option-icon">✓</span>}
                                    {showIncorrect && <span className="option-icon">✗</span>}
                                  </button>
                                );
                              })}
                            </div>
                            
                            {showResults && question.explanation && (
                              <div className="question-explanation">
                                <strong>Explanation:</strong> {question.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                        
                        <div className="quiz-actions">
                          {!showResults ? (
                            <button 
                              className="btn btn-primary" 
                              onClick={handleSubmitQuiz}
                              disabled={Object.keys(userAnswers).length !== quiz.length}
                            >
                              Submit Quiz ({Object.keys(userAnswers).length}/{quiz.length} answered)
                            </button>
                          ) : (
                            <button className="btn btn-primary" onClick={loadQuiz}>
                              🔄 Try New Quiz
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="quiz-error">
                        <p>Unable to load quiz. Please try again.</p>
                        <button className="btn btn-primary" onClick={loadQuiz}>
                          🔄 Generate Quiz
                        </button>
                        {quiz && <pre style={{color: '#e9b3ff', fontSize: '0.8rem', marginTop: '1rem'}}>Debug: {JSON.stringify(quiz, null, 2)}</pre>}
                      </div>
                    )}
                    
                    {showResults && (
                      <div className="concept-actions" style={{ marginTop: '2rem' }}>
                        <button className="btn btn-success" onClick={handleNextSection}>
                          ✅ I understood - Next: {getNextSectionName()}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div className="roadmap-tab">
                <div className="roadmap-header">
                  <h2>📍 {topic.name} Learning Roadmap</h2>
                  <p>Step-by-step path to master {topic.name}</p>
                </div>

                {topic.roadmap && topic.roadmap.length > 0 ? (
                  <div className="roadmap-timeline">
                    {topic.roadmap.map((step, idx) => (
                      <div key={idx} className={`roadmap-item ${idx === 0 ? 'current' : ''}`}>
                        <div className="roadmap-connector"></div>
                        <div className="roadmap-node-wrapper">
                          <div className="roadmap-node-circle">
                            <span className="node-number">{idx + 1}</span>
                          </div>
                          <div className="roadmap-node-content">
                            <h4>{step}</h4>
                            <div className="node-meta">
                              <span className="node-xp">+{Math.round(topic.xp / topic.roadmap.length)} XP</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'rgba(233,179,255,0.7)', textAlign: 'center', padding: '2rem' }}>
                    Roadmap coming soon for this topic.
                  </p>
                )}

                {nextTopic && (
                  <div className="roadmap-next-section">
                    <h3>After mastering {topic.name}, explore next:</h3>
                    <div className="next-topic-highlight">
                      <div className="next-topic-icon">{nextTopic.icon}</div>
                      <div className="next-topic-info">
                        <h4>{nextTopic.name}</h4>
                        <p>{nextTopic.description}</p>
                        <div className="next-topic-meta">
                          <span className={`difficulty-tag ${nextTopic.difficulty.toLowerCase()}`}>{nextTopic.difficulty}</span>
                          <span className="xp-tag">Earn {nextTopic.xp} XP</span>
                        </div>
                      </div>
                      <button className="btn btn-success" onClick={handleNextSection}>
                        Start {nextTopic.name} →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="topic-footer">
          <button className="btn btn-secondary" onClick={() => navigate(`/domain/${domainName}`)}>
            ← Back to {domain.name}
          </button>
          <button className="btn btn-primary" onClick={handleNextSection}>
            Next: {getNextSectionName()} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailPage;
