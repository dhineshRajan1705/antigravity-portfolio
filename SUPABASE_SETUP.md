# Supabase Setup Guide for Like Counter

This guide will help you set up Supabase to track likes on your portfolio site.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up (free tier available)
3. Create a new project
   - Choose a project name
   - Create a database password (save this!)
   - Select a region close to your users
   - Wait for the project to initialize (~2 minutes)

## Step 2: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste this SQL code:

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

4. Click **Run** to execute the SQL

## Step 3: Enable Realtime (Optional but Recommended)

1. In the Supabase dashboard, go to **Database** → **Replication**
2. Find the `site_likes` table
3. Toggle **Enable Realtime** ON
4. This allows all users to see like count updates in real-time!

## Step 4: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (under "Project API keys")

## Step 5: Add Credentials to Your Project

1. Open the `.env.local` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **IMPORTANT**: Never commit `.env.local` to Git!
4. Add this to your `.gitignore` file if not already there:

```
.env.local
```

## Step 6: Restart Your Dev Server

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## Step 7: Test It!

1. Open your site in the browser
2. Click the heart button in the bottom-left of the Hero section
3. The like count should increase
4. Open the site in another browser/incognito window
5. You should see the same like count!
6. Click the heart in the second browser - both should update instantly!

## Troubleshooting

### "Error fetching like count"
- Check that your Supabase credentials in `.env.local` are correct
- Verify the SQL was executed successfully
- Check browser console for detailed error messages

### Likes not updating in real-time
- Make sure Realtime is enabled for the `site_likes` table
- Check your Supabase project isn't paused (free tier auto-pauses after inactivity)

### Reset the like count
Run this SQL in Supabase SQL Editor:
```sql
UPDATE site_likes SET like_count = 0 WHERE id = 1;
```

## Security Notes

- The current setup allows anyone to increment/decrement likes
- For production, you might want to add rate limiting or user authentication
- The anon key is safe to expose in frontend code
- Never expose your service_role key in frontend code

## Deployment

When deploying to production (Vercel, Netlify, etc.):
1. Add the same environment variables in your hosting platform's dashboard
2. Usually found under Settings → Environment Variables
3. Add both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

## Free Tier Limits

Supabase free tier includes:
- 500 MB database space
- 2 GB bandwidth
- 50,000 monthly active users
- Unlimited API requests

Perfect for a portfolio site! 🚀

---

**Need help?** Check [Supabase Documentation](https://supabase.com/docs)
