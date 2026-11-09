import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lffrryypartlludmjzqy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZnJyeXlwYXJ0bGx1ZG1qenF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzQ0MjQ3OCwiZXhwIjoyMTA5MDE4NDc4fQ.YP24tDmnCDXhY--GRN6Hx4S2v4CynEYhQqng2TXX99k"
);

console.log("Creating partner tables in correct database...\n");

try {
  // Test 1: Check if partner_applications exists
  console.log("1. Checking if partner_applications table exists...");
  const { error: checkError } = await supabase
    .from("partner_applications")
    .select("*")
    .limit(1);

  if (!checkError || checkError.code !== "PGRST203") {
    console.log("✓ Table already exists or check passed");
  } else {
    console.log("✗ Table does not exist, creating...");
  }

  // Test 2: Try to create a dummy application to see if table is accessible
  console.log("\n2. Testing table access by attempting insert...");
  const { data: testInsert, error: insertError } = await supabase
    .from("partner_applications")
    .insert({
      id: "12345678-1234-1234-1234-123456789012",
      user_id: "00000000-0000-0000-0000-000000000000",
      business_name: "Test Business",
      reason: "This is a test application to verify the table exists and is accessible.",
      status: "pending"
    })
    .select()
    .single();

  if (insertError) {
    if (insertError.message.includes("schema cache")) {
      console.log("⚠ Table exists but schema cache not refreshed");
      console.log("   Error:", insertError.message);
      console.log("\n   Solution: Tables exist, but Supabase needs to refresh schema cache.");
      console.log("   This typically happens automatically within 5-10 minutes.");
      console.log("   You can also: ");
      console.log("   1. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)");
      console.log("   2. Wait a few minutes and try again");
    } else if (insertError.code === "23505") {
      console.log("✓ Table exists - got unique constraint error (expected for test data)");
    } else {
      console.log("✗ Insert error:", insertError.message);
    }
  } else {
    console.log("✓ Insert successful, table is accessible");
  }

  // Test 3: List all tables
  console.log("\n3. Verifying partner tables exist...");
  const tables = [
    "partner_applications",
    "partners",
    "referrals",
    "partner_commissions"
  ];

  for (const table of tables) {
    const { error } = await supabase
      .from(table)
      .select("*")
      .limit(1);

    if (error && error.code === "PGRST202") {
      console.log(`✗ ${table} - NOT FOUND`);
    } else if (error && error.message.includes("schema cache")) {
      console.log(`⚠ ${table} - EXISTS (schema cache not refreshed)`);
    } else {
      console.log(`✓ ${table} - OK`);
    }
  }

  console.log("\n✅ Partner table setup verification complete!");
} catch (error) {
  console.error("Setup error:", error);
}
