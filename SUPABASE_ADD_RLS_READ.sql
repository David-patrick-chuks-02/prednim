-- Grant permissions to anon and authenticated roles
-- Run this in Supabase SQL editor: https://app.supabase.com/project/lffrryypartlludmjzqy/sql/new

-- Grant permissions to anon_user role
GRANT SELECT ON public.subscriptions TO anon;
GRANT SELECT ON public.subscriptions TO authenticated;

-- Re-enable RLS with proper policies
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Authenticated users can read their own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Authenticated users can update their own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Service role can do everything" ON public.subscriptions;

-- Create new RLS policies
CREATE POLICY "Users can view their own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
  ON public.subscriptions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Verify your subscription
SELECT id, user_id, plan_type, status, current_period_end
FROM public.subscriptions
WHERE user_id = '1eaafd4d-f14f-444d-af12-ff515ccc3c85';
