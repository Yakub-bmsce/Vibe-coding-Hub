const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Removed lessonCache - we don't cache anymore for fresh content

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
            content: `A student said: "${topic}". Give me:
1. Simple explanation (2-3 lines)
2. Real world analogy
3. One practice question

Return ONLY valid JSON, no markdown:
{"explanation":"...","analogy":"...","practiceQuestion":"..."}`
          }
        ],
        temperature: 0.9,
        max_tokens: 600
      })
    });

    const data = await response.json();
    const text = data.choices[0].message.content;
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    try {
      return JSON.parse(clean);
    } catch {
      return { explanation: text, analogy: '', practiceQuestion: '' };
    }
  } catch (error) {
    return { explanation: 'Could not load. Check your Groq API key in .env', analogy: '', practiceQuestion: '' };
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

export const generateTopicExplanation = async (topicName, domainName) => {
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
            content: 'You are an expert programming tutor. Provide clear, comprehensive explanations with examples.'
          },
          {
            role: 'user',
            content: `Create a detailed explanation of ${topicName} in the context of ${domainName}. Include:
1) Simple introduction
2) Step-by-step breakdown
3) Real-world analogy
4) Code examples (if applicable)
5) Common mistakes to avoid
6) Visual diagram description (describe what a diagram would show)
7) Summary

Make it beginner-friendly but comprehensive.`
          }
        ],
        temperature: 0.9,
        max_tokens: 2500
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Topic explanation error:', error);
    return `Error generating explanation for ${topicName}. Please try again.`;
  }
};

export const generateSimplifiedExplanation = async (topicName, previousExplanation) => {
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
            content: 'You are a patient tutor who excels at breaking down complex topics into simple terms.'
          },
          {
            role: 'user',
            content: `The student didn't understand this explanation of ${topicName}:

${previousExplanation}

Please provide a much simpler explanation using:
1) Everyday analogies
2) Simple language (avoid jargon)
3) Step-by-step breakdown
4) Visual examples
5) Relatable scenarios

Make it as simple as possible while still being accurate.`
          }
        ],
        temperature: 0.9,
        max_tokens: 2000
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Simplification error:', error);
    return 'Unable to simplify at this time. Please try again.';
  }
};

export const generateTopicQuiz = async (topicName, questionCount = 5) => {
  try {
    const timestamp = Date.now();
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
            content: 'You are a quiz creator. Generate engaging multiple-choice questions in valid JSON format only. Always create unique and different questions each time.'
          },
          {
            role: 'user',
            content: `Create ${questionCount} UNIQUE and DIFFERENT multiple-choice questions about ${topicName}. 
Generate completely new questions that haven't been asked before. Use different angles, scenarios, and difficulty levels.
Session ID: ${timestamp}

Return ONLY a valid JSON array with this exact structure (no markdown, no code blocks, just pure JSON):
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Why this answer is correct"
  }
]

Requirements:
- Make each question unique and creative
- Mix difficulty levels (easy, medium, hard)
- Include practical scenarios and real-world examples
- Vary question types (conceptual, practical, code-based if applicable)
- The correctAnswer should be the index (0-3) of the correct option
- Ensure all 4 options are plausible but only one is correct`
          }
        ],
        temperature: 1.0,
        max_tokens: 2500,
        top_p: 0.95
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Try to parse JSON, removing any markdown code blocks if present
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    
    try {
      const quizData = JSON.parse(cleanContent);
      return quizData;
    } catch (parseError) {
      console.error('Failed to parse quiz JSON:', parseError);
      // Return fallback quiz
      return [
        {
          question: `What is ${topicName} primarily used for?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          explanation: 'This is a sample question. Please try generating a new quiz.'
        }
      ];
    }
  } catch (error) {
    console.error('Quiz generation error:', error);
    return [
      {
        question: 'Unable to generate quiz at this time.',
        options: ['Try again', 'Refresh', 'Go back', 'Continue'],
        correctAnswer: 0,
        explanation: 'Please try generating a new quiz.'
      }
    ];
  }
};

// ── Visual Learning AI generators ─────────────────────────────────────────────

const callGroqVisual = async (prompt, retries = 2) => {
  if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
    throw new Error('API key not configured');
  }
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: 'You are a JSON generator. Return ONLY valid JSON. No markdown, no explanation, no code blocks.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })
  });

  if (response.status === 429) {
    if (retries <= 0) throw new Error('Rate limit reached. Please wait a minute and retry.');
    const wait = parseInt(response.headers.get('retry-after') || '15', 10) * 1000;
    await new Promise(r => setTimeout(r, wait));
    return callGroqVisual(prompt, retries - 1);
  }

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    const msg = errBody?.error?.message || `API error ${response.status}`;
    throw new Error(msg);
  }

  const data = await response.json();
  const text = data.choices[0].message.content;
  const clean = text.replace(/^```[a-z]*\n?/gm, '').replace(/^```\n?/gm, '').trim();
  const jsonMatch = clean.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  return JSON.parse(jsonMatch[0]);
};

export const generateMindMap = (domain) => callGroqVisual(
  `Create a mind map for ${domain} in CS. Return valid JSON with keys: root (string) and branches (array of objects with label string and children array of strings). Include 4-5 branches each with 3-4 children.`
);

export const generateFlowchart = (domain) => callGroqVisual(
  `Create a learning flowchart for ${domain} in CS. Return valid JSON with key: steps (array of objects with id, label, type). Types must be: start, process, decision, or end. Include 6-7 steps.`
);

export const generateDiagram = (domain) => callGroqVisual(
  `Create an architecture diagram for ${domain} in CS. Return valid JSON with keys: components (array of objects with id, name, description) and connections (array of objects with from, to, label). Include 4-5 components.`
);

export const generateTimeline = (domain) => callGroqVisual(
  `Create a learning timeline for ${domain} in CS. Return valid JSON with key: phases (array of objects with week, title, topics array, milestone). Include 5-6 phases from beginner to advanced.`
);
