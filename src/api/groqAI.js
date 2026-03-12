const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const lessonCache = {};

export const generateLesson = async (topic) => {
  // Remove caching - always generate fresh content
  // if (lessonCache[topic]) {
  //   return lessonCache[topic];
  // }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert programming tutor. Provide clear, structured lessons with examples. Always provide unique and varied explanations.'
          },
          {
            role: 'user',
            content: `Create a comprehensive lesson on ${topic}. Include: 1) Simple explanation 2) Step-by-step breakdown 3) Real-world analogy 4) Code example 5) Common mistakes 6) Summary. Make it unique and different from previous explanations.`
          }
        ],
        temperature: 0.9,
        max_tokens: 2000
      })
    });

    const data = await response.json();
    const lesson = data.choices[0].message.content;
    // Don't cache - allow fresh content each time
    // lessonCache[topic] = lesson;
    return lesson;
  } catch (error) {
    console.error('Groq API Error:', error);
    return generateFallbackLesson(topic);
  }
};

export const simplifyExplanation = async (topic, currentExplanation) => {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: `Simplify this explanation of ${topic} for a beginner: ${currentExplanation}. Use simple analogies and examples.`
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return 'Unable to simplify at this time. Please try again.';
  }
};


export const chatWithAI = async (message, conversationHistory = []) => {
  // Check if API key exists
  if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
    console.error('Groq API key is missing or invalid');
    return 'API key is not configured. Please add your Groq API key to the .env file.';
  }

  try {
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful programming tutor. Answer questions clearly and provide code examples when relevant.'
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ];

    console.log('Sending request to Groq API...');
    
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.9,
        max_tokens: 1500
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Response:', errorData);
      return `API Error: ${errorData.error?.message || 'Unknown error'}`;
    }

    const data = await response.json();
    console.log('API Response received successfully');
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      console.error('Unexpected response format:', data);
      return 'Received unexpected response from API.';
    }
  } catch (error) {
    console.error('Chat Error:', error);
    return `Error: ${error.message}. Please check your API key and internet connection.`;
  }
};

export const generateClassRecovery = async (topic) => {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: `I didn't understand ${topic} in class. Provide: 1) Simple explanation 2) Real-world analogy 3) Practice question. Format as JSON.`
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return null;
  }
};

const generateFallbackLesson = (topic) => {
  return JSON.stringify({
    explanation: `${topic} is an important programming concept.`,
    steps: ['Understand the basics', 'Practice with examples', 'Build projects'],
    analogy: 'Think of it like building blocks.',
    example: '// Code example here',
    mistakes: ['Common mistake 1', 'Common mistake 2'],
    summary: `${topic} helps you write better code.`
  });
};
