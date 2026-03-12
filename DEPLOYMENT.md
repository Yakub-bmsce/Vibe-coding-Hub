# Deployment Guide for Vibe Learning Hub

## Prerequisites

Before deploying, ensure you have:
1. A GitHub account
2. A Vercel account (free tier works)
3. Groq API key
4. YouTube Data API key

## Step-by-Step Deployment to Vercel

### Step 1: Prepare Your Repository

1. Initialize git (if not already done):
```bash
git init
```

2. Add all files:
```bash
git add .
```

3. Commit:
```bash
git commit -m "Initial commit - Vibe Learning Hub"
```

4. Create a new repository on GitHub

5. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/vibe-learning-hub.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add the following:
     ```
     Name: REACT_APP_GROQ_API_KEY
     Value: [your-groq-api-key]
     
     Name: REACT_APP_GROW_API_KEY
     Value: [your-youtube-api-key]
     ```
   - Select all environments (Production, Preview, Development)

6. Click "Deploy"

7. Wait for deployment to complete (usually 2-3 minutes)

8. Your app will be live at: `https://your-project-name.vercel.app`

#### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **vibe-learning-hub**
   - Directory? **./
   - Override settings? **N**

5. Add environment variables:
```bash
vercel env add REACT_APP_GROQ_API_KEY
vercel env add REACT_APP_GROW_API_KEY
```

6. Deploy to production:
```bash
vercel --prod
```

### Step 3: Verify Deployment

1. Visit your deployed URL
2. Test the following:
   - Login/Signup functionality
   - Navigation between pages
   - AI Chatbot (requires Groq API key)
   - Video search (requires YouTube API key)
   - All interactive features

### Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_GROQ_API_KEY` | Groq API key for AI features | Yes |
| `REACT_APP_GROW_API_KEY` | YouTube Data API key | Yes |

## Getting API Keys

### Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Navigate to "API Keys"
4. Click "Create API Key"
5. Copy the key (you won't see it again!)
6. Add to Vercel environment variables

### YouTube Data API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable "YouTube Data API v3":
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key
5. (Optional) Restrict the API key:
   - Click on the key
   - Under "API restrictions", select "Restrict key"
   - Choose "YouTube Data API v3"
   - Save
6. Add to Vercel environment variables

## Troubleshooting

### Build Fails

**Issue**: Build fails with module not found
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue**: Environment variables not working
**Solution**: 
- Ensure variables start with `REACT_APP_`
- Redeploy after adding variables
- Check Vercel dashboard for correct variable names

### API Issues

**Issue**: Chatbot not responding
**Solution**: 
- Verify Groq API key is correct
- Check API key has not expired
- Check browser console for errors

**Issue**: Videos not loading
**Solution**: 
- Verify YouTube API key is correct
- Ensure YouTube Data API v3 is enabled
- Check API quota limits

### Routing Issues

**Issue**: 404 on page refresh
**Solution**: 
- Ensure `vercel.json` is present
- Check routing configuration redirects to `index.html`

## Continuous Deployment

Once connected to GitHub, Vercel automatically:
- Deploys on every push to main branch
- Creates preview deployments for pull requests
- Runs build checks before deployment

To trigger a new deployment:
```bash
git add .
git commit -m "Update message"
git push origin main
```

## Performance Optimization

After deployment, consider:
1. Enable Vercel Analytics
2. Monitor Core Web Vitals
3. Optimize images and assets
4. Enable caching headers
5. Use Vercel Edge Network

## Security Best Practices

1. Never commit `.env` file to git
2. Rotate API keys regularly
3. Use environment-specific keys
4. Enable API key restrictions
5. Monitor API usage

## Support

For deployment issues:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- GitHub Issues: Create an issue in your repository

---

Your Vibe Learning Hub is now live! 🚀
