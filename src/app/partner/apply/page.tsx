'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function PartnerApplyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    phone: '',
    reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchApplicationStatus();
    }
  }, [user]);

  const fetchApplicationStatus = async () => {
    try {
      const response = await fetch('/api/partners/apply');
      const data = await response.json();
      if (data.application) {
        setApplicationStatus(data.application);
      }
    } catch (error) {
      console.error('Error fetching application status:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/partners/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: data.error });
        return;
      }

      setMessage({ type: 'success', text: data.message });
      setApplicationStatus(data.application);
      setFormData({ businessName: '', website: '', phone: '', reason: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit application' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
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

  return (
    <>
      <SiteHeader />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/dashboard" className="text-accent text-sm font-semibold hover:text-accent/80 mb-8 inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ink mb-2">Become a Partner</h1>
          <p className="text-muted text-lg">Earn 10% commission on every referral subscription</p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="rounded-lg border border-line/50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="text-accent" size={20} />
              <h3 className="font-semibold text-ink">10% Commission</h3>
            </div>
            <p className="text-sm text-muted">Earn 10% of subscription value from each referral</p>
          </div>
          <div className="rounded-lg border border-line/50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="text-accent" size={20} />
              <h3 className="font-semibold text-ink">Lifetime Tracking</h3>
            </div>
            <p className="text-sm text-muted">Track all referrals and earnings in your dashboard</p>
          </div>
          <div className="rounded-lg border border-line/50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="text-accent" size={20} />
              <h3 className="font-semibold text-ink">Unique Referral Code</h3>
            </div>
            <p className="text-sm text-muted">Get a unique code to share with your audience</p>
          </div>
          <div className="rounded-lg border border-line/50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="text-accent" size={20} />
              <h3 className="font-semibold text-ink">Monthly Payouts</h3>
            </div>
            <p className="text-sm text-muted">Withdraw earnings monthly to your account</p>
          </div>
        </div>

        {/* Status Message */}
        {applicationStatus && (
          <div className={`mb-8 p-4 rounded-lg border ${
            applicationStatus.status === 'approved'
              ? 'border-green-500/20 bg-green-500/5 text-green-600'
              : applicationStatus.status === 'pending'
              ? 'border-yellow-500/20 bg-yellow-500/5 text-yellow-600'
              : 'border-red-500/20 bg-red-500/5 text-red-600'
          }`}>
            {applicationStatus.status === 'approved' && (
              <>
                <p className="font-semibold mb-1">✅ Application Approved!</p>
                <p className="text-sm">Your partner account is active. <Link href="/partner/dashboard" className="underline hover:no-underline">View your dashboard →</Link></p>
              </>
            )}
            {applicationStatus.status === 'pending' && (
              <>
                <p className="font-semibold mb-1">⏳ Application Pending</p>
                <p className="text-sm">Your application is under review. We'll notify you soon!</p>
              </>
            )}
            {applicationStatus.status === 'rejected' && (
              <>
                <p className="font-semibold mb-1">❌ Application Rejected</p>
                <p className="text-sm">{applicationStatus.rejection_reason}</p>
              </>
            )}
          </div>
        )}

        {/* Application Form */}
        {!applicationStatus || applicationStatus.status === 'rejected' ? (
          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            {message && (
              <div className={`p-4 rounded-lg ${
                message.type === 'error'
                  ? 'bg-red-500/10 border border-red-500/20 text-red-600'
                  : 'bg-green-500/10 border border-green-500/20 text-green-600'
              }`}>
                {message.text}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Business Name *</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Your business or personal brand name"
                className="w-full px-4 py-3 rounded-lg border border-line bg-background text-ink placeholder-muted focus:outline-none focus:border-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-3 rounded-lg border border-line bg-background text-ink placeholder-muted focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-lg border border-line bg-background text-ink placeholder-muted focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Why should we approve you? *</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Tell us about your audience, your marketing channels, and why you'd be a great partner..."
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-line bg-background text-ink placeholder-muted focus:outline-none focus:border-accent resize-none"
                required
              />
              <p className="text-xs text-muted mt-1">Minimum 50 characters required</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || formData.reason.length < 50}
              className="w-full px-6 py-3 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        ) : null}

        {applicationStatus?.status === 'approved' && (
          <div className="rounded-lg border border-line/50 p-8 bg-card/50 text-center">
            <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-ink mb-2">You're Ready to Earn!</h2>
            <p className="text-muted mb-6">Your partner account is active. Start sharing your referral code with your audience.</p>
            <Link href="/partner/dashboard" className="inline-block px-8 py-3 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent/90">
              Go to Partner Dashboard →
            </Link>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
