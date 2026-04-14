import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ConceptLearningPage from './pages/ConceptLearningPage';
import VideoLearningPage from './pages/VideoLearningPage';
import RoadmapPage from './pages/RoadmapPage';
import GameLearningPage from './pages/GameLearningPage';
import RevisionPage from './pages/RevisionPage';
import DomainPage from './pages/DomainPage';
import TopicDetailPage from './pages/TopicDetailPage';
import ChatbotWidget from './components/ChatbotWidget';
import SplashScreen from './components/SplashScreen';

const ProtectedRoute = ({ children }) => {
  return children;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/domain/:domainName" element={<ProtectedRoute><DomainPage /></ProtectedRoute>} />
        <Route path="/topic/:domainName/:topicName" element={<ProtectedRoute><TopicDetailPage /></ProtectedRoute>} />
        <Route path="/concepts" element={<ProtectedRoute><ConceptLearningPage /></ProtectedRoute>} />
        <Route path="/videos" element={<ProtectedRoute><VideoLearningPage /></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
        <Route path="/games" element={<ProtectedRoute><GameLearningPage /></ProtectedRoute>} />
        <Route path="/revision" element={<ProtectedRoute><RevisionPage /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      {isAuthenticated && <ChatbotWidget />}
    </>
  );
}

function App() {
  // Show splash only once per browser session
  const [showSplash, setShowSplash] = useState(
    () => !sessionStorage.getItem('splashShown')
  );

  const handleSplashDone = () => {
    sessionStorage.setItem('splashShown', '1');
    setShowSplash(false);
  };

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          {showSplash && <SplashScreen onDone={handleSplashDone} />}
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
