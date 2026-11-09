import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";

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

    // Get partner profile
    const { data: partner, error: partnerError } = await supabase
      .from("partners")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (partnerError && partnerError.code !== "PGRST116") {
      return NextResponse.json({ error: partnerError.message }, { status: 500 });
    }

    if (!partner) {
      return NextResponse.json({
        partner: null,
        message: "Not a partner yet",
      });
    }

    // Get referrals with commission details
    const { data: referrals, error: referralsError } = await supabase
      .from("referrals")
      .select(
        `
        id,
        referred_email,
        status,
        created_at,
        partner_commissions (
          id,
          commission_amount,
          payment_status,
          created_at
        )
      `
      )
      .eq("partner_id", partner.id)
      .order("created_at", { ascending: false });

    if (referralsError) {
      console.error("Referrals error:", referralsError);
      return NextResponse.json({ error: referralsError.message }, { status: 500 });
    }

    // Calculate stats
    const totalReferrals = referrals?.length || 0;
    const activeReferrals = referrals?.filter((r: any) => r.status === "active").length || 0;
    const totalEarnings = (referrals || []).reduce((sum: number, r: any) => {
      return sum + (r.partner_commissions?.[0]?.commission_amount || 0);
    }, 0);
    const pendingEarnings = (referrals || []).reduce((sum: number, r: any) => {
      const comm = r.partner_commissions?.[0];
      return sum + (comm?.payment_status === "pending" ? comm.commission_amount : 0);
    }, 0);

    return NextResponse.json({
      partner: {
        ...partner,
        stats: {
          totalReferrals,
          activeReferrals,
          totalEarnings,
          pendingEarnings,
        },
      },
      referrals,
    });
  } catch (error) {
    console.error("Partner dashboard error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
