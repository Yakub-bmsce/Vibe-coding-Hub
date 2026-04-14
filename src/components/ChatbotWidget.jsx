import React, { useState, useRef, useEffect, useCallback } from 'react';
import { chatWithAI } from '../api/groqAI';
import '../styles/ChatbotWidget.css';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Drag state
  const [pos, setPos] = useState({ x: null, y: null }); // null = use CSS default
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const toggleRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Init default position bottom-right
  useEffect(() => {
    setPos({ x: window.innerWidth - 88, y: window.innerHeight - 88 });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  // ── Mouse drag ──────────────────────────────────────────────────────────
  const onMouseDown = (e) => {
    e.preventDefault();
    const rect = toggleRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragging(true);
  };

  const onMouseMove = useCallback((e) => {
    if (!dragging) return;
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

  // ── Touch drag ──────────────────────────────────────────────────────────
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = toggleRef.current.getBoundingClientRect();
    dragOffset.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    setDragging(true);
  };

  const onTouchMove = useCallback((e) => {
    if (!dragging) return;
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

  // ── Chat ────────────────────────────────────────────────────────────────
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await chatWithAI(input, history);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  // Window position relative to toggle
  const toggleStyle = pos.x !== null ? {
    left: pos.x,
    top: pos.y,
    bottom: 'auto',
    right: 'auto',
  } : {};

  const windowStyle = pos.x !== null ? {
    left: Math.min(pos.x, window.innerWidth - (window.innerWidth < 480 ? window.innerWidth - 24 : 420) - 12),
    top: Math.max(8, pos.y - 560),
    bottom: 'auto',
    right: 'auto',
  } : {};

  return (
    <>
      <button
        ref={toggleRef}
        className={`chatbot-toggle ${dragging ? 'dragging' : ''}`}
        style={toggleStyle}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={() => !dragging && setIsOpen(o => !o)}
        title="Drag me · Click to chat"
        aria-label="AI Tutor"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-window fade-in" style={windowStyle}>
          <div className="chatbot-header">
            <h3>✨ AI Tutor</h3>
            <p>Ask me anything about programming!</p>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="chatbot-welcome">
                <p>👋 Hi! I'm your AI tutor. How can I help you today?</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-content">{msg.content}</div>
              </div>
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
              placeholder="Type your question..."
              rows="2"
            />
            <button onClick={handleSend} disabled={!input.trim() || isLoading} className="btn-send">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
