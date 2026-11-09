import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-middleware";

export async function POST(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
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

    const { csvContent } = await request.json();

    if (!csvContent) {
      return NextResponse.json(
        { error: "Missing csvContent in request body" },
        { status: 400 }
      );
    }

    // Get all auth users
    let allAuthUsers: any[] = [];
    let page = 1;
    while (true) {
      const { data, error: listError } = await supabase.auth.admin.listUsers({
        page,
        perPage: 50,
      });
      if (listError) throw listError;
      const users = Array.isArray(data?.users) ? data.users : [];
      allAuthUsers = allAuthUsers.concat(users);
      if (users.length < 50) break;
      page++;
    }

    console.log(`[Import] Found ${allAuthUsers.length} auth users`);

    // Parse CSV
    const lines = csvContent.trim().split("\n");
    const header = lines[0].split(",");
    const emailIdx = header.indexOf("email");
    const statusIdx = header.indexOf("payment_status");
    const createdAtIdx = header.indexOf("created_at");
    const amountIdx = header.indexOf("total_processed_amounts");

    const subscriptionsToInsert: any[] = [];
    const currentDate = new Date();
    let activeCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        // Basic CSV parsing (handle quoted fields)
        const parts: string[] = [];
        let current = "";
        let inQuotes = false;

        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === "," && !inQuotes) {
            parts.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }
        parts.push(current.trim());

        const email = parts[emailIdx]?.toLowerCase() || "";
        const status = parts[statusIdx]?.toLowerCase() || "";
        const createdAt = parts[createdAtIdx]?.trim() || "";
        const amountStr = parts[amountIdx]?.trim() || "";

        // Only process paid records
        if (status !== "paid" || !email || !createdAt) continue;

        // Find matching auth user
        const authUser = allAuthUsers.find(
          (u) => u.email?.toLowerCase() === email
        );
        if (!authUser) continue;

        // Calculate expiry (30 days from purchase)
        const purchaseDate = new Date(createdAt);
        const expiryDate = new Date(purchaseDate);
        expiryDate.setDate(expiryDate.getDate() + 30);

        const isActive = currentDate < expiryDate;
        if (isActive) activeCount++;

        subscriptionsToInsert.push({
          user_id: authUser.id,
          plan_type: "monthly",
          status: isActive ? "active" : "expired",
          current_period_start: purchaseDate.toISOString(),
          current_period_end: expiryDate.toISOString(),
          cancel_at_period_end: false,
        });
      } catch (err) {
        console.error(`[Import] Error parsing line ${i}:`, err);
        continue;
      }
    }

    if (subscriptionsToInsert.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No valid paid subscriptions found in CSV",
      });
    }

    // Upsert all subscriptions
    const { data: result, error: upsertError } = await supabase
      .from("subscriptions")
      .upsert(subscriptionsToInsert, { onConflict: "user_id" })
      .select();

    if (upsertError) {
      console.error("[Import] Upsert error:", upsertError);
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Imported ${subscriptionsToInsert.length} subscriptions`,
      details: {
        total: subscriptionsToInsert.length,
        active: activeCount,
        expired: subscriptionsToInsert.length - activeCount,
      },
    });
  } catch (error) {
    console.error("[Import] Fatal error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
