import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lffrryypartlludmjzqy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZnJyeXlwYXJ0bGx1ZG1qenF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzQ0MjQ3OCwiZXhwIjoyMTA5MDE4NDc4fQ.YP24tDmnCDXhY--GRN6Hx4S2v4CynEYhQqng2TXX99k"
);

console.log("FINAL VERIFICATION\n");
console.log("Checking if subscriptions exist in database...\n");

const { data, error } = await supabase
  .from("subscriptions")
  .select("*");

if (error) {
  console.log("❌ ERROR:", error.message);
} else {
  console.log(`✅ Found ${data?.length || 0} subscriptions in database:\n`);
  data?.forEach(sub => {
    const user = sub.user_id === "01d5d519-2e49-49b1-888d-4f21c29965e4" ? "david5@prednim.com ⭐" : "other user";
    console.log(`  • ID: ${sub.id}`);
    console.log(`    User: ${user}`);
    console.log(`    Plan: ${sub.plan_type}`);
    console.log(`    Status: ${sub.status}`);
    console.log(`    Expires: ${sub.current_period_end}\n`);
  });
}
