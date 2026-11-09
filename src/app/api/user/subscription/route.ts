import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

export async function GET(request: NextRequest) {
  // Force schema cache refresh by making fresh Supabase client connection
  const user = await requireAuth(request);
  if (user instanceof NextResponse) {
    return user;
  }

  if (!user || !user.id) {
    console.error("User object missing id:", user);
    return NextResponse.json({
      error: "User ID not found",
      userKeys: user ? Object.keys(user) : null
    }, { status: 400 });
  }

  try {
    const cookieStore = await cookies();
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

    console.log("[Subscription] User ID:", user.id, "Email:", user.email);
    console.log("[Subscription] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("[Subscription] Service Role Key:", process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) + "...");

    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    console.log("[Subscription] Query result:", { found: !!subscription, error: error?.message, subscription });

    if (error) {
      console.error("[Subscription] Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      subscription,
      debug: { userId: user.id, email: user.email }
    });
  } catch (error) {
    console.error("[Subscription] Exception:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
