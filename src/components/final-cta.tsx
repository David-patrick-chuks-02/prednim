import { Wordmark } from "@/components/logo";

export function FinalCta() {
  return (
    <section id="pricing" className="relative isolate scroll-mt-20 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="anim-glow absolute left-1/2 top-1/2 h-[46vmax] w-[46vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(61,220,106,0.18),transparent_68%)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="overflow-hidden rounded-3xl border border-line bg-card/70 px-6 py-14 text-center sm:px-14">
          <h2 className="font-display mx-auto max-w-2xl text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink">
            Get unlimited access to{" "}
            <span className="text-accent">5,000+ adult books</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted">
            Exclusive content published by PredNim. Read anytime, anywhere. Secure, discreet, and backed by our 18+ guarantee.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/signup"
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-on-accent shadow-[0_10px_30px_-10px_rgba(61,220,106,0.6)] transition hover:bg-accent-dim"
            >
              Get started
            </a>
            <a
              href="/faq"
              className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-accent/40 hover:text-accent"
            >
              Learn more
            </a>
          </div>

          <p className="mt-6 text-xs text-muted">
            No credit card required to browse. Choose from 3 flexible plans: monthly, 6-month, or annual.
          </p>
        </div>
      </div>
    </section>
  );
}
