import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

export async function POST(request: NextRequest) {
  const user = await requireAuth(request);
  if (user instanceof NextResponse) {
    return user;
  }

  try {
    const cookieStore = await cookies();
    const { businessName, website, phone, reason } = await request.json();

    if (!businessName || !reason) {
      return NextResponse.json(
        { error: "Business name and reason are required" },
        { status: 400 }
      );
    }

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

    // Check if user already has application or is partner
    const { data: existingApp } = await supabase
      .from("partner_applications")
      .select("id, status")
      .eq("user_id", user.id)
      .single();

    if (existingApp) {
      if (existingApp.status === "pending") {
        return NextResponse.json(
          { error: "You already have a pending application" },
          { status: 400 }
        );
      }
      if (existingApp.status === "approved") {
        return NextResponse.json(
          { error: "You are already a partner" },
          { status: 400 }
        );
      }
    }

    // Create application
    const { data, error } = await supabase
      .from("partner_applications")
      .insert({
        user_id: user.id,
        email: user.email,
        business_name: businessName,
        website: website || null,
        phone: phone || null,
        reason,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Partner application error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted! Admin will review and notify you.",
      application: data,
    });
  } catch (error) {
    console.error("Partner apply error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (user instanceof NextResponse) {
    return user;
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

    // Get user's own application
    const { data, error } = await supabase
      .from("partner_applications")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ application: data || null });
  } catch (error) {
    console.error("Get application error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
