# Deployment Guide

This guide covers deploying your portfolio site to production hosting.

## Recommended: Vercel (Easiest & Best for Vite)

### Step 1: Prepare Your Project

1. Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Verify your `package.json` has the build script (already configured):
```json
"scripts": {
  "build": "tsc -b && vite build",
  "preview": "vite preview"
}
```

### Step 2: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** (use your GitHub account)
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

6. **Add Environment Variables** (IMPORTANT!):
   - Click "Environment Variables"
   - Add `VITE_SUPABASE_URL` with your Supabase URL
   - Add `VITE_SUPABASE_ANON_KEY` with your Supabase anon key
   - Add them for all environments (Production, Preview, Development)

7. Click **"Deploy"**
8. Wait 2-3 minutes ⏰
9. Your site will be live at `https://your-project.vercel.app` 🎉

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to your project → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (~5-60 minutes)

---

## Alternative: Netlify

### Deploy to Netlify

1. Go to [https://netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose GitHub and select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. **Add Environment Variables**:
   - Click "Advanced" → "New variable"
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`
7. Click **"Deploy site"**
8. Your site will be live at `https://random-name.netlify.app` 🎉

---

## Alternative: GitHub Pages

### Deploy to GitHub Pages

1. Install the gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Update your `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Add this line
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages:
   - Go to your repo → Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Click Save

**Note**: GitHub Pages doesn't support environment variables easily. You'll need to use a different approach or choose Vercel/Netlify.

---

## Quick Deploy Commands

### Test Build Locally First
```bash
npm run build
npm run preview
```
This builds your site and previews it locally at `http://localhost:4173`

### Common Issues & Solutions

#### Build Fails
- Check that all environment variables are set
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npm run build`

#### Environment Variables Not Working
- Make sure variable names start with `VITE_`
- Restart the build after adding variables
- Check spelling matches exactly

#### Site Loads but Features Don't Work
- Check browser console for errors
- Verify environment variables are set in hosting platform
- Make sure Supabase credentials are correct

---

## Performance Optimization (Optional)

After deploying, you can optimize:

### 1. Enable Compression (Vercel/Netlify do this automatically)

### 2. Add `_headers` file for Netlify:
Create `public/_headers`:
```
/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/*.json
  Cache-Control: public, max-age=0, must-revalidate
```

### 3. Optimize Images
- Use WebP format
- Compress images before uploading
- Use lazy loading (already implemented with React)

---

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Supabase database set up and tested locally
- [ ] Environment variables ready
- [ ] Build tested locally (`npm run build && npm run preview`)
- [ ] GitHub repository is public (or connected to hosting)
- [ ] Domain name ready (optional)

---

## Continuous Deployment

Both Vercel and Netlify automatically redeploy when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main
# Site automatically rebuilds and deploys! 🚀
```

---

## Monitoring Your Site

### Vercel Analytics (Free)
1. Go to your project dashboard
2. Click "Analytics" tab
3. See visitor stats, page views, etc.

### Supabase Dashboard
1. Monitor database usage
2. Check API calls
3. View real-time connections

---

## Cost Breakdown

### Free Forever ✨
- **Vercel**: 100 GB bandwidth/month, unlimited sites
- **Netlify**: 100 GB bandwidth/month, 300 build minutes
- **Supabase**: 500 MB database, 2 GB bandwidth
- **GitHub Pages**: Unlimited for public repos

Perfect for a portfolio site with moderate traffic!

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Vite Docs**: https://vitejs.dev/guide/static-deploy.html

---

**Ready to deploy?** Start with Vercel - it's the easiest! 🚀
