import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const { referral_code, referred_user_id, referred_email } = await request.json();

    if (!referral_code || !referred_email) {
      return NextResponse.json(
        { error: "Referral code and email required" },
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

    // Find partner by referral code
    const { data: partner, error: partnerError } = await supabase
      .from("partners")
      .select("id")
      .eq("referral_code", referral_code)
      .single();

    if (partnerError || !partner) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 404 }
      );
    }

    // Check if referral already exists
    const { data: existingReferral } = await supabase
      .from("referrals")
      .select("id")
      .eq("partner_id", partner.id)
      .eq("referred_email", referred_email)
      .single();

    if (existingReferral) {
      return NextResponse.json({
        success: true,
        message: "Referral already tracked",
      });
    }

    // Create referral record
    const { error: referralError } = await supabase
      .from("referrals")
      .insert({
        partner_id: partner.id,
        referred_user_id,
        referred_email,
        status: "pending",
      });

    if (referralError) {
      console.error("Referral creation error:", referralError);
      return NextResponse.json(
        { error: referralError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Referral tracked successfully",
    });
  } catch (error) {
    console.error("Track referral error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
