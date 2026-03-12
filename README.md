# Vibe Learning Hub 🚀

An AI-powered multi-page learning platform built with React and Tailwind CSS. Learn programming through concepts, videos, interactive games, and adaptive AI tutoring.

## Features ✨

### 🔐 Authentication System
- Email/password login and signup
- Persistent authentication with localStorage
- Protected routes for authenticated users

### 🤖 Global AI Chatbot
- Floating chatbot on all pages after login
- Powered by Groq API
- Answer coding questions, explain concepts, generate examples
- Scrollable chat history

### 📊 Dashboard
- Class Recovery Mode - AI helps with topics you didn't understand
- XP tracking and progress bars
- Daily learning streak counter
- Three learning paths: Concepts, Videos, Games

### 📚 Concept Learning
- Structured lessons with explanations, analogies, code examples
- "I still don't understand" button for simplified explanations
- Practice quizzes and exercises
- XP rewards for completion

### 🎥 Video Learning
- YouTube tutorial integration via YouTube Data API
- Curated channels (freeCodeCamp, Traversy Media, etc.)
- Embedded video player
- Search functionality

### 🗺️ Animated Roadmap
- Visual learning path: HTML → CSS → JavaScript → React → Full Stack
- Animated nodes with glowing connections
- Locked/unlocked progression system
- Click nodes to access lessons

### 🎮 Game-Based Learning
- Flashcard memory game with flip animations
- Timed quiz challenges
- Concept matching games
- XP rewards for game completion

### 🏆 Gamification (Duolingo-style)
- XP points system
- Daily learning streaks
- Levels and badges
- Progress tracking

### 📝 Revision Center
- Flashcards with flip animations
- Concept summaries
- Formula reference cards
- Code snippet library

### 🎨 Modern UI/UX
- Dark theme with gradient accents
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- Sidebar navigation
- Card-based layouts

## Tech Stack 💻

- React 18
- React Router v6
- CSS3 with custom animations
- Groq API (AI tutor)
- YouTube Data API (video tutorials)
- LocalStorage (progress tracking)

## Installation 🛠️

1. Clone the repository:
```bash
git clone <repository-url>
cd vibe-learning-hub
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
REACT_APP_GROW_API_KEY=your_youtube_api_key_here
```

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production 🏗️

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deployment to Vercel 🚀

### Method 1: Via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `REACT_APP_GROQ_API_KEY`
   - Add `REACT_APP_GROW_API_KEY`

### Method 2: Via GitHub

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Add environment variables:
   - `REACT_APP_GROQ_API_KEY`
   - `REACT_APP_GROW_API_KEY`
7. Click "Deploy"

## API Keys Setup 🔑

### Groq API Key
1. Visit [Groq Console](https://console.groq.com)
2. Sign up for an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and add to `.env` file

### YouTube Data API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Copy and add to `.env` file

## Project Structure 📁

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── ChatbotWidget.jsx
│   ├── LessonCard.jsx
│   ├── VideoCard.jsx
│   ├── RoadmapNode.jsx
│   ├── Flashcard.jsx
│   └── GameCard.jsx
├── pages/              # Page components
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── ConceptLearningPage.jsx
│   ├── VideoLearningPage.jsx
│   ├── RoadmapPage.jsx
│   ├── GameLearningPage.jsx
│   └── RevisionPage.jsx
├── api/                # API integrations
│   ├── groqAI.js
│   └── growAPI.js
├── utils/              # Utility functions
│   ├── xpSystem.js
│   └── progressTracker.js
├── context/            # React Context
│   ├── AuthContext.js
│   └── ThemeContext.js
├── styles/             # CSS files
│   ├── global.css
│   └── animations.css
└── App.js              # Main app component
```

## Features Breakdown 🎯

### Adaptive Learning System
- Tracks quiz scores and mistakes
- Adjusts difficulty based on performance
- Recommends additional resources for struggling students
- Unlocks advanced content for high performers

### Fast Content Generation
- Lesson caching for instant reloading
- Loading skeletons instead of long animations
- Optimized API calls

### Class Recovery Mode
- Input: "Today my teacher taught recursion but I didn't understand"
- AI generates: explanation, analogy, practice question
- Recommends relevant YouTube tutorials

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is open source and available under the MIT License.

## Support 💬

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using React and AI
