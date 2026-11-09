import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, getAdminEmails } from "@/lib/auth-middleware";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    const adminEmails = getAdminEmails();

    return NextResponse.json({
      authenticated: !!user,
      user: user ? { id: user.id, email: user.email } : null,
      adminEmails: adminEmails,
      isAdmin: user ? adminEmails.includes((user.email || "").toLowerCase()) : false,
      cookies: request.cookies.getAll().map(c => ({ name: c.name, value: c.value.substring(0, 20) + "..." })),
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
    }, { status: 500 });
  }
}
