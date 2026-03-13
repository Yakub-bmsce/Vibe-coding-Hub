import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import TopicCard from '../components/TopicCard';
import { getDomainById } from '../data/domains';
import '../styles/DomainPage.css';

const DomainPage = () => {
  const { domainName } = useParams();
  const navigate = useNavigate();
  const domain = getDomainById(domainName);

  if (!domain) {
    return (
      <div className="domain-page">
        <Navbar />
        <Sidebar />
        <div className="domain-content">
          <div className="error-message">
            <h2>Domain not found</h2>
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
    { label: domain.name }
  ];

  return (
    <div className="domain-page">
      <Navbar />
      <Sidebar />
      <div className="domain-content">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="domain-header">
          <div className="domain-icon">{domain.icon}</div>
          <h1>{domain.name}</h1>
          <p className="domain-subtitle">{domain.description}</p>
          <p className="domain-instruction">Choose a topic to start learning</p>
        </div>

        <div className="topics-grid">
          {domain.topics.map((topic) => (
            <TopicCard 
              key={topic.id} 
              topic={topic} 
              domainId={domainName}
            />
          ))}
        </div>

        <div className="domain-footer">
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomainPage;
