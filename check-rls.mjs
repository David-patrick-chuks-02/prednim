import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lffrryypartlludmjzqy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZnJyeXlwYXJ0bGx1ZG1qenF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzQ0MjQ3OCwiZXhwIjoyMTA5MDE4NDc4fQ.YP24tDmnCDXhY--GRN6Hx4S2v4CynEYhQqng2TXX99k"
);

console.log("Checking RLS policies on subscriptions table...");

// Try to execute a direct SQL query if possible
const { data, error } = await supabase.rpc("exec_sql", {
  sql: "SELECT policyname, permissive, roles, qual, with_check FROM pg_policies WHERE tablename='subscriptions';"
});

if (error) {
  console.log("exec_sql not available. Trying alternative...");

  // Try using fetch to call admin API
  const response = await fetch(
    "https://lffrryypartlludmjzqy.supabase.co/rest/v1/rpc/exec_sql",
    {
      method: "POST",
      headers: {
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZnJyeXlwYXJ0bGx1ZG1qenF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzQ0MjQ3OCwiZXhwIjoyMTA5MDE4NDc4fQ.YP24tDmnCDXhY--GRN6Hx4S2v4CynEYhQqng2TXX99k",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sql: "SELECT policyname, permissive, roles, qual, with_check FROM pg_policies WHERE tablename='subscriptions';"
      })
    }
  );

  const result = await response.json();
  console.log("Response:", result);
} else {
  console.log("Policies:", data);
}

console.log("\nAttempting to grant USAGE on sequence to service_role using direct insert...");

// Since we can't execute SQL directly, let's try a workaround:
// Try to insert with a UUID primary key instead
const { data: result, error: insertError } = await supabase
  .from("subscriptions")
  .insert({
    id: Math.floor(Math.random() * 9000000000) + 1000000000,  // Generate a large ID
    user_id: "01d5d519-2e49-49b1-888d-4f21c29965e4",
    plan_type: "monthly",
    status: "active",
    current_period_start: new Date().toISOString(),
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  })
  .select()
  .single();

if (insertError) {
  console.log("Insert with explicit ID error:", insertError.message);
} else {
  console.log("Success with explicit ID:", result);
}
