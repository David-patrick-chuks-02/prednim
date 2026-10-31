import { createOrGetCustomer, createPaymentIntent } from "@/lib/bach";

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

    // Create or get Bach customer
    const customer = await createOrGetCustomer(
      email,
      name,
      email // Using email as userId for now
    );

    // Create payment intent
    const paymentIntent = await createPaymentIntent(
      customer.id,
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
