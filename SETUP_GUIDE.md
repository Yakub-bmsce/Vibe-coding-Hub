# Vibe Learning Hub - Complete Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File
Create a `.env` file in the root directory:
```env
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
REACT_APP_GROW_API_KEY=your_youtube_api_key_here
```

### Step 3: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

### Step 4: Test the Application
1. Sign up with any email/password
2. Explore the dashboard
3. Try the AI chatbot (bottom-right)
4. Navigate through different learning paths

---

## 📋 Detailed Setup Instructions

### Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm (v6 or higher)
- A code editor (VS Code recommended)
- Git (for version control)

### Installation Steps

#### 1. Clone or Download the Project
```bash
# If using git
git clone <repository-url>
cd vibe-learning-hub

# Or download and extract the ZIP file
```

#### 2. Install Node Modules
```bash
npm install
```

This will install all required dependencies:
- react
- react-dom
- react-router-dom
- react-scripts

#### 3. Configure Environment Variables

Create a `.env` file in the root directory (same level as package.json):

```env
# Groq API Key for AI features
REACT_APP_GROQ_API_KEY=your_groq_api_key_here

# YouTube Data API Key for video tutorials
REACT_APP_GROW_API_KEY=your_youtube_api_key_here
```

**Important**: 
- Never commit the `.env` file to version control
- Use `.env.example` as a template
- Variable names must start with `REACT_APP_`

#### 4. Get API Keys

