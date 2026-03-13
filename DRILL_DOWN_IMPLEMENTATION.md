# Domain-Based Drill-Down Learning System - Implementation Plan

## ✅ COMPLETED
- Created `/src/data/domains.js` with all 10 domains and their topics

## 📋 NEXT STEPS TO IMPLEMENT

### 1. Update Dashboard Search (DashboardPage.jsx)
```javascript
// Add live search with dropdown
- Import domains data
- Add search state and filtered results
- Show dropdown with matching domains
- Navigate to /domain/:domainName on click
```

### 2. Create DomainPage Component
**File**: `src/pages/DomainPage.jsx`
**Route**: `/domain/:domainName`
**Features**:
- Display domain name and description
- Grid of topic cards
- Each card shows: icon, name, description, difficulty badge, XP badge
- Click navigates to `/topic/:domainName/:topicName`
- Breadcrumb: Dashboard > Domain Name

### 3. Create TopicDetailPage Component
**File**: `src/pages/TopicDetailPage.jsx`
**Route**: `/topic/:domainName/:topicName`
**Features**:
- 4 tabs: Concepts, Videos, Games, Roadmap
- Tab navigation with query params (?tab=concepts)
- Breadcrumb: Dashboard > Domain > Topic

#### Tab 1: Concepts
- AI-generated explanation using Groq API
- Step-by-step breakdown
- Code examples with syntax highlighting
- Visual diagrams
- "I still don't understand" button → regenerate simpler

#### Tab 2: Videos
- Fetch YouTube videos using YouTube API
- Search query: "[topicName] tutorial for beginners"
- Video cards with thumbnails
- Embedded player

#### Tab 3: Games
- Flashcard game for topic
- Concept matching
- Timed quiz (AI-generated questions)
- Code completion challenge

#### Tab 4: Roadmap
- Mini roadmap showing: Previous → Current → Next
- Visual nodes with connections
- "Next Topic" button

### 4. Update App.js Routes
```javascript
<Route path="/domain/:domainName" element={<ProtectedRoute><DomainPage /></ProtectedRoute>} />
<Route path="/topic/:domainName/:topicName" element={<ProtectedRoute><TopicDetailPage /></ProtectedRoute>} />
```

### 5. Update Dashboard Learning Path Cards
- When clicking "Learn by Concepts/Videos/Games"
- First show domain selection modal
- Then show topic selection
- Then navigate to specific tab

### 6. Create Supporting Components
- `TopicCard.jsx` - Reusable topic card
- `DomainCard.jsx` - Reusable domain card  
- `Breadcrumb.jsx` - Navigation breadcrumb
- `TabNavigation.jsx` - Tab switcher

### 7. Create Styles
- `DomainPage.css`
- `TopicDetailPage.css`
- `TopicCard.css`
- `DomainCard.css`
- `Breadcrumb.css`

### 8. Update Groq API Functions
Add to `src/api/groqAI.js`:
```javascript
export const generateTopicExplanation = async (topicName, domainName)
export const generateSimplifiedExplanation = async (topicName, previousExplanation)
export const generateTopicQuiz = async (topicName, questionCount)
export const generateCodeChallenge = async (topicName)
```

## 🎨 DESIGN REQUIREMENTS
- All cards: Dark purple background `rgba(20, 15, 30, 0.8)`
- Borders: Purple `rgba(183, 148, 246, 0.2)`
- Difficulty badges: Color-coded (Green/Yellow/Red)
- XP badges: Purple gradient
- Hover effects: Glow and lift
- Smooth transitions between pages

## 🔄 NAVIGATION FLOW
```
Dashboard
  ↓ (search or click learning path)
Domain Page (/domain/programming-languages)
  ↓ (click topic card)
Topic Detail Page (/topic/programming-languages/python)
  ├── Tab: Concepts
  ├── Tab: Videos  
  ├── Tab: Games
  └── Tab: Roadmap
      ↓ (click next topic)
Topic Detail Page (/topic/programming-languages/javascript)
```

## 📦 FILES TO CREATE
1. `src/pages/DomainPage.jsx`
2. `src/pages/TopicDetailPage.jsx`
3. `src/components/TopicCard.jsx`
4. `src/components/DomainCard.jsx`
5. `src/components/Breadcrumb.jsx`
6. `src/components/TabNavigation.jsx`
7. `src/styles/DomainPage.css`
8. `src/styles/TopicDetailPage.css`
9. `src/styles/TopicCard.css`
10. `src/styles/DomainCard.css`
11. `src/styles/Breadcrumb.css`

## 📝 FILES TO UPDATE
1. `src/App.js` - Add new routes
2. `src/pages/DashboardPage.jsx` - Add search functionality
3. `src/api/groqAI.js` - Add new API functions
4. `src/utils/xpSystem.js` - Track topic completion

## ⚡ PRIORITY ORDER
1. Create DomainPage (most important)
2. Create TopicDetailPage with Concepts tab
3. Add search to Dashboard
4. Implement Videos tab
5. Implement Games tab
6. Implement Roadmap tab
7. Update learning path cards

---

**Status**: Data structure created ✅
**Next**: Create DomainPage component
**Estimated**: 10-12 new files needed
