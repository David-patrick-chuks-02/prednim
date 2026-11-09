-- Partner Program Schema Setup

-- 1. Partner Applications Table
CREATE TABLE IF NOT EXISTS partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  website TEXT,
  phone TEXT,
  reason TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  rejection_reason TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partial unique index to ensure one active application per user
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_pending_approved ON partner_applications(user_id)
WHERE status IN ('pending', 'approved');

-- 2. Partners Table (Approved Partners)
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id UUID NOT NULL UNIQUE REFERENCES partner_applications(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL UNIQUE,
  commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 10.00,
  total_earnings NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  total_paid NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Referrals Table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referred_email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'expired')) DEFAULT 'pending',
  subscription_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Partner Commissions Table
CREATE TABLE IF NOT EXISTS partner_commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  referral_id UUID NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
  commission_amount NUMERIC(12, 2) NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'paid')) DEFAULT 'pending',
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_partner_applications_user_id ON partner_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_applied_at ON partner_applications(applied_at DESC);

CREATE INDEX IF NOT EXISTS idx_partners_user_id ON partners(user_id);
CREATE INDEX IF NOT EXISTS idx_partners_referral_code ON partners(referral_code);

CREATE INDEX IF NOT EXISTS idx_referrals_partner_id ON referrals(partner_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_user_id ON referrals(referred_user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);

CREATE INDEX IF NOT EXISTS idx_partner_commissions_partner_id ON partner_commissions(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_commissions_referral_id ON partner_commissions(referral_id);
CREATE INDEX IF NOT EXISTS idx_partner_commissions_payment_status ON partner_commissions(payment_status);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_commissions ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies for partner_applications
-- Users can see their own applications
CREATE POLICY "Users can see own applications" ON partner_applications
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can see all applications
CREATE POLICY "Admins can see all applications" ON partner_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users WHERE id = auth.uid()
      AND email = ANY(string_to_array(current_setting('app.admin_emails', 't'), ','))
    )
  );

-- Users can insert their own applications
CREATE POLICY "Users can insert applications" ON partner_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can update applications
CREATE POLICY "Admins can update applications" ON partner_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users WHERE id = auth.uid()
      AND email = ANY(string_to_array(current_setting('app.admin_emails', 't'), ','))
    )
  );

-- 8. RLS Policies for partners
-- Users can see their own partner profile
CREATE POLICY "Users can see own partner profile" ON partners
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can see all partner profiles
CREATE POLICY "Admins can see all partner profiles" ON partners
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users WHERE id = auth.uid()
      AND email = ANY(string_to_array(current_setting('app.admin_emails', 't'), ','))
    )
  );

-- 9. RLS Policies for referrals
-- Partners can see their own referrals
CREATE POLICY "Partners can see own referrals" ON referrals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partners WHERE id = partner_id AND user_id = auth.uid()
    )
  );

-- Admins can see all referrals
CREATE POLICY "Admins can see all referrals" ON referrals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users WHERE id = auth.uid()
      AND email = ANY(string_to_array(current_setting('app.admin_emails', 't'), ','))
    )
  );

-- 10. RLS Policies for partner_commissions
-- Partners can see their own commissions
CREATE POLICY "Partners can see own commissions" ON partner_commissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partners WHERE id = partner_id AND user_id = auth.uid()
    )
  );

-- Admins can see all commissions
CREATE POLICY "Admins can see all commissions" ON partner_commissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users WHERE id = auth.uid()
      AND email = ANY(string_to_array(current_setting('app.admin_emails', 't'), ','))
    )
  );
