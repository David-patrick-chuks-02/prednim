/**
 * Bach Payment Integration
 * API Docs: https://docs.bachs.io/developer-portal/api-keys
 * Payment Docs: https://docs.bachs.io/guides/payments/overview
 */

export interface BachPaymentIntent {
  id: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  amount: number;
  currency: string;
  customer_id: string;
  plan_type: 'monthly' | 'sixmonth' | 'annual';
  metadata: Record<string, any>;
  created_at: string;
}

export interface BachCustomer {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface BachSubscription {
  id: string;
  customer_id: string;
  plan_type: 'monthly' | 'sixmonth' | 'annual';
  status: 'active' | 'cancelled' | 'past_due';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

// Bach uses a single API key format: sbp_live_xxxxx or sbp_test_xxxxx
const BACH_API_URL = process.env.BACH_API_URL || 'https://api.bachs.io/v1';
const BACH_API_KEY = process.env.BACH_API_KEY;

if (!BACH_API_KEY) {
  console.error('Missing BACH_API_KEY in environment variables');
}

/**
 * Create a payment intent for a subscription
 */
export async function createPaymentIntent(
  customerId: string,
  planType: 'monthly' | 'sixmonth' | 'annual',
  email: string,
  name: string
): Promise<BachPaymentIntent> {
  const prices = {
    monthly: 10000, // $100.00 in cents
    sixmonth: 50000, // $500.00 in cents
    annual: 100000, // $1000.00 in cents
  };

  const response = await fetch(`${BACH_API_URL}/payment_intents`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BACH_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: prices[planType],
      currency: 'USD',
      customer_id: customerId,
      plan_type: planType,
      description: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Subscription - PredNim`,
      metadata: {
        email,
        name,
        plan_type: planType,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Bach API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create or get a customer
 */
export async function createOrGetCustomer(
  email: string,
  name: string,
  userId: string
): Promise<BachCustomer> {
  const response = await fetch(`${BACH_API_URL}/customers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BACH_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name,
      metadata: {
        user_id: userId,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Bach API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create a subscription
 */
export async function createSubscription(
  customerId: string,
  planType: 'monthly' | 'sixmonth' | 'annual',
  paymentIntentId: string
): Promise<BachSubscription> {
  const response = await fetch(`${BACH_API_URL}/subscriptions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BACH_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer_id: customerId,
      plan_type: planType,
      payment_intent_id: paymentIntentId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Bach API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get subscription details
 */
export async function getSubscription(subscriptionId: string): Promise<BachSubscription> {
  const response = await fetch(`${BACH_API_URL}/subscriptions/${subscriptionId}`, {
    headers: {
      'Authorization': `Bearer ${BACH_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Bach API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string): Promise<BachSubscription> {
  const response = await fetch(`${BACH_API_URL}/subscriptions/${subscriptionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${BACH_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Bach API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const crypto = require('crypto');
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return hash === signature;
}

/**
 * Generate payment button HTML for inline payment
 */
export function generatePaymentButtonHTML(paymentIntentId: string): string {
  return `
    <form action="https://bachs.io/pay" method="POST">
      <input type="hidden" name="payment_intent_id" value="${paymentIntentId}" />
      <button type="submit">Pay with Bach</button>
    </form>
  `;
}

/**
 * Verify API key is configured
 */
export function verifyBachApiKey(): boolean {
  if (!BACH_API_KEY) {
    throw new Error('Bach API key (BACH_API_KEY) not configured in environment variables');
  }
  return true;
}
