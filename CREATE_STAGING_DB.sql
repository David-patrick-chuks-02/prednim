-- Create schema for new Supabase database
-- Run this in: https://app.supabase.com/project/ivpsnpafrzqzkmaxwxkn/sql/new

-- Step 1: Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id BIGINT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(255),
  profile_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Create coin_ledger table
CREATE TABLE IF NOT EXISTS public.coin_ledger (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  delta INTEGER NOT NULL,
  kind VARCHAR(100),
  ref VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Create staging test user
INSERT INTO public.users (id, email, password_hash, first_name, profile_name, created_at)
VALUES (
  999888,
  'staging-test@aisha.local',
  'test-hash',
  'Staging',
  'Test User',
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO UPDATE SET
  email = 'staging-test@aisha.local',
  password_hash = 'test-hash',
  first_name = 'Staging',
  profile_name = 'Test User',
  updated_at = CURRENT_TIMESTAMP;

-- Step 5: Verify everything was created
SELECT 'Users table' as object, COUNT(*) as count FROM public.users
UNION ALL
SELECT 'Coin ledger table', COUNT(*) FROM public.coin_ledger
UNION ALL
SELECT 'Messages table', COUNT(*) FROM public.messages;

-- Step 6: Verify test user
SELECT id, email, first_name, profile_name FROM public.users WHERE id = 999888;
