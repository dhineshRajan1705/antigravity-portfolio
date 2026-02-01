// Test Supabase Connection
import { supabase, isSupabaseConfigured } from './src/lib/supabase.js';

console.log('=== Supabase Connection Test ===');
console.log('Is Configured:', isSupabaseConfigured);
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Has Anon Key:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

if (isSupabaseConfigured) {
    // Test fetching data
    const testConnection = async () => {
        try {
            console.log('\nTesting database connection...');
            const { data, error } = await supabase
                .from('site_likes')
                .select('*')
                .eq('id', 1)
                .single();

            if (error) {
                console.error('❌ Error:', error.message);
                console.error('Full error:', error);
            } else {
                console.log('✅ Success! Data:', data);
            }
        } catch (err) {
            console.error('❌ Exception:', err);
        }
    };

    testConnection();
} else {
    console.log('❌ Supabase is not configured properly');
}
