const YOUTUBE_API_KEY = process.env.REACT_APP_GROW_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export const searchVideos = async (query) => {
  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=12&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();
    
    if (data.items) {
      return data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        description: item.snippet.description
      }));
    }
    
    return getFallbackVideos(query);
  } catch (error) {
    console.error('YouTube API Error:', error);
    return getFallbackVideos(query);
  }
};

const getFallbackVideos = (query) => {
  return [
    {
      id: 'dQw4w9WgXcQ',
      title: `Learn ${query} - Complete Tutorial`,
      thumbnail: 'https://via.placeholder.com/320x180/6366f1/ffffff?text=Video',
      channel: 'freeCodeCamp',
      description: `Comprehensive tutorial on ${query}`
    },
    {
      id: 'dQw4w9WgXcQ',
      title: `${query} Crash Course`,
      thumbnail: 'https://via.placeholder.com/320x180/8b5cf6/ffffff?text=Video',
      channel: 'Traversy Media',
      description: `Quick crash course on ${query}`
    }
  ];
};
