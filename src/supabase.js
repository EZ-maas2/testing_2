import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ztgbmwbbsfdhtoljwrii.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0Z2Jtd2Jic2ZkaHRvbGp3cmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUwNDk0MzcsImV4cCI6MTk3MDYyNTQzN30.nzJR2h_EBgaeXk01ztHJEIvleBPeNo9U9VTkWEbK_TQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)