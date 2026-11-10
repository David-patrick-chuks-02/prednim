import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const authKey = request.headers.get("x-setup-key");

  // Simple auth check
  if (authKey !== process.env.SETUP_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        db: {
          schema: "public",
        },
      }
    );

    // Check if table already exists
    const { data: tables, error: checkError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .eq("table_name", "contact_submissions");

    if (!checkError && tables && tables.length > 0) {
      return NextResponse.json({
        success: true,
        message: "contact_submissions table already exists",
      });
    }

    // Create table by inserting dummy data first (workaround for schema cache)
    // Then we'll query it to ensure it exists
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        email: "test@prednim.com",
        name: "Test",
        subject: "Setup",
        message: "Table initialization test",
        status: "unread",
      });

    if (insertError && !insertError.message.includes("relation")) {
      return NextResponse.json(
        { error: insertError.message, details: insertError },
        { status: 500 }
      );
    }

    // Try to query to verify table exists
    const { data: existing, error: queryError } = await supabase
      .from("contact_submissions")
      .select("*")
      .limit(1);

    if (queryError) {
      return NextResponse.json(
        { error: "Table creation failed", details: queryError },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "contact_submissions table created successfully",
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