##### Groq API Key (Required for AI features)

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to "API Keys" section
4. Click "Create API Key"
5. Name it "Vibe Learning Hub"
6. Copy the key immediately (you won't see it again)
7. Paste into `.env` file

##### YouTube Data API Key (Required for video features)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project:
   - Click "Select a project" → "New Project"
   - Name: "Vibe Learning Hub"
   - Click "Create"
3. Enable YouTube Data API v3:
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"
4. Create API credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated key
5. (Optional) Restrict the key:
   - Click on the key name
   - Under "API restrictions", select "Restrict key"
   - Choose "YouTube Data API v3"
   - Click "Save"
6. Paste into `.env` file

#### 5. Start the Development Server

```bash
npm start
```

The application will:
- Compile the React app
- Open automatically in your default browser
- Run at `http://localhost:3000`
- Hot-reload when you make changes

#### 6. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## 🧪 Testing the Application

### Test Authentication
1. Go to `http://localhost:3000`
2. You'll be redirected to `/login`
3. Click "Sign Up"
4. Enter any email (e.g., `test@example.com`)
5. Enter any password (e.g., `password123`)
6. Click "Sign Up"
7. You should be redirected to the dashboard

### Test AI Chatbot
1. After logging in, look for the floating chat icon (bottom-right)
2. Click to open the chatbot
3. Type a question: "What is a variable in JavaScript?"
4. Press Enter or click Send
5. Wait for AI response (requires valid Groq API key)

### Test Video Search
1. Navigate to "Learn by Videos" from dashboard
2. Enter a search term: "JavaScript tutorial"
3. Click "Search"
4. Videos should appear (requires valid YouTube API key)
5. Click a video to watch

### Test Concept Learning
1. Navigate to "Learn by Concepts"
2. Click any lesson card
3. Wait for AI-generated content
4. Click "I still don't understand" for simplified explanation
5. Click "Complete Lesson" to earn XP

### Test Roadmap
1. Navigate to "Learning Roadmap"
2. See the visual path with connected nodes
3. Click on "HTML" (first unlocked node)
4. Complete the lesson to unlock the next node

### Test Games
1. Navigate to "Learn by Games"
2. Click "Flashcard Memory"
3. Click cards to flip them
4. Click "Timed Quiz" to test knowledge
5. Answer questions to earn XP

### Test Revision
1. Navigate to "Revision"
2. Browse quick reference cards
3. Click flashcards to flip them
4. Use category filters

---

## 🔧 Troubleshooting

### Issue: npm install fails

**Solution 1**: Clear npm cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Solution 2**: Use different Node version
```bash
# Install nvm (Node Version Manager)
# Then use Node 16 or 18
nvm install 16
nvm use 16
npm install
```

### Issue: Port 3000 already in use

**Solution**: Use a different port
```bash
# Windows
set PORT=3001 && npm start

# Mac/Linux
PORT=3001 npm start
```

### Issue: Chatbot not responding

**Possible causes**:
1. Invalid Groq API key
2. API key not set in `.env`
3. Exceeded API rate limits

**Solution**:
- Check `.env` file exists and has correct key
- Verify key at [console.groq.com](https://console.groq.com)
- Check browser console for error messages
- Restart development server after adding key

### Issue: Videos not loading

**Possible causes**:
1. Invalid YouTube API key
2. API not enabled in Google Cloud
3. Exceeded daily quota

**Solution**:
- Verify YouTube Data API v3 is enabled
- Check API key in Google Cloud Console
- Check quota limits (default: 10,000 units/day)
- Wait 24 hours if quota exceeded

### Issue: Build fails

**Solution**:
```bash
# Remove build folder
rm -rf build

# Clean install
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Issue: Styles not loading

**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check browser console for CSS errors
- Verify all CSS files are in src/styles/

### Issue: Routing not working

**Solution**:
- Ensure react-router-dom is installed
- Check App.js has BrowserRouter
- Verify all routes are defined
- Check for typos in route paths

---

## 📁 Project Structure Explained

```
vibe-learning-hub/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ChatbotWidget.jsx
│   │   ├── LessonCard.jsx
│   │   ├── VideoCard.jsx
│   │   ├── RoadmapNode.jsx
│   │   ├── Flashcard.jsx
│   │   └── GameCard.jsx
│   ├── pages/            # Page components (routes)
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ConceptLearningPage.jsx
│   │   ├── VideoLearningPage.jsx
│   │   ├── RoadmapPage.jsx
│   │   ├── GameLearningPage.jsx
│   │   └── RevisionPage.jsx
│   ├── context/          # React Context for state
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── api/              # API integration
│   │   ├── groqAI.js     # Groq AI functions
│   │   └── growAPI.js    # YouTube API functions
│   ├── utils/            # Utility functions
│   │   ├── xpSystem.js   # XP and leveling
│   │   └── progressTracker.js  # Progress tracking
│   ├── styles/           # CSS files
│   │   ├── global.css
│   │   ├── animations.css
│   │   └── [component].css
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
├── .env                  # Environment variables (create this)
├── .env.example          # Environment template
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
├── vercel.json          # Vercel deployment config
├── README.md            # Project documentation
├── DEPLOYMENT.md        # Deployment guide
├── FEATURES.md          # Features list
└── SETUP_GUIDE.md       # This file
```

---

## 🎯 Next Steps

After setup is complete:

1. **Customize Content**
   - Edit lesson topics in `ConceptLearningPage.jsx`
   - Modify roadmap nodes in `RoadmapPage.jsx`
   - Add more flashcards in `GameLearningPage.jsx`

2. **Enhance Features**
   - Add more game types
   - Create additional badges
   - Implement more visualizations

3. **Deploy to Production**
   - Follow `DEPLOYMENT.md` guide
   - Deploy to Vercel
   - Share with users

4. **Monitor & Improve**
   - Collect user feedback
   - Track API usage
   - Optimize performance

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Groq API Documentation](https://console.groq.com/docs)
- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [Vercel Documentation](https://vercel.com/docs)

---

## 💬 Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review error messages in browser console
3. Check terminal output for errors
4. Verify all environment variables are set
5. Ensure API keys are valid

---

## 🎉 You're Ready!

Your Vibe Learning Hub is now set up and ready to use. Start learning and building amazing things!

Happy coding! 🚀
