import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-middleware";

export async function POST(request: NextRequest) {
  // Check if user is admin
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

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

export async function GET(request: NextRequest) {
  // Check if user is admin
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const cookieStore = await cookies();

    // Create Supabase client with service role
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

    // Get all users from auth
    const { data, error: usersError } = await supabase.auth.admin.listUsers();

    if (usersError) {
      return NextResponse.json({ error: usersError.message }, { status: 500 });
    }

    const usersList = data?.users || [];

    // Get all subscriptions
    const { data: subscriptionsData, error: subsError } = await supabase
      .from("subscriptions")
      .select("*");

    if (subsError) {
      return NextResponse.json({ error: subsError.message }, { status: 500 });
    }

    const subscriptions = subscriptionsData || [];

    // Combine users with their subscriptions
    const combinedData = usersList.map((user: any) => {
      const subscription = subscriptions.find((sub: any) => sub.user_id === user.id);
      return {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || "N/A",
        created_at: user.created_at,
        subscription: subscription || null,
      };
    });

    return NextResponse.json({ users: combinedData, total: combinedData.length });
  } catch (error) {
    console.error("Admin list error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
