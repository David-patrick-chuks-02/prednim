-- Run this in your Supabase SQL editor to make your account a pro user
-- Replace 'davidchuksdev@gmail.com' with your email if different

-- Step 1: Get your user ID (run this first to see your ID)
SELECT id, email FROM auth.users WHERE email = 'davidchuksdev@gmail.com';

-- Step 2: Create active subscription
INSERT INTO public.subscriptions (user_id, plan_type, status, current_period_start, current_period_end, cancel_at_period_end)
VALUES (
  '1eaafd4d-f14f-444d-af12-ff515ccc3c85',
  'monthly',
  'active',
  NOW(),
  NOW() + INTERVAL '1 month',
  false
)
ON CONFLICT (user_id)
DO UPDATE SET
  plan_type = 'monthly',
  status = 'active',
  current_period_start = NOW(),
  current_period_end = NOW() + INTERVAL '1 month',
  cancel_at_period_end = false;

-- Verify the subscription was created
SELECT * FROM public.subscriptions WHERE user_id = '1eaafd4d-f14f-444d-af12-ff515ccc3c85';
