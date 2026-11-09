'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ArrowLeft, Copy, Check, Users, TrendingUp, DollarSign } from 'lucide-react';

export default function PartnerDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [partner, setPartner] = useState<any>(null);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchDashboard();
    }
  }, [user]);

  const fetchDashboard = async () => {
    try {
      const response = await fetch('/api/partners/dashboard');
      const data = await response.json();
      setPartner(data.partner);
      setReferrals(data.referrals || []);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralCode = async () => {
    if (partner?.referral_code) {
      await navigator.clipboard.writeText(
        `${window.location.origin}/?ref=${partner.referral_code}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading || isLoading) {
    return (
      <>
        <SiteHeader />
        <main className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted">Loading...</div>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (!partner) {
    return (
      <>
        <SiteHeader />
        <main className="max-w-2xl mx-auto px-6 py-12">
          <Link href="/dashboard" className="text-accent text-sm font-semibold hover:text-accent/80 mb-8 inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-ink mb-4">Not a Partner Yet</h1>
            <p className="text-muted mb-6">Apply to become a partner and start earning 10% commission.</p>
            <Link href="/partner/apply" className="inline-block px-8 py-3 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent/90">
              Apply Now →
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const stats = partner.stats || {};

  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <Link href="/dashboard" className="text-accent text-sm font-semibold hover:text-accent/80 mb-8 inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-ink mb-2">Partner Dashboard</h1>
          <p className="text-muted">Track your referrals and earnings</p>
        </div>

        {/* Referral Code Section */}
        <div className="mb-12 rounded-xl border border-accent/20 bg-accent/5 p-8">
          <h2 className="text-lg font-semibold text-ink mb-4">Your Referral Code</h2>
          <div className="flex gap-3">
            <code className="flex-1 px-4 py-3 rounded-lg bg-background border border-line text-ink font-mono text-sm overflow-x-auto">
              {`${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${partner.referral_code}`}
            </code>
            <button
              onClick={copyReferralCode}
              className="px-6 py-3 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent/90 transition flex items-center gap-2"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-sm text-muted mt-3">Share this link with your audience to earn commissions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="rounded-xl border border-line bg-card/50 backdrop-blur p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm mb-1">Total Referrals</p>
                <p className="text-3xl font-bold text-ink">{stats.totalReferrals || 0}</p>
              </div>
              <Users className="text-accent/30" size={32} />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-card/50 backdrop-blur p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm mb-1">Active Subscriptions</p>
                <p className="text-3xl font-bold text-ink">{stats.activeReferrals || 0}</p>
              </div>
              <TrendingUp className="text-green-500/30" size={32} />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-card/50 backdrop-blur p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm mb-1">Total Earned</p>
                <p className="text-3xl font-bold text-ink">${(stats.totalEarnings || 0).toFixed(2)}</p>
              </div>
              <DollarSign className="text-yellow-500/30" size={32} />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-card/50 backdrop-blur p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm mb-1">Pending Payout</p>
                <p className="text-3xl font-bold text-accent">${(stats.pendingEarnings || 0).toFixed(2)}</p>
              </div>
              <DollarSign className="text-accent/30" size={32} />
            </div>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="rounded-xl border border-line overflow-hidden bg-card/50 backdrop-blur">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-line bg-surface/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">Commission</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/30">
                {referrals && referrals.length > 0 ? (
                  referrals.map((referral: any) => {
                    const commission = referral.partner_commissions?.[0];
                    return (
                      <tr key={referral.id} className="hover:bg-surface/30 transition">
                        <td className="px-6 py-4 text-sm text-ink font-medium">{referral.referred_email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            referral.status === 'active'
                              ? 'bg-green-500/10 text-green-600'
                              : referral.status === 'expired'
                              ? 'bg-red-500/10 text-red-600'
                              : 'bg-yellow-500/10 text-yellow-600'
                          }`}>
                            {referral.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-ink">
                          ${commission?.commission_amount?.toFixed(2) || '0.00'}
                          <span className="text-xs text-muted ml-2">
                            ({commission?.payment_status === 'paid' ? '✓ Paid' : '⏳ Pending'})
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted">
                          {new Date(referral.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted">
                      <p className="mb-2">No referrals yet</p>
                      <p className="text-xs">Share your referral code to start earning</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
