# 🚀 Quick Supabase Setup for Your Portfolio

Follow these steps to get your like counter working with real-time sync!

## Step 1: Create a Supabase Account & Project

1. **Go to**: [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Sign in with your **GitHub account**
4. Click **"New Project"**
5. Fill in the details:
   - **Organization**: Select or create one
   - **Project Name**: `portfolio-likes` (or any name you prefer)
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to you (e.g., `Southeast Asia (Singapore)` or `US East`)
   - **Pricing Plan**: Select **Free** tier
6. Click **"Create new project"**
7. ⏱️ Wait 2-3 minutes for the project to initialize

---

## Step 2: Create the Database Table

Once your project is ready:

1. In the left sidebar, click **"SQL Editor"**
2. Click **"New Query"**
3. **Copy and paste this entire SQL code**:

```sql
-- Create the site_likes table
CREATE TABLE site_likes (
  id INTEGER PRIMARY KEY,
  like_count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial row with 0 likes
INSERT INTO site_likes (id, like_count) VALUES (1, 0);

-- Create function to increment/decrement likes
CREATE OR REPLACE FUNCTION increment_likes(row_id INTEGER, increment_value INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE site_likes 
  SET like_count = GREATEST(0, like_count + increment_value),
      updated_at = NOW()
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE site_likes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read
CREATE POLICY "Anyone can view likes" ON site_likes
  FOR SELECT USING (true);

-- Create policy to allow anyone to update (needed for the function)
CREATE POLICY "Anyone can update likes" ON site_likes
  FOR UPDATE USING (true);
```

4. Click **"Run"** (or press `Ctrl+Enter`)
5. You should see: ✅ **"Success. No rows returned"**

---

## Step 3: Enable Realtime (Optional but Awesome!)

This allows all users to see like count updates instantly!

1. In the left sidebar, click **"Database"** → **"Replication"**
2. Find the **`site_likes`** table in the list
3. Toggle **"Enable Realtime"** to **ON** (it will turn green)
4. Done! 🎉

---

## Step 4: Get Your API Credentials

Now get your credentials to connect your app:

1. In the left sidebar, click **"Settings"** (gear icon at bottom)
2. Click **"API"**
3. You'll see two important values:

### **Copy These Values:**

#### 📍 **Project URL**
- Look for: **"Project URL"** or **"URL"**
- It looks like: `https://xxxxxxxxxxxxx.supabase.co`
- **Copy this entire URL**

#### 🔑 **Anon/Public Key**
- Look for: **"anon" key** or **"anon public"** under **"Project API keys"**
- It's a LONG string starting with `eyJ...`
- **Copy this entire key** (it's usually 200+ characters)

---

## Step 5: Update Your Local Environment

Now let's update your `.env.local` file:

1. Open your project in VS Code
2. Open the `.env.local` file
3. Replace the values with your real credentials:

```env
# Add your Supabase credentials here
# Get these from: https://app.supabase.com/project/_/settings/api

VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_LONG_KEY_HERE
```

4. **Save the file**

---

## Step 6: Update Vercel Environment Variables

Your app is deployed on Vercel, so you need to add these there too:

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your **antigravity-portfolio-dhinesh** project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in the left sidebar
5. Add these two variables:

   **Variable 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://YOUR_PROJECT_ID.supabase.co`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

   **Variable 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOi...YOUR_LONG_KEY_HERE`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

6. After adding both, click **"Redeploy"** on your latest deployment

---

## Step 7: Test Locally

1. **Restart your dev server**:
   ```bash
   # Stop the current server (Ctrl+C in terminal)
   # Then restart:
   npm run dev
   ```

2. Open `http://localhost:5173` in your browser

3. **Test the like button**:
   - Click the heart ❤️ button in the bottom-left
   - The count should increase
   - Open another browser window (or incognito)
   - You should see the same count!
   - Click the heart in the second window
   - Both windows should update instantly! ✨

---

## Step 8: Deploy to Vercel

Once it works locally, deploy to Vercel:

```bash
git add .env.local
git commit -m "Update Supabase credentials"
git push vercel main
```

Wait 2-3 minutes for deployment to complete.

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] SQL table created successfully
- [ ] Realtime enabled for `site_likes` table
- [ ] API credentials copied
- [ ] `.env.local` updated with real credentials
- [ ] Vercel environment variables added
- [ ] Local dev server restarted
- [ ] Like button works locally
- [ ] Real-time sync works (tested with 2 browser windows)
- [ ] Deployed to Vercel
- [ ] Like button works on production site

---

## 🎉 You're Done!

Your portfolio now has a fully functional, real-time like counter powered by Supabase!

### What You Get:
- ✅ Like counts persist across all devices
- ✅ Real-time updates (everyone sees changes instantly)
- ✅ Free tier (500 MB database, 2 GB bandwidth)
- ✅ Automatic backups
- ✅ No server management needed

---

## 🆘 Troubleshooting

### "Error fetching like count"
- Check that your credentials in `.env.local` are correct
- Make sure you copied the ENTIRE anon key (it's very long)
- Verify the SQL was executed successfully in Supabase

### Likes not updating in real-time
- Make sure Realtime is enabled for the `site_likes` table
- Check your Supabase project isn't paused (free tier auto-pauses after 7 days of inactivity)

### Can't find the anon key
- Go to: Settings → API → Look for "anon public" under "Project API keys"
- It's the long key, NOT the service_role key

### Need to reset the like count?
Run this in Supabase SQL Editor:
```sql
UPDATE site_likes SET like_count = 0 WHERE id = 1;
```

---

**Need help?** Check the [Supabase Documentation](https://supabase.com/docs) or ask me!
