const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const generateFlashcard = async (topic = 'programming') => {
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
            content: 'You are a programming tutor creating flashcards. Generate ONE unique question and answer about programming concepts. Be concise and educational.'
          },
          {
            role: 'user',
            content: `Generate a unique flashcard about ${topic}. Format: Question: [question]\nAnswer: [answer]`
          }
        ],
        temperature: 1.0,
        max_tokens: 200
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the response
    const questionMatch = content.match(/Question:\s*(.+?)(?=\nAnswer:)/s);
    const answerMatch = content.match(/Answer:\s*(.+)/s);
    
    if (questionMatch && answerMatch) {
      return {
        question: questionMatch[1].trim(),
        answer: answerMatch[1].trim()
      };
    }
    
    // Fallback parsing
    const lines = content.split('\n').filter(l => l.trim());
    return {
      question: lines[0]?.replace(/Question:\s*/i, '').trim() || 'What is programming?',
      answer: lines[1]?.replace(/Answer:\s*/i, '').trim() || 'Programming is writing instructions for computers.'
    };
  } catch (error) {
    console.error('Flashcard generation error:', error);
    return generateFallbackFlashcard();
  }
};

const generateFallbackFlashcard = () => {
  const fallbacks = [
    {
      question: 'What is a variable?',
      answer: 'A container for storing data values that can change during program execution.'
    },
    {
      question: 'What is a function?',
      answer: 'A reusable block of code that performs a specific task when called.'
    },
    {
      question: 'What is an array?',
      answer: 'A data structure that stores multiple values in a single variable.'
    },
    {
      question: 'What is a loop?',
      answer: 'A programming construct that repeats a block of code multiple times.'
    },
    {
      question: 'What is an object?',
      answer: 'A collection of key-value pairs that represent a real-world entity.'
    }
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
