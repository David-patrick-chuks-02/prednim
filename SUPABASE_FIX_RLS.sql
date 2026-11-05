-- QUICK FIX: Disable RLS to allow API access
-- Run this in Supabase SQL editor: https://app.supabase.com/project/lffrryypartlludmjzqy/sql/new

-- Step 1: Disable RLS on subscriptions table
ALTER TABLE public.subscriptions DISABLE ROW LEVEL SECURITY;

-- Step 2: Insert/update your subscription
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

-- Step 3: Verify it worked
SELECT id, user_id, plan_type, status, current_period_end FROM public.subscriptions WHERE user_id = '1eaafd4d-f14f-444d-af12-ff515ccc3c85';
