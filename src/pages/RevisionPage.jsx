import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import FlashcardCarousel from '../components/FlashcardCarousel';
import '../styles/RevisionPage.css';

const RevisionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const revisionCards = [
    {
      category: 'concepts',
      title: 'Variables',
      content: 'Variables store data values. Use let for changeable values, const for constants.',
      icon: '📦'
    },
    {
      category: 'concepts',
      title: 'Functions',
      content: 'Functions are reusable code blocks. Syntax: function name(params) { code }',
      icon: '⚙️'
    },
    {
      category: 'formulas',
      title: 'Big O Notation',
      content: 'O(1) - Constant, O(n) - Linear, O(n²) - Quadratic, O(log n) - Logarithmic',
      icon: '📐'
    },
    {
      category: 'formulas',
      title: 'Array Methods',
      content: 'map(), filter(), reduce(), forEach(), find(), some(), every()',
      icon: '📊'
    },
    {
      category: 'code',
      title: 'Array Loop',
      content: 'for (let i = 0; i < arr.length; i++) { console.log(arr[i]); }',
      icon: '💻'
    },
    {
      category: 'code',
      title: 'Async Function',
      content: 'async function fetchData() { const response = await fetch(url); return response.json(); }',
      icon: '⏳'
    }
  ];

  const flashcardData = [
    { question: 'What is closure in JavaScript?', answer: 'A closure is a function that has access to variables in its outer scope, even after the outer function has returned.' },
    { question: 'Difference between == and ===?', answer: '== compares values with type coercion, === compares both value and type without coercion.' },
    { question: 'What is the DOM?', answer: 'Document Object Model - a programming interface for HTML documents that represents the page structure as a tree of objects.' },
    { question: 'What is event bubbling?', answer: 'When an event triggers on an element, it also triggers on all parent elements up to the document root.' }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: '📚' },
    { id: 'concepts', label: 'Concepts', icon: '💡' },
    { id: 'formulas', label: 'Formulas', icon: '📐' },
    { id: 'code', label: 'Code Snippets', icon: '💻' }
  ];

  const filteredCards = selectedCategory === 'all' 
    ? revisionCards 
    : revisionCards.filter(card => card.category === selectedCategory);

  return (
    <div className="revision-page">
      <Navbar />
      <Sidebar />
      
      <main className="revision-content">
        <div className="container">
          <h1 className="gradient-text">Revision Center</h1>
          <p className="page-subtitle">Review key concepts, formulas, and code snippets</p>

          <div className="category-filter">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <section className="revision-cards-section">
            <h2>Quick Reference Cards</h2>
            <div className="revision-cards-grid">
              {filteredCards.map((card, idx) => (
                <div key={idx} className="revision-card card">
                  <div className="revision-card-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.content}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="flashcards-section">
            <h2>Practice Flashcards</h2>
            <FlashcardCarousel 
              flashcards={flashcardData}
              onComplete={() => alert('Great job! You reviewed all flashcards!')}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default RevisionPage;
