import React, { useState, useRef, useEffect, useCallback } from 'react';
import { chatWithAI } from '../api/groqAI';
import { getStreak } from '../utils/progressTracker';
import '../styles/ChatbotWidget.css';

const DOMAINS = [
  '💻 Programming', '🌐 Web Dev', '🧮 DSA', '🗄️ Databases',
  '🤖 ML / AI', '☁️ DevOps', '🔐 Security', '📱 Mobile Dev'
];

const getStreakNudge = () => {
  const streak = getStreak();
  if (streak === 0) return "😤 Bro you didn't study today! Open a topic and let's go!";
  if (streak === 1) return "🔥 Day 1 streak! Keep it going tomorrow!";
  return `🔥 ${streak} day streak! You're on fire, keep it up!`;
};

const WELCOME = {
  role: 'assistant',
  content: '__welcome__'
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Drag state
  const [pos, setPos] = useState({ x: null, y: null });
  const [dragging, setDragging] = useState(false);
  const didDrag = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const toggleRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setPos({ x: window.innerWidth - 88, y: window.innerHeight - 88 });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Mouse drag ──
  const onMouseDown = (e) => {
    e.preventDefault();
    didDrag.current = false;
    const rect = toggleRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragging(true);
  };

  const onMouseMove = useCallback((e) => {
    if (!dragging) return;
    didDrag.current = true;
    const x = Math.min(Math.max(0, e.clientX - dragOffset.current.x), window.innerWidth - 64);
    const y = Math.min(Math.max(0, e.clientY - dragOffset.current.y), window.innerHeight - 64);
    setPos({ x, y });
  }, [dragging]);

  const onMouseUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, onMouseMove, onMouseUp]);

  // ── Touch drag ──
  const onTouchStart = (e) => {
    didDrag.current = false;
    const touch = e.touches[0];
    const rect = toggleRef.current.getBoundingClientRect();
    dragOffset.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    setDragging(true);
  };

  const onTouchMove = useCallback((e) => {
    if (!dragging) return;
    didDrag.current = true;
    e.preventDefault();
    const touch = e.touches[0];
    const x = Math.min(Math.max(0, touch.clientX - dragOffset.current.x), window.innerWidth - 64);
    const y = Math.min(Math.max(0, touch.clientY - dragOffset.current.y), window.innerHeight - 64);
    setPos({ x, y });
  }, [dragging]);

  const onTouchEnd = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [dragging, onTouchMove, onTouchEnd]);

  // ── Chat ──
  const handleSend = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setIsLoading(true);
    try {
      const history = messages
        .filter(m => m.content !== '__welcome__')
        .map(m => ({ role: m.role, content: m.content }));
      const response = await chatWithAI(msg, history);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Try again!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const toggleStyle = pos.x !== null ? { left: pos.x, top: pos.y, bottom: 'auto', right: 'auto' } : {};
  const windowStyle = pos.x !== null ? {
    left: Math.min(pos.x, window.innerWidth - (window.innerWidth < 500 ? window.innerWidth - 16 : 400) - 8),
    top: Math.max(8, pos.y - 580),
    bottom: 'auto', right: 'auto',
  } : {};

  return (
    <>
      <button
        ref={toggleRef}
        className={`chatbot-toggle ${dragging ? 'dragging' : ''}`}
        style={toggleStyle}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={() => { if (!didDrag.current) setIsOpen(o => !o); }}
        title="AI Study Buddy"
        aria-label="AI Study Buddy"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div className="chatbot-window" style={windowStyle}>
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <span className="chatbot-avatar">🤖</span>
              <div>
                <h3>AI Study Buddy</h3>
                <span className="chatbot-status">● Online</span>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              msg.content === '__welcome__' ? (
                <div key={idx} className="chatbot-welcome-block">
                  <div className="message assistant">
                    <div className="message-content">
                      👋 Hey! I'm your <strong>AI Study Buddy</strong>.<br />
                      How can I help you today?
                    </div>
                  </div>

                  <div className="streak-nudge">
                    {getStreakNudge()}
                  </div>

                  <p className="domain-prompt">Pick a topic to get started:</p>
                  <div className="domain-chips">
                    {DOMAINS.map((d, i) => (
                      <button key={i} className="domain-chip" onClick={() => handleSend(`Tell me about ${d.replace(/^[^ ]+ /, '')}`)}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={idx} className={`message ${msg.role}`}>
                  <div className="message-content">{msg.content}</div>
                </div>
              )
            ))}

            {isLoading && (
              <div className="message assistant">
                <div className="message-content typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              rows="2"
            />
            <button onClick={() => handleSend()} disabled={!input.trim() || isLoading} className="btn-send">➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
