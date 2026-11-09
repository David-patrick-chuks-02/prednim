import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-middleware";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  const adminCheck = await requireAdmin(request);
  if (adminCheck instanceof NextResponse) {
    return adminCheck;
  }

  try {
    const { applicationId, approved, rejectionReason } = await request.json();

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID required" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get application
    const { data: application, error: appError } = await supabase
      .from("partner_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (appError || !application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    if (approved) {
      // Generate unique referral code
      const referralCode = `REF-${nanoid(12).toUpperCase()}`;

      // Create partner profile
      const { data: partner, error: partnerError } = await supabase
        .from("partners")
        .insert({
          user_id: application.user_id,
          application_id: applicationId,
          referral_code: referralCode,
          commission_rate: 10.0,
        })
        .select()
        .single();

      if (partnerError) {
        console.error("Partner creation error:", partnerError);
        return NextResponse.json(
          { error: partnerError.message },
          { status: 500 }
        );
      }

      // Update application status
      const { error: updateError } = await supabase
        .from("partner_applications")
        .update({
          status: "approved",
          reviewed_at: new Date().toISOString(),
          reviewed_by: adminCheck.id,
        })
        .eq("id", applicationId);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: "Partner application approved!",
        partner,
      });
    } else {
      // Reject application
      const { error: updateError } = await supabase
        .from("partner_applications")
        .update({
          status: "rejected",
          rejection_reason: rejectionReason || "Application not approved",
          reviewed_at: new Date().toISOString(),
          reviewed_by: adminCheck.id,
        })
        .eq("id", applicationId);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: "Application rejected",
      });
    }
  } catch (error) {
    console.error("Review application error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
