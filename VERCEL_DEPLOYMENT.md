# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Your API keys ready (Groq API & YouTube API)

## Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Vibe Learning Hub"
```

2. **Create GitHub Repository**:
   - Go to github.com
   - Click "New Repository"
   - Name it: `vibe-learning-hub`
   - Don't initialize with README (we already have one)
   - Click "Create Repository"

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/vibe-learning-hub.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `vibe-learning-hub`
   - Click "Import"

3. **Configure Project**:
   - Framework Preset: `Create React App` (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `build` (auto-filled)

4. **Add Environment Variables**:
   Click "Environment Variables" and add:
   
   ```
   Name: REACT_APP_GROQ_API_KEY
   Value: [Your Groq API Key]
   ```
   
   ```
   Name: REACT_APP_GROW_API_KEY
   Value: [Your YouTube API Key]
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at: `https://your-project-name.vercel.app`

### Option B: Using Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Add Environment Variables**:
```bash
vercel env add REACT_APP_GROQ_API_KEY
vercel env add REACT_APP_GROW_API_KEY
```

5. **Deploy to Production**:
```bash
vercel --prod
```

## Step 3: Configure Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Add both variables:
   - `REACT_APP_GROQ_API_KEY`
   - `REACT_APP_GROW_API_KEY`
4. Select "Production", "Preview", and "Development"
5. Click "Save"

## Step 4: Redeploy (if needed)

If you added environment variables after first deployment:
1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"

## Troubleshooting

### Build Fails with ESLint Warnings

The build is configured to ignore warnings. If it still fails:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add: `CI=false`
3. Redeploy

### API Keys Not Working

Make sure:
- Variable names start with `REACT_APP_`
- No spaces in variable names
- Values are correct
- You redeployed after adding variables

### 404 on Page Refresh

The `vercel.json` file handles this with rewrites. Make sure it exists in your root directory.

## Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-10 minutes)

## Automatic Deployments

Every push to `main` branch will automatically deploy to production!

## Your Live URLs

- **Production**: https://your-project-name.vercel.app
- **Preview**: Automatic preview URLs for each branch/PR

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

---

🎉 **Congratulations!** Your Vibe Learning Hub is now live!
