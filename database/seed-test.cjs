const ws = require("ws");
globalThis.WebSocket = ws;

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, key);

async function seed() {
  try {
    const { data: wlData, error: wlError } = await supabase
      .from('student_whitelist')
      .insert([
        { 
          email: 'student@karta.com',
          name: 'Test Student',
          university: 'Test University',
          course: 'Computer Science',
          year_of_study: '2nd Year'
        }
      ])
      .select();
    
    console.log('student_whitelist insertion:', wlError ? `❌ ${wlError.message}` : `✅ ${wlData?.length || 0} records inserted`);

    const { data: compData, error: compError } = await supabase
      .from('companies')
      .insert([
        {
          name: 'Tech Company',
          contact_email: 'company@karta.com',
          industry: 'Technology',
          website: 'https://company.com'
        }
      ])
      .select();
    
    console.log('companies insertion:', compError ? `❌ ${compError.message}` : `✅ ${compData?.length || 0} records inserted`);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
