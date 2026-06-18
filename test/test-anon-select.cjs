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

async function check() {
  try {
    // Check if we can select whitelist record anonymously
    const { data: wlData, error: wlError } = await supabase
      .from('student_whitelist')
      .select('*')
      .limit(1);
    console.log('student_whitelist anon select:', wlError ? wlError.message : `Found ${wlData?.length || 0} records`);

    // Check if we can select companies anonymously
    const { data: compData, error: compError } = await supabase
      .from('companies')
      .select('*')
      .limit(1);
    console.log('companies anon select:', compError ? compError.message : `Found ${compData?.length || 0} records`);

    console.log("\n✅ Connection test successful!");
  } catch (err) {
    console.error("❌ Connection test failed:", err.message);
    process.exit(1);
  }
}

check();
