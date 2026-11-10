import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { PREMIUM_BOOKS } from "@/lib/premiumBooks";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (user instanceof NextResponse) {
      return user;
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if user has active subscription
    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("status, plan_type")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (subError || !subscription) {
      return NextResponse.json(
        { error: "No active subscription" },
        { status: 403 }
      );
    }

    // Return premium books
    return NextResponse.json({
      books: PREMIUM_BOOKS,
      subscription: {
        plan: subscription.plan_type,
        status: subscription.status,
      },
    });
  } catch (error) {
    console.error("Error fetching premium books:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
