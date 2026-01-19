import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create Supabase client if valid credentials are provided
const isValidConfig = supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co');

export const supabase = isValidConfig 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any; // Fallback when Supabase is not configured

export const isSupabaseConfigured = isValidConfig;

// Database types
export interface SiteLikes {
  id: number;
  like_count: number;
  updated_at: string;
}
