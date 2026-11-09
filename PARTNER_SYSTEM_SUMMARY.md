# Partner/Affiliate Program System - Implementation Summary

## Overview
Complete partner/affiliate program system where partners earn 10% commission on subscriber plan referrals they generate. The system includes application management, admin approval/rejection workflow, referral tracking, and commission calculation.

## Architecture

### Database Schema
**Tables Created:**
- `partner_applications` - Application submissions with status tracking (pending/approved/rejected)
- `partners` - Approved partner profiles with referral codes and commission rates
- `referrals` - Individual referral tracking linking partners to referred users
- `partner_commissions` - Commission records with payment status tracking

**Features:**
- Row Level Security (RLS) policies for data access control
- Unique referral code generation using nanoid
- Commission tracking with payment status (pending/paid)
- Soft delete support via CASCADE foreign keys

**Setup File:**
- `/Users/mac/Documents/github/prednim/setup-partners.sql` - Complete schema with RLS policies

### Frontend Pages

#### 1. Partner Application Page (`/partner/apply`)
**File:** `src/app/partner/apply/page.tsx`

Features:
- Application form with fields: Business Name (required), Website, Phone, Reason (min 50 chars)
- Benefit cards displaying partner program value (10% Commission, Lifetime Tracking, Unique Code, Monthly Payouts)
- Application status display with color coding:
  - Green: Approved
  - Yellow: Pending
  - Red: Rejected with reason
