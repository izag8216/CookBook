// lib/supabase.ts

import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://infbbsubfkpxpsmdjwvb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZmJic3ViZmtweHBzbWRqd3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2MjkxNTIsImV4cCI6MjA0MTIwNTE1Mn0.R65qcz4eG550plWMMK-2-u7604JEAcxGli8i0mlMip8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});