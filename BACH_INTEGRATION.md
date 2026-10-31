# Bach Payment Integration Guide

Complete guide to integrate Bach payments into PredNim subscription service.

## Overview

Bach is a payment processing platform. This guide shows how to:
- Accept payments for book subscriptions
- Handle webhook events
- Store subscription data in Supabase
- Manage subscription lifecycle

**Documentation**: https://docs.bachs.io/guides/payments/overview

## Setup Steps

### 1. Get Bach API Keys

1. Go to [bachs.io](https://bachs.io)
2. Create account and sign in
3. Navigate to Dashboard → API Keys
4. Copy your credentials:
   - **Publishable Key**: `pk_live_xxxxx` (public)
   - **Secret Key**: `sk_live_xxxxx` (keep secret!)
   - **Webhook Secret**: `whsec_xxxxx`

### 2. Update Environment Variables

Add to `.env.local`:

```
NEXT_PUBLIC_BACH_PUBLISHABLE_KEY=pk_live_xxxxx
BACH_SECRET_KEY=sk_live_xxxxx
BACH_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_BACH_API_URL=https://api.bachs.io/v1
BACH_API_VERSION=v1
```

Add to Vercel → Settings → Environment Variables:
- `NEXT_PUBLIC_BACH_PUBLISHABLE_KEY`
- `BACH_SECRET_KEY`
- `BACH_WEBHOOK_SECRET`

### 3. Configure Webhook

In [Bach Dashboard](https://dashboard.bachs.io):

1. Go to **Settings → Webhooks**
2. Click **Add Webhook**
3. Set URL to:
   ```
   https://your-app.vercel.app/api/webhooks/bach
   ```
4. Select events:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.failed`
   - ✅ `subscription.created`
   - ✅ `subscription.cancelled`
5. Copy the webhook secret to `.env.local`

## How It Works

### Payment Flow

```
User clicks "Complete Purchase"
    ↓
/checkout page creates payment intent
    ↓
POST /api/payments/create-intent
    ↓
Bach API creates payment intent
    ↓
User redirected to bachs.io/pay/{intent_id}
    ↓
User enters card details (handled by Bach)
    ↓
Bach processes payment
    ↓
Webhook: payment_intent.succeeded
    ↓
/api/webhooks/bach updates subscription in Supabase
    ↓
User can access dashboard
```

### Subscription Lifecycle

1. **Payment Succeeds** → Subscription marked "active"
2. **Expiry Approaches** → Send reminder email (implement later)
3. **User Cancels** → Mark as "cancelled"
4. **Payment Fails** → Mark as "failed", send retry email

## API Integration

### Create Payment Intent

**File**: `src/app/api/payments/create-intent/route.ts`

```typescript
POST /api/payments/create-intent
Content-Type: application/json

{
  "planType": "sixmonth",
  "email": "user@example.com",
  "name": "John Doe"
}

Response:
{
  "id": "pi_xxxxx",
  "status": "pending",
  "amount": 50000,
  "currency": "USD"
}
```

### Webhook Handler

**File**: `src/app/api/webhooks/bach/route.ts`

Handles these events:
- `payment_intent.succeeded` → Create subscription
- `payment_intent.failed` → Log failure
- `subscription.created` → Update status
- `subscription.cancelled` → Cancel subscription

## Database Schema

### Subscriptions Table

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  plan_type VARCHAR(50), -- 'monthly', 'sixmonth', 'annual'
  price DECIMAL(10, 2),
  status VARCHAR(50), -- 'active', 'cancelled', 'expired'
  bach_payment_id VARCHAR(255), -- Bach payment intent ID
  bach_subscription_id VARCHAR(255), -- Bach subscription ID
  started_at TIMESTAMP,
  expires_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP
);
```

## Testing

### Test Credentials

Bach provides test mode for development:

1. Use test keys (start with `pk_test_` and `sk_test_`)
2. Use test card: `4242 4242 4242 4242`
3. Any expiry date in future
4. Any CVC (e.g., `123`)

### Test Webhook Locally

Use ngrok to expose local server:

```bash
npm install -g ngrok
ngrok http 3005
```

Update Bach webhook URL to: `https://xxx.ngrok.io/api/webhooks/bach`

### Test Payment Flow

1. Go to `/checkout`
2. Select plan
3. Click "Complete Purchase"
4. Use test card `4242 4242 4242 4242`
5. Check `/dashboard` for active subscription
6. Check Supabase `subscriptions` table

## Production Checklist

- ✅ Use live keys (start with `pk_live_` and `sk_live_`)
- ✅ Update CORS settings in Bach dashboard
- ✅ Configure webhook URL to production domain
- ✅ Test payment flow end-to-end
- ✅ Set up email notifications
- ✅ Monitor webhook logs in Bach dashboard
- ✅ Set up error alerting
- ✅ Document refund process

## Payment Amounts

| Plan | Amount | Currency |
|------|--------|----------|
| Monthly | $100.00 | USD |
| 6 Months | $500.00 | USD |
| Annual | $1000.00 | USD |

## Common Issues

### "Invalid signature"
- Verify webhook secret is correct
- Check request body is not modified
- Use raw body for verification

### "Customer not found"
- Ensure user exists in Supabase
- Check email is not null
- Verify user permissions

### "Payment failed"
- Check card details are valid
- Verify amount is correct
- Check webhook is being called

## Email Notifications (Future)

After payment succeeds:
```
Subject: Welcome to PredNim!
Body:
  - Subscription details
  - First book recommendations
  - Link to dashboard
```

When subscription expires:
```
Subject: Your PredNim subscription is expiring
Body:
  - Days remaining
  - Renewal link
  - How to cancel
```

## Refunds

To process refunds:

1. Go to Bach Dashboard → Transactions
2. Find payment
3. Click "Refund"
4. Confirm amount
5. Webhook will handle status update

Backend API (future):
```typescript
export async function refundPayment(paymentIntentId: string) {
  const response = await fetch(
    `${BACH_API_URL}/refunds`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BACH_SECRET_KEY}`,
      },
      body: JSON.stringify({
        payment_intent_id: paymentIntentId,
      }),
    }
  );
  return response.json();
}
```

## Monitoring

### Bach Dashboard

- View all transactions
- Monitor failed payments
- Review webhook logs
- Check business metrics

### Application Logs

Check for errors:
- Backend: Vercel Functions logs
- Database: Supabase logs
- Frontend: Browser console

### Alerts to Set Up

- Payment failures spike
- Webhook failures
- API errors
- Subscription expiries

## Support

- **Bach Docs**: https://docs.bachs.io
- **API Reference**: https://api.bachs.io/docs
- **Support Email**: support@bachs.io

---

Your Bach integration is complete! Users can now purchase subscriptions.