- One-time application per user (can't have multiple pending/approved applications)
- Redirects to partner dashboard on approval

#### 2. Partner Dashboard (`/partner/dashboard`)
**File:** `src/app/partner/dashboard/page.tsx`

Features:
- Displays unique referral code with one-click copy to clipboard
- Stats cards showing:
  - Total Referrals
  - Active Subscriptions
  - Total Earned (from all referrals)
  - Pending Payout (earnings awaiting payment)
- Referrals table with columns:
  - Email of referred user
  - Status (active/expired/pending)
  - Commission amount with payment status indicator (✓ Paid or ⏳ Pending)
  - Join date
- Empty state message when no referrals exist

#### 3. Admin Dashboard (`/admin`)
**File:** `src/app/admin/page.tsx`

Features:
- **Partners Tab** alongside Users tab
- Partner applications table showing:
  - Business Name
  - Email
  - Status (color-coded badges)
  - Application date
  - Actions
- **Admin Actions:**
  - Approve: Generates unique referral code, creates partner profile with 10% commission rate
  - Reject: Stores rejection reason and admin ID
  - View approved partners: Shows referral code and approval status
- Status-based action buttons (only pending applications show approve/reject)

### API Endpoints

#### Partner Operations

**POST `/api/partners/apply`** - Submit partner application
- Required fields: businessName, reason (min 50 chars)
- Optional fields: website, phone
- Validates no existing pending/approved applications
- Returns application status and data

**GET `/api/partners/apply`** - Get user's application status
- Returns user's application if exists
- Requires authentication

**GET `/api/partners/dashboard`** - Get partner dashboard data
- Returns partner profile with referral code
- Calculates stats: total referrals, active referrals, total earnings, pending earnings
- Returns list of referrals with commission details
- Requires authentication as approved partner

#### Admin Operations

**GET `/api/partners/admin/applications`** - List all partner applications
- Returns all applications ordered by most recent first
- Requires admin authentication
- No pagination implemented (consider adding for scale)

**POST `/api/partners/admin/review`** - Approve or reject application
- Accepts: applicationId, approved (boolean), rejectionReason (optional)
- On approval:
  - Generates unique referral code: `REF-{12-char-nanoid-uppercase}`
  - Creates partner profile with 10% commission rate
  - Records admin ID and approval timestamp
- On rejection:
  - Stores rejection reason
  - Records admin ID and rejection timestamp
- Requires admin authentication

### Authentication & Authorization

**Middleware Used:**
- `requireAuth` - Ensures user is authenticated
- `requireAdmin` - Ensures user is admin (checked against NEXT_PUBLIC_ADMIN_EMAILS)

**RLS Policies:**
- Users can see only their own applications
- Partners can see only their own referrals and commissions
- Admins can see all applications, referrals, and commissions

### Commission System

**10% Commission Model:**
- Commission rate: 10.00% (hardcoded on partner approval)
- Calculated per referral when referral converts to active subscription
- Tracked in `partner_commissions` table
- Payment status: pending or paid
- Paid status updated when admin marks payment as processed

### Referral Code System

**Generation:**
- Uses `nanoid(12)` library (already available as transitive dependency)
- Format: `REF-{UPPERCASE_NANOID}`
- Example: `REF-A1B2C3D4E5F6`
- Unique constraint ensures no duplicates

**Usage:**
- Provided in partner dashboard for sharing
- Included in referral link: `{origin}/?ref={referral_code}`
- Query parameter passed to signup/login flow (integration point needed)

## Workflow

### Partner Application Flow
1. User navigates to `/partner/apply`
2. Fills out application form (business name + reason required)
3. System checks for existing applications
4. Application submitted, status = "pending"
5. Admin reviews in `/admin` dashboard, Partners tab
6. Admin clicks Approve or Reject
7. If approved: partner profile created, referral code generated, user redirected to dashboard
8. If rejected: rejection reason stored, user sees reason on apply page

### Referral Tracking Flow
1. Partner shares referral link: `{site}/?ref=REF-ABC123...`
2. New user signs up/logs in with referral code
3. Referral tracked in `referrals` table
4. When referred user upgrades to paid subscription, status changes to "active"
5. Commission calculated and recorded in `partner_commissions`
6. Partner sees commission in dashboard with payment status

## Testing Checklist

### Frontend Testing
- [x] Partner apply page loads and displays form
- [x] Admin dashboard renders with Partners tab
- [x] Partner dashboard page loads (protected by auth)
- [x] Tab switching works in admin dashboard
- [x] Form validation enforces required fields and min length

### API Testing (Status Endpoint)
- [x] GET `/api/partners/apply` returns 401 without auth
- [x] GET `/api/partners/admin/applications` returns 401 without admin auth
- [x] API endpoints are accessible and routing works

### Integration Testing (Requires Manual Testing)
- [ ] User can submit partner application
- [ ] Admin can view application in dashboard
- [ ] Admin can approve with referral code generation
- [ ] Admin can reject with reason
- [ ] Approved partner can view dashboard with referral code
- [ ] Referral code can be copied to clipboard
- [ ] Referral tracking works when new user signs up with code

### Database Testing (Requires Manual Testing)
- [ ] Partner schema tables created successfully
- [ ] RLS policies enforced correctly
- [ ] Referral codes are unique
- [ ] Commission calculations accurate
- [ ] Payment status tracking works

## Files Created/Modified

### New Files Created
- `src/app/partner/apply/page.tsx` - Partner application form
- `src/app/partner/dashboard/page.tsx` - Partner dashboard
- `src/app/api/partners/apply/route.ts` - Partner application API
- `src/app/api/partners/dashboard/route.ts` - Partner dashboard API
- `src/app/api/partners/admin/applications/route.ts` - Admin applications listing
- `src/app/api/partners/admin/review/route.ts` - Admin approval/rejection
- `setup-partners.sql` - Database schema and RLS policies

### Modified Files
- `src/app/admin/page.tsx` - Added Partners tab and partner management UI

## Next Steps

### Required Before Production
1. **Apply database schema** - Run `setup-partners.sql` in Supabase
2. **Integration points needed:**
   - Pass referral code from signup/login to create referrals
   - Trigger commission creation when subscription status changes to active
   - Implement payment payout functionality
3. **Pagination** - Add pagination to admin applications list for scale
4. **Testing** - Full end-to-end testing with real user accounts

### Optional Enhancements
1. Partner tier system (different commission rates for different tiers)
2. Referral link custom domains
3. Commission payout scheduling and bank transfer integration
4. Partner leaderboard/analytics
5. Email notifications for application status changes
6. Bulk export of referral reports
7. API keys for partners to integrate directly
8. Monthly commission reports and invoicing

## Deployment Notes
- All code uses server-side rendering where needed with `'use client'` markers
- Uses existing Supabase connection (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
- Admin emails from environment variable: NEXT_PUBLIC_ADMIN_EMAILS
- No external dependencies beyond already-installed packages
- Nanoid included as transitive dependency via tailwindcss
