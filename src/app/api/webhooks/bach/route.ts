import { verifyWebhookSignature } from "@/lib/bach";
import { createServerClient } from "@supabase/ssr";
import { headers } from "next/headers";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const signature = headersList.get("x-bach-signature");
    const body = await request.text();

    if (!signature) {
      return new Response("Missing signature", { status: 401 });
    }

    // Verify webhook signature
    const secret = process.env.BACH_WEBHOOK_SECRET!;
    const isValid = verifyWebhookSignature(body, signature, secret);

    if (!isValid) {
      return new Response("Invalid signature", { status: 401 });
    }

    const event = JSON.parse(body);

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
        console.log(`Unhandled webhook event: ${event.type}`);
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response("Webhook processing failed", { status: 500 });
  }
}

async function handlePaymentSucceeded(event: any, supabase: any) {
  const { data: paymentIntent } = event;

  // Create or update subscription in database
  const { error } = await supabase.from("subscriptions").upsert(
    {
      user_id: paymentIntent.metadata.user_id || paymentIntent.customer_email,
      plan_type: paymentIntent.plan_type,
      price: paymentIntent.amount / 100,
      status: "active",
      started_at: new Date().toISOString(),
      expires_at: calculateExpiryDate(paymentIntent.plan_type),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("Failed to update subscription:", error);
    throw error;
  }

  console.log("Payment succeeded and subscription created");
}

async function handlePaymentFailed(event: any, supabase: any) {
  const { data: paymentIntent } = event;

  console.log(`Payment failed for customer: ${paymentIntent.customer_id}`);
  // You could send an email notification here
}

async function handleSubscriptionCreated(event: any, supabase: any) {
  const { data: subscription } = event;

  const { error } = await supabase.from("subscriptions").update(
    { status: "active" },
    { eq: "id", value: subscription.id }
  );

  if (error) {
    console.error("Failed to update subscription status:", error);
  }
}

async function handleSubscriptionCancelled(event: any, supabase: any) {
  const { data: subscription } = event;

  const { error } = await supabase.from("subscriptions").update(
    { status: "cancelled", cancelled_at: new Date().toISOString() },
    { eq: "id", value: subscription.id }
  );

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
