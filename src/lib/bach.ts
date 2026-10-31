/**
 * Bach Payment Integration
 * API Docs: https://docs.bachs.io/developer-portal/api-keys
 * Payment Docs: https://docs.bachs.io/guides/payments/overview
 */

export interface BachPaymentIntent {
  id: string;
  url: string;
  plan_type: 'monthly' | 'sixmonth' | 'annual';
  amount: number;
  currency: string;
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

// Pre-created payment links from Bach dashboard
// To create new payment links, log into Bach dashboard at https://dash.bachs.io
const PAYMENT_LINKS = {
  monthly: {
    id: 'pl_48296c2ff15c',
    amount: 10000, // $100.00
  },
  sixmonth: {
    id: 'pl_48296c2ff15c', // Create 6-month link in Bach dashboard and update ID
    amount: 50000, // $500.00
  },
  annual: {
    id: 'pl_48296c2ff15c', // Create annual link in Bach dashboard and update ID
    amount: 100000, // $1000.00
  },
};

/**
 * Get payment link for a plan
 * Payment links are pre-created in Bach dashboard
 * Redirect user to: https://checkout.bachs.io/pay/{payment_link_id}?success_url={return_url}
 */
export async function createPaymentIntent(
  customerId: string,
  planType: 'monthly' | 'sixmonth' | 'annual',
  email: string,
  name: string
): Promise<BachPaymentIntent> {
  const link = PAYMENT_LINKS[planType];

  if (!link) {
    throw new Error(`No payment link configured for plan: ${planType}`);
  }

  // Add success return URL for after payment
  const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://prednim.xyz'}/success`;
  const paymentUrl = `https://checkout.bachs.io/pay/${link.id}?success_url=${encodeURIComponent(successUrl)}`;

  return {
    id: link.id,
    url: paymentUrl,
    plan_type: planType,
    amount: link.amount,
    currency: 'USD',
  };
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
