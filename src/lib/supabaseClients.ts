import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dwvimgujxqqxxpttayxe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3dmltZ3VqeHFxeHhwdHRheXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2OTkyNzcsImV4cCI6MjA3NzI3NTI3N30.Oi9Uy1JFpePhUDpO1e8eFyhybW38joqHumj1Ce_N34M"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

