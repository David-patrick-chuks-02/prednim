# ✓ Bach API Key Setup (Corrected)

## Important: Bach Uses Different Key Format

Bach **does NOT** use the traditional "public key" and "secret key" structure like Stripe or other processors.

**Incorrect (What we had):**
```
❌ pk_test_xxxxx (does not exist)
❌ sk_test_xxxxx (does not exist)
```

**Correct (Bach's format):**
```
✓ sbp_test_xxxxx (test mode)
✓ sbp_live_xxxxx (production mode)
```

---

## How Bach API Keys Work

### Single API Key Format

Bach provides **ONE API key** for authentication:

```
Format: sbp_[environment]_[random]

Examples:
- sbp_test_abcdef123456 (for testing)
- sbp_live_xyz789456123 (for production)
```

### Usage in Requests

All API calls use the same key in Authorization header:

```javascript
headers: {
  'Authorization': 'Bearer sbp_live_xxxxx'
}
```

**NOT:**
```javascript
// ❌ Wrong - Bach doesn't distinguish between public/secret
headers: {
  'Authorization': 'Bearer pk_live_xxxxx'
}
```

---

## Get Your Bach API Key

### Step 1: Log Into Bach Dashboard

1. Go to: https://dashboard.bachs.io
2. Click your account icon → **API Keys**

### Step 2: Copy Your Key

You'll see your API key:

```
Test Mode:       sbp_test_xxxxxxxxxxxxx
Live Mode:       sbp_live_xxxxxxxxxxxxx
```

**Copy the correct one based on your environment:**
- **Development/Testing:** `sbp_test_xxxxx`
- **Production:** `sbp_live_xxxxx`

### Step 3: Set in .env.local

```env
# Development (Testing)
BACH_API_KEY=sbp_test_xxxxxxxxxxxxx
BACH_WEBHOOK_SECRET=whsec_test_xxxxx

# Production (when ready)
BACH_API_KEY=sbp_live_xxxxxxxxxxxxx
BACH_WEBHOOK_SECRET=whsec_live_xxxxx
```

---

## Get Webhook Secret

### Find Webhook Secret

1. Bach Dashboard → **API Keys**
2. Look for **Webhook Signing Secret**
3. You'll see:
   ```
   Test:  whsec_test_xxxxx
   Live:  whsec_live_xxxxx
   ```

### Use in .env.local

```env
BACH_WEBHOOK_SECRET=whsec_test_xxxxxxxxxxxxx
```

---

## Environment Variables

### .env.local Format

```env
# Bach Payment Provider
# Docs: https://docs.bachs.io/developer-portal/api-keys
# Format: sbp_live_xxxxx (production) or sbp_test_xxxxx (test)
BACH_API_KEY=sbp_test_xxxxxxxxxxxxx

# Webhook signing secret for verifying Bach events
BACH_WEBHOOK_SECRET=whsec_test_xxxxxxxxxxxxx

# Bach API Configuration
BACH_API_URL=https://api.bachs.io/v1
```

### For Vercel Production

Add to **Vercel Project Settings → Environment Variables:**

```
BACH_API_KEY=sbp_live_xxxxxxxxxxxxx
BACH_WEBHOOK_SECRET=whsec_live_xxxxxxxxxxxxx
BACH_API_URL=https://api.bachs.io/v1
```

---

## API Calls

### How Requests Are Made

```typescript
// Bach API call with single API key
const response = await fetch('https://api.bachs.io/v1/payment_intents', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${BACH_API_KEY}`,  // ✓ Correct
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: 10000,        // $100.00 in cents
    currency: 'USD',
    customer_id: 'cust_123',
    // ... other fields
  }),
});
```

### NOT This Way

```javascript
// ❌ Wrong - Bach doesn't use separate keys
headers: {
  'Authorization': `Bearer ${BACH_PUBLIC_KEY}`,  // ❌ Doesn't exist
}

// ❌ Wrong - Don't use multiple keys
headers: {
  'X-API-Key': BACH_SECRET_KEY,  // ❌ Wrong format
}
```

---

## Code Changes Made

### Before (Incorrect)
```typescript
const BACH_SECRET_KEY = process.env.BACH_SECRET_KEY;
const BACH_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_BACH_PUBLISHABLE_KEY;

headers: {
  'Authorization': `Bearer ${BACH_SECRET_KEY}`,  // ❌
}
```

### After (Correct)
```typescript
const BACH_API_KEY = process.env.BACH_API_KEY;

headers: {
  'Authorization': `Bearer ${BACH_API_KEY}`,  // ✓
}
```

---

## Test vs Production

### Test Mode
```env
BACH_API_KEY=sbp_test_xxxxx
```

**For testing:**
- Use test credit cards (provided by Bach)
- No real charges
- Sandbox environment
- For development and staging

**Test Card:**
```
Number: 4242 4242 4242 4242
Exp: Any future date
CVC: Any 3 digits
```

### Production Mode
```env
BACH_API_KEY=sbp_live_xxxxx
```

**For production:**
- Real credit cards accepted
- Real charges processed
- Money goes to your Bach account
- Users see real transactions
- Must use HTTPS

---

## Verify Setup

### Check Your Configuration

```bash
# View your .env.local
cat .env.local | grep BACH_API_KEY

# Should show something like:
# BACH_API_KEY=sbp_live_xxxxxxxxxxxxx
```

### Test API Key Works

In your code, the library will verify:

```typescript
if (!BACH_API_KEY) {
  throw new Error('Bach API key (BACH_API_KEY) not configured');
}
```

---

## Common Issues

### Issue: 401 Unauthorized

**Cause:** Wrong API key format
```
❌ pk_test_xxxxx
❌ sk_test_xxxxx
```

**Fix:** Use correct format
```
✓ sbp_test_xxxxx
✓ sbp_live_xxxxx
```

### Issue: Invalid Authorization Header

**Cause:** Missing "Bearer" prefix
```javascript
// ❌ Wrong
'Authorization': 'sbp_live_xxxxx'

// ✓ Correct
'Authorization': 'Bearer sbp_live_xxxxx'
```

### Issue: API Key Not Found

**Cause:** Missing from .env.local
```bash
# Add to .env.local:
BACH_API_KEY=sbp_live_xxxxxxxxxxxxx
```

---

## Summary

| Item | Value |
|------|-------|
| **Test Key Format** | `sbp_test_xxxxx` |
| **Live Key Format** | `sbp_live_xxxxx` |
| **Environment Variable** | `BACH_API_KEY` |
| **API Header** | `Authorization: Bearer {key}` |
| **Webhook Secret** | `whsec_test_xxxxx` or `whsec_live_xxxxx` |
| **Docs** | https://docs.bachs.io/developer-portal/api-keys |

---

## Next Steps

1. ✓ Understand Bach API key format (this document)
2. Get your API key from Bach dashboard
3. Update .env.local with `BACH_API_KEY=sbp_xxx`
4. Test payments in test mode
5. Switch to live keys for production
6. Configure webhooks for payment events

**Status: ✓ Ready to configure**
