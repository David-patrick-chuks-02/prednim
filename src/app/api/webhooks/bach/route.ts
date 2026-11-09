import { verifyWebhookSignature } from "@/lib/bach";
import { createServerClient } from "@supabase/ssr";
import { headers } from "next/headers";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const signature = headersList.get("x-bach-signature");
    const body = await request.text();

    console.log(`[Bach Webhook] Received event`, { signature: signature?.slice(0, 10) + "..." });

    if (!signature) {
      console.error("[Bach Webhook] Missing signature header");
      return new Response(JSON.stringify({ error: "Missing signature" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    // Verify webhook signature
    const secret = process.env.BACH_WEBHOOK_SECRET;
    if (!secret || secret.includes("test_xxxxx")) {
      console.error("[Bach Webhook] Missing or invalid BACH_WEBHOOK_SECRET in environment");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const isValid = verifyWebhookSignature(body, signature, secret);
    if (!isValid) {
      console.error("[Bach Webhook] Invalid signature - secret may be misconfigured");
      return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    const event = JSON.parse(body);
    console.log(`[Bach Webhook] Processing event type: ${event.type}`);

    // Initialize Supabase server client
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event, supabase);
        break;

      case "payment_intent.failed":
        await handlePaymentFailed(event, supabase);
        break;

      case "subscription.created":
        await handleSubscriptionCreated(event, supabase);
        break;

      case "subscription.cancelled":
        await handleSubscriptionCancelled(event, supabase);
        break;

      default:
        console.log(`[Bach Webhook] Unhandled webhook event: ${event.type}`);
    }

    console.log(`[Bach Webhook] Successfully processed ${event.type}`);
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("[Bach Webhook] Processing error:", error instanceof Error ? error.message : error);
    return new Response(JSON.stringify({ error: "Processing failed" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

async function handlePaymentSucceeded(event: any, supabase: any) {
  const { data: paymentIntent } = event;

  if (!paymentIntent) {
    throw new Error("Missing paymentIntent in event data");
  }

  const userId = paymentIntent.metadata?.user_id;
  if (!userId) {
    throw new Error("Missing user_id in payment metadata");
  }

  console.log(`[Bach] Processing payment for user: ${userId}`);

  // Create or update subscription in database
  const { error } = await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      plan_type: paymentIntent.plan_type || "monthly",
      price: paymentIntent.amount ? paymentIntent.amount / 100 : 0,
      status: "active",
      current_period_start: new Date().toISOString(),
      current_period_end: calculateExpiryDate(paymentIntent.plan_type),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error(`[Bach] Failed to update subscription for user ${userId}:`, error);
    throw error;
  }

  console.log(`[Bach] Payment succeeded and subscription created for user: ${userId}`);
}

async function handlePaymentFailed(event: any, supabase: any) {
  const { data: paymentIntent } = event;

  if (!paymentIntent) {
    console.error("Missing paymentIntent in payment failed event");
    return;
  }

  console.log(`Payment failed for customer: ${paymentIntent.customer_id}`);
  // You could send an email notification here
}

async function handleSubscriptionCreated(event: any, supabase: any) {
  const { data: subscription } = event;

  if (!subscription || !subscription.user_id) {
    console.error("Missing subscription or user_id in subscription created event");
    return;
  }

  const { error } = await supabase
    .from("subscriptions")
    .update({ status: "active" })
    .eq("user_id", subscription.user_id);

  if (error) {
    console.error("Failed to update subscription status:", error);
  }
}

async function handleSubscriptionCancelled(event: any, supabase: any) {
  const { data: subscription } = event;

  if (!subscription || !subscription.user_id) {
    console.error("Missing subscription or user_id in subscription cancelled event");
    return;
  }

  const { error } = await supabase
    .from("subscriptions")
    .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
    .eq("user_id", subscription.user_id);

  if (error) {
    console.error("Failed to cancel subscription:", error);
  }
}

function calculateExpiryDate(planType: string): string {
  const now = new Date();
  let days = 30; // monthly default

  if (planType === "sixmonth") {
    days = 180;
  } else if (planType === "annual") {
    days = 365;
  }

  const expiry = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return expiry.toISOString();
}
