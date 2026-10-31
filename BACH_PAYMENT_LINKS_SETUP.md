# Bach Payment Links Setup

The PredNim platform uses Bach's pre-created payment links for checkout. Payment links can only be created through the Bach dashboard (not via API).

## Current Status

✅ **Monthly Plan ($100)**: Payment link created
- Link ID: `pl_48296c2ff15c`
- Checkout URL: https://checkout.bachs.io/pay/pl_48296c2ff15c

❌ **6-Month Plan ($500)**: Need to create
❌ **Annual Plan ($1000)**: Need to create

## How to Create Payment Links in Bach Dashboard

1. Log into your Bach account at https://dash.bachs.io
2. Navigate to **Payment Links** section
3. Click **Create Payment Link**
4. Fill in the details:

### 6-Month Plan
- **Name**: "PredNim Membership — 6 Months"
- **Description**: "6-month premium access to 5,000+ adult books and comics"
- **Type**: One-time payment
- **Amount**: $500.00
- **Currency**: USD

### Annual Plan
- **Name**: "PredNim Membership — Annual"
- **Description**: "Annual premium access to 5,000+ adult books and comics"
- **Type**: One-time payment
- **Amount**: $1,000.00
- **Currency**: USD

## Updating the Code

Once you create the payment links, update `src/lib/bach.ts` with the new link IDs:

```typescript
const PAYMENT_LINKS = {
  monthly: {
    id: 'pl_48296c2ff15c',
    amount: 10000,
  },
  sixmonth: {
    id: 'pl_XXXXXXX', // Replace with your 6-month link ID
    amount: 50000,
  },
  annual: {
    id: 'pl_XXXXXXX', // Replace with your annual link ID
    amount: 100000,
  },
};
```

## Testing the Payment Flow

1. Start the dev server: `npm run dev`
2. Sign up or log in
3. Go to `/checkout`
4. Select a plan
5. Click "Complete purchase"
6. You'll be redirected to Bach's checkout page
7. Use Bach's test card details to complete the payment

## Test Card Details (Bach Test Mode)

If your Bach account is in test mode:
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
