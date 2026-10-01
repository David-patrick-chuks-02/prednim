import { BookshopMock } from "@/components/bookshop-mock";

const FACES = ["#3ddc6a", "#2bb353", "#e0b84e", "#8fa899"];

export function Hero() {
  return (
    <section id="shop" className="relative isolate scroll-mt-20 overflow-hidden">
      {/* background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-clip">
        <div className="absolute inset-0 bg-[linear-gradient(165deg,#070e0b_0%,#0c1812_48%,#08120e_100%)]" />
        <div className="anim-glow absolute -left-[18%] top-[-28%] h-[72vmax] w-[72vmax] rounded-full bg-[radial-gradient(circle,rgba(61,220,106,0.2),transparent_68%)]" />
        <div className="absolute right-[-20%] top-[18%] h-[58vmax] w-[58vmax] rounded-full bg-[radial-gradient(circle,rgba(20,80,50,0.28),transparent_70%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-24 lg:pb-28">
        <div className="anim-fade-up">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
              Finally, books that don’t disappoint
            </span>
          </span>

          <h1 className="font-display mt-6 text-[clamp(2.6rem,6.4vw,4.4rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink">
            Stop buying books that{" "}
            <span className="relative whitespace-nowrap text-accent">
              nobody finishes
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-accent/40"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8c60-5 120-6 180-3s80 3 116-1"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            PredNim is an independent bookshop run by readers. Every title is hand-picked, every
            recommendation comes with a reason, and every order is packed the same day — so your
            shelf stays a pleasure instead of a pile of guilt.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#shop"
              className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-on-accent shadow-[0_10px_30px_-10px_rgba(61,220,106,0.6)] transition hover:bg-accent-dim"
            >
              Browse the shop
            </a>
            <a
              href="#features"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/40 hover:text-accent"
            >
              How we pick our books
            </a>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <div className="flex -space-x-2">
              {FACES.map((color) => (
                <span
                  key={color}
                  aria-hidden
                  className="h-7 w-7 rounded-full border-2 border-surface"
                  style={{ background: color }}
                />
              ))}
            </div>
            <p className="text-xs leading-relaxed text-muted">
              Free delivery over <span className="font-semibold text-ink">$35</span> · 30-day
              returns, no questions.
            </p>
          </div>
        </div>

        <div className="anim-fade-up anim-delay-2 lg:pl-4">
          <BookshopMock />
        </div>
      </div>
    </section>
  );
}
