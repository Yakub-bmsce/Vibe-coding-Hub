# 🚀 Quick Start Checklist

Follow these steps to get Vibe Learning Hub running in 5 minutes!

## ☑️ Pre-Flight Checklist

- [ ] Node.js installed (v14+)
- [ ] npm installed (v6+)
- [ ] Code editor ready
- [ ] Terminal/Command Prompt open

## 📝 Setup Steps

### 1. Install Dependencies (2 minutes)
```bash
npm install
```
**Wait for**: "added XXX packages"

### 2. Get API Keys (2 minutes)

#### Groq API Key
- [ ] Go to https://console.groq.com
- [ ] Sign up / Log in
- [ ] Click "API Keys"
- [ ] Create new key
- [ ] Copy the key

#### YouTube API Key
- [ ] Go to https://console.cloud.google.com
- [ ] Create new project
- [ ] Enable "YouTube Data API v3"
- [ ] Create API Key
- [ ] Copy the key

### 3. Create .env File (30 seconds)
```bash
# Create .env file in root directory
# Add these lines:
REACT_APP_GROQ_API_KEY=paste_your_groq_key_here
REACT_APP_GROW_API_KEY=paste_your_youtube_key_here
```

### 4. Start the App (30 seconds)
```bash
npm start
```
**Wait for**: Browser opens automatically at http://localhost:3000

## ✅ Verification Checklist

- [ ] Login page loads
- [ ] Can sign up with test@example.com
- [ ] Redirects to dashboard after login
- [ ] Chatbot icon visible (bottom-right)
- [ ] Can click chatbot and send message
- [ ] Can navigate to all pages
- [ ] Videos load when searching
- [ ] Lessons generate with AI

## 🎯 First Actions

1. **Sign Up**
   - Email: test@example.com
   - Password: password123

2. **Test Chatbot**
   - Click chat icon (bottom-right)
   - Ask: "What is a variable?"
   - Wait for AI response

3. **Explore Dashboard**
   - Check your XP (starts at 0)
   - See your streak (starts at 1)
   - Try Class Recovery Mode

4. **Try Learning Paths**
   - Click "Learn by Concepts"
   - Select a lesson
   - Complete it for XP

5. **Watch Videos**
   - Click "Learn by Videos"
   - Search "JavaScript"
   - Click a video to watch

6. **Play Games**
   - Click "Learn by Games"
   - Try Flashcard Memory
   - Take Timed Quiz

## 🐛 Quick Troubleshooting

### App won't start?
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Chatbot not working?
- Check .env file exists
- Verify Groq API key is correct
- Restart server (Ctrl+C, then npm start)

### Videos not loading?
- Check YouTube API key
- Verify API is enabled in Google Cloud
- Check browser console for errors

### Port 3000 in use?
```bash
# Windows
set PORT=3001 && npm start

# Mac/Linux
PORT=3001 npm start
```

## 📚 Next Steps

Once everything works:
- [ ] Read README.md for full documentation
- [ ] Check FEATURES.md for all features
- [ ] Follow DEPLOYMENT.md to deploy
- [ ] Customize content for your needs

## 🎉 Success!

If you can:
- ✅ Log in
- ✅ Chat with AI
- ✅ Navigate pages
- ✅ See videos
- ✅ Complete lessons

**You're ready to go!** 🚀

---

**Need help?** Check SETUP_GUIDE.md for detailed instructions.

**Ready to deploy?** Follow DEPLOYMENT.md for Vercel deployment.
