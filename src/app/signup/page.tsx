"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref");
  const { signUp } = useAuth();

  const isValidEmail = email.includes("@") && email.includes(".");
  const isValidPassword = password.length >= 6;
  const isFormValid = name && isValidEmail && isValidPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setError("");
    setLoading(true);

    try {
      setSuccess(true);
      await signUp(email, password, name);

      if (referralCode) {
        await trackReferral(email, referralCode);
      }

      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err: any) {
      setSuccess(false);
      setError(err.message || "Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const trackReferral = async (userEmail: string, code: string) => {
    try {
      await fetch("/api/partners/track-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referral_code: code,
          referred_email: userEmail,
        }),
      });
    } catch (err) {
      console.error("Failed to track referral:", err);
    }
  };

  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-md px-5 sm:px-8 py-24">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-ink">Create your account</h1>
            <p className="mt-2 text-muted">Join premium adult content library</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-danger/10 border border-danger/30 p-4 text-sm text-danger flex gap-2">
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 text-sm text-accent flex gap-2">
                <span className="text-lg">✓</span>
                <span>Account created! Redirecting...</span>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded-lg border border-line bg-input px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50 transition"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-line bg-input px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50 transition"
                  placeholder="you@example.com"
                />
                {email && !isValidEmail && (
                  <span className="absolute right-3 top-3 text-danger text-lg">✕</span>
                )}
                {isValidEmail && (
                  <span className="absolute right-3 top-3 text-accent text-lg">✓</span>
                )}
              </div>
              {email && !isValidEmail && (
                <p className="text-xs text-danger mt-1">Please enter a valid email</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-line bg-input px-4 py-3 pr-10 text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50 transition"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-3 text-muted hover:text-accent transition disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM10 4c-2.147 0-4.118.822-5.614 2.174A6.963 6.963 0 002.636 9.5a7 7 0 0010.364 6.5c1.496-1.352 2.467-3.323 2.467-5.5 0-1.447-.389-2.81-1.064-3.987l2.878 2.878A1 1 0 0018 11a1 1 0 000-2 7 7 0 00-7-7zm5.614 12.826a6.963 6.963 0 001.75-2.326A7 7 0 0010 14c-1.496 1.352-2.467 3.323-2.467 5.5 0 1.447.389 2.81 1.064 3.987l-2.878-2.878a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-2.5-2.5z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
              {password && !isValidPassword && (
                <p className="text-xs text-danger mt-1">Password must be at least 6 characters</p>
              )}
              {isValidPassword && (
                <p className="text-xs text-accent mt-1">✓ Strong password</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-bold text-on-accent transition hover:bg-accent-dim disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:text-accent-dim font-semibold transition">
              Sign in
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
}
