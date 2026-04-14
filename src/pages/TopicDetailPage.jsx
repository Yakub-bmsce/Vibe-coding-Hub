import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import { getDomainById, getTopicByIds } from '../data/domains';
import { generateTopicExplanation, generateSimplifiedExplanation, generateLesson } from '../api/groqAI';
import { searchVideos } from '../api/growAPI';
import { addXP, XP_REWARDS } from '../utils/xpSystem';
import '../styles/TopicDetailPage.css';

// ── Games Hub ─────────────────────────────────────────────────────────────────
const GAME_LIST = [
  { id: 'flashcard', title: 'Flashcard Memory', icon: '🃏', description: 'Test your knowledge with flashcards', xp: 40, duration: '10 min' },
  { id: 'matching',  title: 'Concept Matching', icon: '🎯', description: 'Match concepts with definitions',    xp: 40, duration: '15 min' },
  { id: 'code',      title: 'Code Completion',  icon: '💻', description: 'Complete the code snippets',        xp: 40, duration: '20 min' },
  { id: 'timed',     title: 'Timed Quiz',        icon: '⏰', description: 'Answer questions before time runs out', xp: 40, duration: '15 min' },
  { id: 'dragdrop',  title: 'Drag & Drop',       icon: '🎮', description: 'Arrange code in correct order',    xp: 40, duration: '12 min' },
];

const FLASHCARDS = [
  { q: 'What is a variable?',   a: 'A container for storing data values.' },
  { q: 'What is a function?',   a: 'A reusable block of code that performs a specific task.' },
  { q: 'What is an array?',     a: 'A data structure that stores multiple values.' },
  { q: 'What is a loop?',       a: 'A construct that repeats a block of code.' },
  { q: 'What is recursion?',    a: 'A function that calls itself to solve a problem.' },
];

const QUIZ_QS = [
  { q: 'Which keyword declares a constant in JS?', opts: ['var','let','const','static'], ans: 2 },
  { q: 'What does CSS stand for?', opts: ['Computer Style Sheets','Cascading Style Sheets','Creative Style Sheets','Colorful Style Sheets'], ans: 1 },
  { q: 'Which method adds to end of array?', opts: ['push()','pop()','shift()','unshift()'], ans: 0 },
  { q: 'What does DOM stand for?', opts: ['Document Object Model','Data Object Management','Digital Oriented Markup','Document Orientation Mode'], ans: 0 },
];

const MATCH_PAIRS = [
  { id:1, concept:'Variable',   def:'Stores data values' },
  { id:2, concept:'Function',   def:'Reusable code block' },
  { id:3, concept:'Array',      def:'Ordered list of values' },
  { id:4, concept:'Object',     def:'Key-value pairs' },
  { id:5, concept:'Loop',       def:'Repeats code' },
];

const CODE_QS = [
  { q:'Complete: function add(a,b){ return ___; }', code:'function add(a, b) {\n  return ___;\n}', opts:['a+b','a-b','a*b','a/b'], ans:0 },
  { q:'Filter even numbers: numbers.filter(n => n ___ 2 === 0)', code:'numbers.filter(n => n ___ 2 === 0)', opts:['*','/','%','+'], ans:2 },
  { q:'Loop 5 times: for(let i=0; i ___ 5; i++)', code:'for (let i = 0; i ___ 5; i++) {}', opts:['>','>=','<','<='], ans:2 },
];

const DRAG_CHALLENGE = {
  q: 'Arrange the code to create a function:',
  correct: ['function greet(name) {', '  console.log("Hello " + name);', '}', 'greet("World");']
};

