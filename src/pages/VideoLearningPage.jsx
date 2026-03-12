import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import { searchVideos } from '../api/growAPI';
import '../styles/VideoLearningPage.css';

const VideoLearningPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await searchVideos(searchQuery);
      setVideos(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const popularTopics = [
    'JavaScript Tutorial',
    'React Basics',
    'Python Programming',
    'Web Development',
    'Data Structures',
    'Algorithms'
  ];

  return (
    <div className="video-page">
      <Navbar />
      <Sidebar />
      
      <main className="video-content">
        <div className="container">
          <h1 className="gradient-text">Learn by Videos</h1>
          <p className="page-subtitle">Watch curated tutorials from top educators</p>

          <div className="search-section">
            <div className="search-box">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tutorials..."
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>

            <div className="popular-topics">
              <p>Popular topics:</p>
              <div className="topic-tags">
                {popularTopics.map((topic, idx) => (
                  <span 
                    key={idx}
                    className="topic-tag"
                    onClick={() => {
                      setSearchQuery(topic);
                      searchVideos(topic).then(setVideos);
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {selectedVideo && (
            <div className="video-player-section card fade-in">
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedVideo(null)}
              >
                ← Back to Results
              </button>
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
              </div>
              <h2>{selectedVideo.title}</h2>
              <p className="video-channel">By {selectedVideo.channel}</p>
            </div>
          )}

          {videos.length > 0 && !selectedVideo && (
            <div className="videos-grid">
              {videos.map((video, idx) => (
                <VideoCard 
                  key={idx}
                  video={video}
                  onClick={() => handleVideoClick(video)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VideoLearningPage;
