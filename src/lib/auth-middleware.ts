import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function getAuthenticatedUser(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export function getAdminEmails(): string[] {
  const adminEmailsStr =
    process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
    process.env.ADMIN_EMAILS ||
    "";

  return adminEmailsStr
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0);
}

export async function isAdmin(request: NextRequest): Promise<boolean> {
  const user = await getAuthenticatedUser(request);
  if (!user?.email) return false;

  const adminEmails = getAdminEmails();
  const userEmail = user.email.toLowerCase();

  const isAdminUser = adminEmails.includes(userEmail);

  if (!isAdminUser) {
    console.warn(`Admin check failed for ${userEmail}. Admin emails: ${adminEmails.join(", ")}`);
  }

  return isAdminUser;
}

export async function requireAuth(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return user;
}

export async function requireAdmin(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  if (!user) {
    console.error("No authenticated user for admin check");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminEmails = getAdminEmails();
  const userEmail = (user.email || "").toLowerCase();

  if (!adminEmails.includes(userEmail)) {
    console.error(`Admin access denied for ${userEmail}. Admin emails configured: ${adminEmails.length}`);
    return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
  }

  return user;
}
