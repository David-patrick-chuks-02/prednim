import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-middleware";

export async function POST(request: NextRequest) {
  // Check if user is admin
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    // Use createClient directly to bypass SSR schema caching issues
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
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
          id: Math.floor(Math.random() * 9000000000) + 1000000000,
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
    // Use createClient directly to bypass SSR schema caching issues
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get all users from auth with pagination (50 users per page)
    let allUsers: any[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const { data, error: usersError } = await supabase.auth.admin.listUsers({
        page,
        perPage: 50,
      });

      if (usersError) {
        console.error(`Error fetching users page ${page}:`, usersError);
        return NextResponse.json({ error: usersError.message }, { status: 500 });
      }

      const pageUsers = Array.isArray(data?.users) ? data.users : [];
      allUsers = allUsers.concat(pageUsers);

      // If we got fewer than 50 users, there are no more pages
      hasMore = pageUsers.length === 50;
      page++;
    }

    const usersList = allUsers;

    if (!Array.isArray(usersList)) {
      console.error("usersList is not an array:", typeof usersList, usersList);
      return NextResponse.json({ error: "Failed to parse users list" }, { status: 500 });
    }

    // Get all subscriptions
    const { data: subscriptionsData, error: subsError } = await supabase
      .from("subscriptions")
      .select("*");

    if (subsError) {
      console.error("Subscriptions query error:", subsError);
      return NextResponse.json({ error: subsError.message }, { status: 500 });
    }

    const subscriptions = Array.isArray(subscriptionsData) ? subscriptionsData : [];

    // Combine users with their subscriptions
    const combinedData = usersList.map((user: any) => {
      const subscription = Array.isArray(subscriptions) ? subscriptions.find((sub: any) => sub.user_id === user.id) : null;
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

