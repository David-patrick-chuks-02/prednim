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

    // Test 1: Get all users with pagination
    let allUsers: any[] = [];
    let page = 1;
    let totalFetched = 0;

    while (true) {
      const { data: userData, error: userError } = await supabase.auth.admin.listUsers({
        page,
        perPage: 50,
      });

      if (userError) {
        return NextResponse.json({
          step: "listUsers",
          error: userError.message
        }, { status: 500 });
      }

      const pageUsers = Array.isArray(userData?.users) ? userData.users : [];
      allUsers = allUsers.concat(pageUsers);
      totalFetched += pageUsers.length;

      if (pageUsers.length < 50) break;
      page++;
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
      totalUsersCount: allUsers.length,
      totalPages: Math.ceil(allUsers.length / 50),
      subsCount: subsData?.length || 0,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      errorType: error instanceof Error ? "Error" : typeof error,
    }, { status: 500 });
  }
}
