# Production Setup Guide

## Current Pricing (REAL)

| Plan | Duration | Price | Cents |
|------|----------|-------|-------|
| **Monthly** | 1 month | $100 | 10,000¢ |
| **6-Month** | 6 months | $500 | 50,000¢ |
| **Annual** | 1 year | $1,000 | 100,000¢ |

All prices are real production prices (not dummy).

---

## Switch from Test to Production

### Step 1: Get Live Bach API Keys

**In Bach Dashboard (https://dashboard.bachs.io):**

1. Click **Settings** (gear icon)
2. Click **API Keys**
3. You'll see two tabs:
   - **Test Keys** (current - for testing)
   - **Live Keys** (production - for real payments)

4. Click **Live Keys** tab
5. Copy your keys:
   ```
   Publishable Key: pk_live_xxxxxxxxxxxxx
   Secret Key: sk_live_xxxxxxxxxxxxx
   ```

### Step 2: Get Webhook Secret (Live)

1. In **Settings → API Keys**
2. Look for **Webhook Signing Secret**
3. Copy the live webhook secret:
   ```
   whsec_live_xxxxxxxxxxxxx
   ```

### Step 3: Update .env.local

Replace with your LIVE keys:

```env
# Bach Payment Provider - LIVE KEYS
NEXT_PUBLIC_BACH_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
BACH_SECRET_KEY=sk_live_xxxxxxxxxxxxx
BACH_WEBHOOK_SECRET=whsec_live_xxxxxxxxxxxxx
```

**⚠️ IMPORTANT:**
- Never commit `.env.local` with real keys to GitHub
- `.env.local` is in `.gitignore` ✓
- For Vercel: Add variables in project settings (not in git)

### Step 4: Verify Keys are Live

Check that:
- ✓ Keys start with `pk_live_` and `sk_live_` (not `pk_test_`)
- ✓ Webhook secret starts with `whsec_live_`
- ✓ No test keys in production

---

## Bach API Key Permissions

### Required Permissions for "prednim" API Key

**Enable these in Bach Dashboard:**

```
Settings → API Keys → prednim → Permissions

✓ Payments
  └─ Read
  └─ Write

✓ Subscriptions
  └─ Read
  └─ Write

✓ Customers
  └─ Read
  └─ Write

✓ Payment Methods
  └─ Read
  └─ Write

✓ Webhooks
  └─ Read
  └─ Write

✓ Refunds
  └─ Read
  └─ Write

✓ Payouts
  └─ Read (optional - to check your balance)

Optional (No Access OK):
- Account
- Balance
- Connected Accounts
- Disputes
- Invoices
- Logs
- Payment Health
- Quotes
- Transfers
- Virtual Accounts
```

### How to Set Permissions

1. Dashboard → **Settings**
2. Click **API Keys**
3. Click on "prednim" API key
4. In **Permissions** section:
   - Toggle ON for each required resource
   - Under each resource, check Read ✓ and Write ✓
5. Click **Save**

---

## Webhook Configuration

### Configure Webhook Endpoint

In Bach Dashboard:

1. **Settings → Webhooks**
2. Add new webhook endpoint:
   ```
   URL: https://prednim.xyz/api/webhooks/bach
   ```
   (Replace with your actual domain)

3. Select events to listen for:
   ```
   ✓ payment_intent.succeeded
   ✓ payment_intent.failed
   ✓ subscription.created
   ✓ subscription.cancelled
   ✓ subscription.updated
   ```

4. Copy webhook signing secret
5. Add to `.env.local`:
   ```
   BACH_WEBHOOK_SECRET=whsec_live_xxxxx
   ```

---

## Vercel Deployment

### Add Environment Variables

In Vercel project settings:

1. Go to **Settings → Environment Variables**
2. Add these variables:

```
NEXT_PUBLIC_BACH_PUBLISHABLE_KEY=pk_live_xxxxx
BACH_SECRET_KEY=sk_live_xxxxx
BACH_WEBHOOK_SECRET=whsec_live_xxxxx
NEXT_PUBLIC_SUPABASE_URL=https://lffrryypartlludmjzqy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-key]
SUPABASE_SERVICE_ROLE_KEY=[your-key]
```

3. Click **Save**
4. Redeploy

---

## Test Live Payments

### Before Going Live

1. **Test a payment:**
   - Go to https://prednim.xyz/signup
   - Create test account
   - Go to /checkout
   - Select a plan
   - Make a payment with test card

2. **Watch Bach Dashboard:**
   - Go to https://dashboard.bachs.io
   - Click **Payments**
   - See your test transaction

3. **Check subscription:**
   - Go to **Subscriptions**
   - Verify subscription is active

### Live Payment Test

Once live:
1. Real credit cards will be charged
2. Real money will enter your Bach account
3. You can process real subscriptions

---

## Security Checklist

Before going live:

```
✓ Using live keys (pk_live_, sk_live_)
✓ Not using test keys
✓ Webhook endpoint configured
✓ Webhook secret set correctly
✓ HTTPS enabled on domain
✓ SSL certificate valid
✓ Environment variables set on Vercel
✓ .env.local in .gitignore
✓ No test keys in GitHub
✓ API key permissions set
✓ Webhook events enabled
```

---

## Pricing Summary

### Current Rates (Production)

```
Monthly:   $100/month  (10,000¢)
6-Month:   $500/6mo    (50,000¢) - Save $100
Annual:    $1,000/year (100,000¢) - Save $200
```

### Payment Flow

1. User signs up → No charge yet
2. User selects plan → Still no charge
3. User clicks checkout → Real payment
4. Credit card charged → Subscription active
5. Access granted → User can browse/read books

---

## Cancel Subscription

Users can cancel at `/cancel`:
- ✓ Immediate cancellation
- ✓ No refund (unless requested)
- ✓ Access ends at period end
- ✓ Subscription marked as cancelled

---

## Monitor Payouts

In Bach Dashboard:

1. **Payouts** section
2. See all money received
3. Track payout schedule
4. View transaction details

---

## Production Checklist

| Item | Status | Notes |
|------|--------|-------|
| Live Bach Keys | ⬜ | Replace test keys |
| API Permissions | ⬜ | Enable Payments, Subscriptions, etc. |
| Webhook Configured | ⬜ | Point to /api/webhooks/bach |
| Webhook Secret | ⬜ | Add to .env.local |
| Vercel Env Vars | ⬜ | Add live keys to Vercel |
| Domain SSL | ⬜ | HTTPS working |
| Test Payment | ⬜ | Try first real payment |
| Monitor Dashboard | ⬜ | Watch Bach dashboard |
| Pricing Verified | ✓ | $100, $500, $1000 |

---

## Support

For Bach API issues:
- Docs: https://docs.bachs.io
- Dashboard: https://dashboard.bachs.io
- Support: support@bachs.io

For PredNim issues:
- Check /api/webhooks/bach logs
- Check Supabase logs
- Monitor payment errors in code

---

## Summary

| Before (Test) | After (Production) |
|---------------|-------------------|
| pk_test_xxx | pk_live_xxx |
| sk_test_xxx | sk_live_xxx |
| Dummy payments | Real charges |
| No money received | Real payouts |
| Test data | Production data |

**Status: Ready for Production** ✓

Follow the steps above to switch to live mode!
