-- Create table to log who liked the site
CREATE TABLE IF NOT EXISTS likes_log (
  id BIGSERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  liked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE likes_log ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert
CREATE POLICY "Anyone can add likes" ON likes_log
  FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to read (optional - if you want to show who liked)
CREATE POLICY "Anyone can view likes" ON likes_log
  FOR SELECT USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS likes_log_liked_at_idx ON likes_log(liked_at DESC);