const GamesHub = ({ topicName, onNextSection, getNextSectionName }) => {
  const [activeGame, setActiveGame] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  // Flashcard state
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);

  // Quiz / Timed state
  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);

  // Matching state
  const [shuffledDefs] = useState(() => [...MATCH_PAIRS].sort(() => Math.random() - 0.5));
  const [selConcept, setSelConcept] = useState(null);
  const [matched, setMatched] = useState([]);

  // Code completion state
  const [cIdx, setCIdx] = useState(0);
  const [cScore, setCScore] = useState(0);
  const [cDone, setCDone] = useState(false);

  // Drag & drop state
  const [items, setItems] = useState(() => [...DRAG_CHALLENGE.correct].sort(() => Math.random() - 0.5));
  const [ddResult, setDdResult] = useState(null);

  // Timer for timed quiz
  useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) { handleTimedAnswer(-1); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerActive, timeLeft]);

  const startGame = (game) => {
    setActiveGame(game);
    setGameComplete(false);
    setFcIndex(0); setFcFlipped(false);
    setQIndex(0); setQScore(0); setQDone(false);
    setSelConcept(null); setMatched([]);
    setCIdx(0); setCScore(0); setCDone(false);
    setItems([...DRAG_CHALLENGE.correct].sort(() => Math.random() - 0.5));
    setDdResult(null);
    if (game.id === 'timed') { setTimeLeft(15); setTimerActive(true); }
  };

  const finishGame = (xp = XP_REWARDS.GAME_WIN) => {
    addXP(xp);
    setGameComplete(true);
    setTimerActive(false);
  };

  // Timed quiz answer
  const handleTimedAnswer = (idx) => {
    setTimerActive(false);
    const correct = idx === QUIZ_QS[qIndex].ans;
    const newScore = qScore + (correct ? 1 : 0);
    if (qIndex < QUIZ_QS.length - 1) {
      setQScore(newScore);
      setQIndex(i => i + 1);
      setTimeLeft(15);
      setTimerActive(true);
    } else {
      setQScore(newScore);
      setQDone(true);
      finishGame(newScore * 10);
    }
  };

  // Code completion answer
  const handleCodeAnswer = (idx) => {
    const correct = idx === CODE_QS[cIdx].ans;
    const newScore = cScore + (correct ? 1 : 0);
    if (cIdx < CODE_QS.length - 1) {
      setCScore(newScore);
      setCIdx(i => i + 1);
    } else {
      setCScore(newScore);
      setCDone(true);
      finishGame(newScore * 10);
    }
  };

  // Matching click
  const handleMatchConcept = (pair) => setSelConcept(pair);
  const handleMatchDef = (pair) => {
    if (!selConcept) return;
    if (selConcept.id === pair.id) {
      const newMatched = [...matched, pair.id];
      setMatched(newMatched);
      setSelConcept(null);
      if (newMatched.length === MATCH_PAIRS.length) finishGame(50);
    } else {
      setSelConcept(null);
    }
  };

  // Drag & drop
  const handleDragStart = (e, i) => e.dataTransfer.setData('idx', i);
  const handleDrop = (e, i) => {
    e.preventDefault();
    const from = parseInt(e.dataTransfer.getData('idx'));
    const arr = [...items];
    const [item] = arr.splice(from, 1);
    arr.splice(i, 0, item);
    setItems(arr);
  };
  const checkDragDrop = () => {
    const ok = JSON.stringify(items) === JSON.stringify(DRAG_CHALLENGE.correct);
    setDdResult(ok);
    if (ok) finishGame(40);
  };

  if (!activeGame) {
    return (
      <div className="games-hub">
        <h2 className="games-hub-title">🎮 Choose a Game — {topicName}</h2>
        <p className="games-hub-sub">Pick any game to practice what you've learned</p>
        <div className="games-hub-grid">
          {GAME_LIST.map(g => (
            <div key={g.id} className="game-hub-card" onClick={() => startGame(g)}>
              <div className="ghc-icon">{g.icon}</div>
              <h3>{g.title}</h3>
              <p>{g.description}</p>
              <div className="ghc-meta">
                <span>⚡ {g.xp} XP</span>
                <span>🕐 {g.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="game-active-wrap">
      <div className="game-active-header">
        <button className="btn btn-secondary" onClick={() => setActiveGame(null)}>← Back to Games</button>
        <h3>{activeGame.icon} {activeGame.title}</h3>
      </div>

      {gameComplete && (
        <div className="game-complete-banner">
          <h3>🎉 Game Complete! +{activeGame.xp} XP earned</h3>
          <div className="concept-actions">
            <button className="btn btn-secondary" onClick={() => startGame(activeGame)}>🔄 Play Again</button>
            <button className="btn btn-success" onClick={onNextSection}>✅ Next: {getNextSectionName()} →</button>
          </div>
        </div>
      )}

      {!gameComplete && (
        <>
          {/* ── Flashcard Memory ── */}
          {activeGame.id === 'flashcard' && (
            <div className="fc-game">
              <p className="game-sub">{fcIndex + 1} / {FLASHCARDS.length}</p>
              <div className={`fc-card ${fcFlipped ? 'flipped' : ''}`} onClick={() => setFcFlipped(f => !f)}>
                <div className="fc-front"><p>{FLASHCARDS[fcIndex].q}</p><span className="fc-hint">Tap to reveal</span></div>
                <div className="fc-back"><p>{FLASHCARDS[fcIndex].a}</p></div>
              </div>
              <div className="concept-actions" style={{marginTop:'1.5rem'}}>
                {fcFlipped && fcIndex < FLASHCARDS.length - 1 && (
                  <button className="btn btn-primary" onClick={() => { setFcIndex(i=>i+1); setFcFlipped(false); }}>Next Card →</button>
                )}
                {fcFlipped && fcIndex === FLASHCARDS.length - 1 && (
                  <button className="btn btn-success" onClick={() => finishGame(40)}>✅ Done!</button>
                )}
              </div>
            </div>
          )}

          {/* ── Timed Quiz ── */}
          {activeGame.id === 'timed' && !qDone && (
            <div className="tq-game card">
              <div className="tq-header">
                <span>Q {qIndex+1}/{QUIZ_QS.length}</span>
                <span className={`tq-timer ${timeLeft <= 5 ? 'danger' : ''}`}>⏰ {timeLeft}s</span>
                <span>Score: {qScore}</span>
              </div>
              <h3>{QUIZ_QS[qIndex].q}</h3>
              <div className="quiz-options">
                {QUIZ_QS[qIndex].opts.map((o, i) => (
                  <button key={i} className="quiz-option btn btn-secondary" onClick={() => handleTimedAnswer(i)}>{o}</button>
                ))}
              </div>
            </div>
          )}

          {/* ── Concept Matching ── */}
          {activeGame.id === 'matching' && (
            <div className="match-game card">
              <p className="game-sub">Matched: {matched.length} / {MATCH_PAIRS.length} — Click a concept then its definition</p>
              <div className="match-grid">
                <div className="match-col">
                  <h4>Concepts</h4>
                  {MATCH_PAIRS.map(p => (
                    <button key={p.id}
                      className={`match-btn ${selConcept?.id===p.id?'sel':''} ${matched.includes(p.id)?'done':''}`}
                      onClick={() => !matched.includes(p.id) && handleMatchConcept(p)}
                      disabled={matched.includes(p.id)}>
                      {p.concept}
                    </button>
                  ))}
                </div>
                <div className="match-col">
                  <h4>Definitions</h4>
                  {shuffledDefs.map(p => (
                    <button key={p.id}
                      className={`match-btn ${matched.includes(p.id)?'done':''}`}
                      onClick={() => !matched.includes(p.id) && handleMatchDef(p)}
                      disabled={matched.includes(p.id)}>
                      {p.def}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Code Completion ── */}
          {activeGame.id === 'code' && !cDone && (
            <div className="code-game card">
              <p className="game-sub">Challenge {cIdx+1}/{CODE_QS.length} · Score: {cScore}</p>
              <h3>{CODE_QS[cIdx].q}</h3>
              <pre className="code-block">{CODE_QS[cIdx].code}</pre>
              <div className="quiz-options">
                {CODE_QS[cIdx].opts.map((o,i) => (
                  <button key={i} className="quiz-option btn btn-secondary" onClick={() => handleCodeAnswer(i)}>{o}</button>
                ))}
              </div>
            </div>
          )}

          {/* ── Drag & Drop ── */}
          {activeGame.id === 'dragdrop' && (
            <div className="dd-game card">
              <h3>{DRAG_CHALLENGE.q}</h3>
              <p className="game-sub">Drag lines to arrange in correct order</p>
              <div className="dd-list">
                {items.map((item, i) => (
                  <div key={i} className="dd-item" draggable
                    onDragStart={e => handleDragStart(e, i)}
                    onDrop={e => handleDrop(e, i)}
                    onDragOver={e => e.preventDefault()}>
                    <span className="dd-handle">⠿</span>
                    <code>{item}</code>
                  </div>
                ))}
              </div>
              {ddResult === false && <p className="dd-wrong">❌ Not quite — try again!</p>}
              <button className="btn btn-primary" style={{marginTop:'1rem'}} onClick={checkDragDrop}>Check Answer ✓</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

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
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Next sub-topic toggle state
  const [showNextSubTopic, setShowNextSubTopic] = useState(false);
  const [currentRoadmapStep, setCurrentRoadmapStep] = useState(0);
  const [subTopicExplanation, setSubTopicExplanation] = useState('');
  const [isLoadingSubTopic, setIsLoadingSubTopic] = useState(false);

  useEffect(() => {
    if (activeTab === 'concepts' && !explanation) {
      loadExplanation();
    } else if (activeTab === 'videos' && videos.length === 0) {
      loadVideos();
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

  // Load AI explanation for a specific roadmap sub-topic
  const loadSubTopicExplanation = async (stepName) => {
    setIsLoadingSubTopic(true);
    setSubTopicExplanation('');
    try {
      const result = await generateLesson(`${stepName} in ${topic.name}`);
      setSubTopicExplanation(result);
    } catch (e) {
      setSubTopicExplanation('Could not load explanation. Please try again.');
    } finally {
      setIsLoadingSubTopic(false);
    }
  };

  const handleOpenSubTopic = (stepIndex) => {
    setCurrentRoadmapStep(stepIndex);
    setShowNextSubTopic(true);
    loadSubTopicExplanation(topic.roadmap[stepIndex]);
  };

  const handleSubTopicUnderstood = () => {
    if (currentRoadmapStep < topic.roadmap.length - 1) {
      const next = currentRoadmapStep + 1;
      setCurrentRoadmapStep(next);
      loadSubTopicExplanation(topic.roadmap[next]);
    } else {
      setShowNextSubTopic(false);
    }
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

                    {/* ── Sub-topic roadmap toggle ── */}
                    {topic.roadmap && topic.roadmap.length > 0 && (
                      <div className="subtopic-section">
                        <div className="subtopic-header-row">
                          <h3>📖 Learn Sub-Topics of {topic.name}</h3>
                          <p>Master each concept step by step before moving on</p>
                        </div>
                        <div className="subtopic-steps">
                          {topic.roadmap.map((step, idx) => (
                            <button
                              key={idx}
                              className={`subtopic-pill ${currentRoadmapStep === idx && showNextSubTopic ? 'active' : ''}`}
                              onClick={() => handleOpenSubTopic(idx)}
                            >
                              <span className="subtopic-num">{idx + 1}</span>
                              <span>{step}</span>
                            </button>
                          ))}
                        </div>

                        {showNextSubTopic && (
                          <div className="subtopic-panel">
                            <div className="subtopic-panel-header">
                              <h4>📚 {topic.roadmap[currentRoadmapStep]}</h4>
                              <button className="subtopic-close" onClick={() => setShowNextSubTopic(false)}>✕</button>
                            </div>
                            {isLoadingSubTopic ? (
                              <div className="loading">Loading explanation for {topic.roadmap[currentRoadmapStep]}...</div>
                            ) : (
                              <>
                                <div className="subtopic-explanation">
                                  <pre>{subTopicExplanation}</pre>
                                </div>
                                <div className="concept-actions">
                                  <button className="btn btn-secondary" onClick={() => loadSubTopicExplanation(topic.roadmap[currentRoadmapStep])}>
                                    🤔 Explain differently
                                  </button>
                                  {currentRoadmapStep < topic.roadmap.length - 1 ? (
                                    <button className="btn btn-success" onClick={handleSubTopicUnderstood}>
                                      ✅ Got it — Next: {topic.roadmap[currentRoadmapStep + 1]} →
                                    </button>
                                  ) : (
                                    <button className="btn btn-success" onClick={() => setShowNextSubTopic(false)}>
                                      ✅ All sub-topics done!
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}

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
                <GamesHub topicName={topic.name} onNextSection={handleNextSection} getNextSectionName={getNextSectionName} />
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
