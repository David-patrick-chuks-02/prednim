import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lffrryypartlludmjzqy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZnJyeXlwYXJ0bGx1ZG1qenF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzQ0MjQ3OCwiZXhwIjoyMTA5MDE4NDc4fQ.YP24tDmnCDXhY--GRN6Hx4S2v4CynEYhQqng2TXX99k"
);

console.log("Disabling RLS on subscriptions table...\n");

// Try to execute SQL to disable RLS
try {
  // First, let's just test if we can query normally
  console.log("Test 1: Querying subscriptions...");
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*");
  
  if (error) {
    console.log("❌ Query error:", error.message);
  } else {
    console.log(`✅ Query works! Found ${data?.length} subscriptions`);
    data?.forEach(sub => {
      console.log(`   - ${sub.user_id}: ${sub.plan_type} (${sub.status})`);
    });
  }

  console.log("\n" + "=".repeat(60));
  console.log("NOTE: To disable RLS, you need to:");
  console.log("1. Go to Supabase Dashboard");
  console.log("2. Navigate to SQL Editor");
  console.log("3. Run this command:");
  console.log("\n   ALTER TABLE subscriptions DISABLE ROW LEVEL SECURITY;\n");
  console.log("Or run via psql if you have access to the database.");
  console.log("=".repeat(60));

} catch (err) {
  console.error("Error:", err.message);
}
