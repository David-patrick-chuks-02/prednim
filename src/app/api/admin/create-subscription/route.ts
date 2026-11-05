import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    // Create Supabase client with service role for admin operations
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const { user_id, plan_type } = await request.json();

    if (!user_id || !plan_type) {
      return NextResponse.json(
        { error: "Missing required fields: user_id, plan_type" },
        { status: 400 }
      );
    }

    // Insert/update subscription
    const { data, error } = await supabase
      .from("subscriptions")
      .upsert(
        {
          user_id,
          plan_type,
          status: "active",
          current_period_start: new Date(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          cancel_at_period_end: false,
        },
        {
          onConflict: "user_id",
        }
      )
      .select();

    if (error) {
      console.error("Subscription creation error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Admin route error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
