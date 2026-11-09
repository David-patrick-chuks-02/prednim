import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lffrryypartlludmjzqy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZnJyeXlwYXJ0bGx1ZG1qenF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzQ0MjQ3OCwiZXhwIjoyMTA5MDE4NDc4fQ.YP24tDmnCDXhY--GRN6Hx4S2v4CynEYhQqng2TXX99k"
);

console.log("1. Checking if subscriptions table exists...");
const { data: tables, error: tablesError } = await supabase
  .from("subscriptions")
  .select("*")
  .limit(1);

if (tablesError) {
  console.log("ERROR:", tablesError.message);
  console.log("\n2. Trying to create subscriptions table...");

  // Try creating the table via rpc
  const { data: rpcData, error: rpcError } = await supabase.rpc("exec_sql", {
    sql: `CREATE TABLE IF NOT EXISTS public.subscriptions (
      id BIGSERIAL PRIMARY KEY,
      user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
      plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'sixmonth', 'annual')),
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due')),
      current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      current_period_end TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '1 month'),
      cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );`
  });

  if (rpcError) {
    console.log("RPC exec not available:", rpcError.message);
    console.log("\nTrying direct insert instead...");

    // Just try to insert
    const { data: sub, error: subError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: "01d5d519-2e49-49b1-888d-4f21c29965e4",
        plan_type: "monthly",
        status: "active",
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      })
      .select()
      .single();

    if (subError) {
      console.log("Insert error:", subError);
    } else {
      console.log("Subscription created:", sub);
    }
  } else {
    console.log("Table created via RPC");
  }
} else {
  console.log("Table exists. Records:", tables?.length || 0);

  if (tables && tables.length > 0) {
    console.log("Sample record:", tables[0]);
  }
}

// Try to query for the specific user
console.log("\n3. Querying for user 01d5d519-2e49-49b1-888d-4f21c29965e4...");
const { data: sub, error: subError } = await supabase
  .from("subscriptions")
  .select("*")
  .eq("user_id", "01d5d519-2e49-49b1-888d-4f21c29965e4")
  .maybeSingle();

if (subError) {
  console.log("ERROR:", subError);
} else {
  console.log("Subscription:", sub);
}
