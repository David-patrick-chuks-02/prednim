import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-middleware";

export async function GET(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

    // Test 1: Get users
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
      return NextResponse.json({
        step: "listUsers",
        error: userError.message
      }, { status: 500 });
    }

    // Test 2: Get subscriptions
    const { data: subsData, error: subsError } = await supabase
      .from("subscriptions")
      .select("*");

    if (subsError) {
      return NextResponse.json({
        step: "getSubscriptions",
        error: subsError.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      userDataType: typeof userData,
      userDataKeys: userData ? Object.keys(userData) : [],
      usersIsArray: Array.isArray(userData?.users),
      usersCount: userData?.users?.length || 0,
      subsDataType: typeof subsData,
      subsIsArray: Array.isArray(subsData),
      subsCount: subsData?.length || 0,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      errorType: error instanceof Error ? "Error" : typeof error,
    }, { status: 500 });
  }
}
