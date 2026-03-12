import React, { useState, useRef, useEffect, useCallback } from 'react';
import { chatWithAI } from '../api/groqAI';
import '../styles/ChatbotWidget.css';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ left: null, top: 100, right: 24, bottom: null });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await chatWithAI(input, conversationHistory);
      const aiMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.chatbot-header')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !chatWindowRef.current) return;
    
    e.preventDefault();
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    const rect = chatWindowRef.current.getBoundingClientRect();
    const newLeft = rect.left + deltaX;
    const newTop = rect.top + deltaY;
    
    // Keep within bounds
    const maxLeft = window.innerWidth - 420;
    const maxTop = window.innerHeight - 650;
    
    const boundedLeft = Math.max(0, Math.min(newLeft, maxLeft));
    const boundedTop = Math.max(0, Math.min(newTop, maxTop));
    
    setPosition({
      left: boundedLeft,
      top: boundedTop,
      right: null,
      bottom: null
    });
    
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      <button 
        className="chatbot-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        title="AI Tutor"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="chatbot-window fade-in" 
          style={{ 
            left: position.left !== null ? `${position.left}px` : 'auto',
            top: position.top !== null ? `${position.top}px` : 'auto',
            right: position.right !== null ? `${position.right}px` : 'auto',
            bottom: position.bottom !== null ? `${position.bottom}px` : 'auto',
            cursor: isDragging ? 'grabbing' : 'default'
          }}
        >
          <div 
            className="chatbot-header" 
            onMouseDown={handleMouseDown}
          >
            <h3>✨ AI Tutor</h3>
            <p>Drag me anywhere! Ask me anything!</p>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="chatbot-welcome">
                <p>👋 Hi! I'm your AI tutor. How can I help you today?</p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-content">
                  {msg.content}
                </div>
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
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              rows="2"
            />
            <button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className="btn-send"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
