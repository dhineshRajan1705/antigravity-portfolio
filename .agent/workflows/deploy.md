---
description: Deploy to Vercel
---

# Deploy to Vercel Workflow

This workflow helps you deploy your portfolio to Vercel.

## Quick Deploy

To deploy your latest changes to Vercel:

```bash
# 1. Commit your changes
git add .
git commit -m "Your commit message"

# 2. Push to both repositories
git push origin main
git push vercel main
```

## Repository Setup

You have two GitHub repositories:

- **origin**: `dhineshRajan1705/antigravity-portfolio` (main repository)
- **vercel**: `dhineshRajan1705/antigravity-portfolio-dhinesh` (Vercel watches this)

## Deployment Steps

// turbo-all
1. Stage your changes
```bash
git add .
```

2. Commit your changes
```bash
git commit -m "Your descriptive commit message"
```

3. Push to main repository
```bash
git push origin main
```

4. Push to Vercel repository
```bash
git push vercel main
```

5. Check deployment status at [Vercel Dashboard](https://vercel.com/dashboard)

## Troubleshooting

### If Vercel doesn't deploy:
- Check that you pushed to the `vercel` remote
- Verify the deployment status in Vercel dashboard
- Check for build errors in Vercel logs

### If push is rejected:
```bash
git fetch vercel
git push vercel main --force
```

### Check current remotes:
```bash
git remote -v
```

## Environment Variables

Make sure these are set in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Notes

- Vercel deployment typically takes 2-3 minutes
- The app will work even without valid Supabase credentials (uses localStorage fallback)
- Always test locally first: `npm run build && npm run preview`
