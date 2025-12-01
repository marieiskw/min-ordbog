import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fwqsiqbatqaqznkpdxoq.supabase.co"; // ←あなたのURL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3cXNpcWJhdHFhcXpua3BkeG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMjgwMjEsImV4cCI6MjA3OTkwNDAyMX0.BjQmA0E0xIxyQhHsdNlz2VisJuJGKcsZ2k1iw-icxog";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
