import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { env } from './env';

const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

// Initialize Supabase client if credentials are provided, otherwise export null
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false, // Server context should not persist sessions
        },
        realtime: {
          // Provide Node-compatible WebSocket implementation since Node < 22 lacks a native WebSocket constructor
          transport: ws as any,
        },
      })
    : null;

// Initialize Supabase Admin client for backend operations
export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        realtime: {
          transport: ws as any,
        },
      })
    : null;

if (!supabase) {
  console.warn(
    '⚠️ Supabase URL or Anon Key is missing in environment variables. Supabase integration is disabled.'
  );
} else {
  console.log('✅ Supabase client initialized.');
}

if (!supabaseAdmin) {
  console.warn(
    '⚠️ Supabase Service Role Key is missing. Admin-level Supabase operations will be disabled.'
  );
} else {
  console.log('✅ Supabase admin client initialized.');
}
