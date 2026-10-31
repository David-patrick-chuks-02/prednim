import { createPaymentIntent } from "@/lib/bach";

export async function POST(request: Request) {
  try {
    const { planType, email, name } = await request.json();

    // Validate input
    if (!planType || !email || !name) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["monthly", "sixmonth", "annual"].includes(planType)) {
      return Response.json(
        { error: "Invalid plan type" },
        { status: 400 }
      );
    }

    // Get payment link (no customer creation needed)
    const paymentIntent = await createPaymentIntent(
      "", // customerId not needed anymore
      planType as "monthly" | "sixmonth" | "annual",
      email,
      name
    );

    return Response.json(paymentIntent);
  } catch (error) {
    console.error("Payment intent creation error:", error);
    return Response.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
