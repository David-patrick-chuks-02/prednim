import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from("subscriptions")
  .select("*")
  .eq("user_id", "01d5d519-2e49-49b1-888d-4f21c29965e4")
  .maybeSingle();

console.log("Data:", data);
console.log("Error:", error);
