import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lffrryypartlludmjzqy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZnJyeXlwYXJ0bGx1ZG1qenF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzQ0MjQ3OCwiZXhwIjoyMTA5MDE4NDc4fQ.YP24tDmnCDXhY--GRN6Hx4S2v4CynEYhQqng2TXX99k"
);

console.log("Creating subscription for user 01d5d519-2e49-49b1-888d-4f21c29965e4...");

const { data: sub, error: subError } = await supabase
  .from("subscriptions")
  .upsert({
    user_id: "01d5d519-2e49-49b1-888d-4f21c29965e4",
    plan_type: "monthly",
    status: "active",
    current_period_start: new Date().toISOString(),
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  }, {
    onConflict: "user_id"
  })
  .select()
  .single();

if (subError) {
  console.log("ERROR:", subError);
} else {
  console.log("✅ Subscription created:", sub);
}

// Verify
console.log("\nVerifying...");
const { data: verify, error: verifyError } = await supabase
  .from("subscriptions")
  .select("*")
  .eq("user_id", "01d5d519-2e49-49b1-888d-4f21c29965e4")
  .maybeSingle();

if (verifyError) {
  console.log("Verification error:", verifyError);
} else {
  console.log("Verified subscription:", verify);
}
