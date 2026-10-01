import type { ReactNode } from "react";

type Feature = {
  title: string;
  body: string;
  icon: ReactNode;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FEATURES: Feature[] = [
  {
    title: "Picked by actual readers",
    body: "Every title on our shelves was chosen by a bookseller who read it, with a short note on why. No paid placements, no publishers bidding for the front table.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M12 6.5C10.4 5.2 8.5 4.6 6 4.6H4v13h2c2.5 0 4.4.6 6 1.9 1.6-1.3 3.5-1.9 6-1.9h2v-13h-2c-2.5 0-4.4.6-6 1.9Z" />
        <path d="M12 6.5v13" />
      </svg>
    ),
  },
  {
    title: "Recommendations that explain themselves",
    body: "Tell us the last book you loved and we’ll tell you why the next one fits — the pacing, the voice, the ending. Never a black box guessing at your clicks.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5" />
        <circle cx="12" cy="12" r="3.4" />
      </svg>
    ),
  },
  {
    title: "Packed and shipped same day",
    body: "Order before 4pm and it leaves the shop today, in plastic-free packaging that survives the post. Tracking lands in your inbox the moment it’s scanned.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M3 8.2 12 4l9 4.2v7.6L12 20l-9-4.2V8.2Z" />
        <path d="m3 8.2 9 4.2 9-4.2M12 12.4V20" />
      </svg>
    ),
  },
  {
    title: "Find your next read in minutes",
    body: "Browse by mood, length, or theme instead of scrolling endless bestseller lists. If you have twenty minutes and want something short, we have a shelf for that.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <circle cx="11" cy="11" r="6.4" />
        <path d="m15.8 15.8 4.2 4.2" />
      </svg>
    ),
  },
  {
    title: "A shelf built around your taste",
    body: "Members get first look at new arrivals, early access to signed editions, and a monthly pick reserved at member price. Stay for a season or a decade — no lock-in.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M4 20V6.5A1.5 1.5 0 0 1 5.5 5H9a3 3 0 0 1 3 3v12" />
        <path d="M12 8a3 3 0 0 1 3-3h3.5A1.5 1.5 0 0 1 20 6.5V20" />
        <path d="M2 20h20" />
      </svg>
    ),
  },
  {
    title: "Returns are painless",
    body: "Thirty days, no questions, and we cover the postage if the book arrived damaged. We would rather you keep a shelf you love than one you feel stuck with.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M12 3 5 6v5.6c0 4 2.9 7.7 7 9.4 4.1-1.7 7-5.4 7-9.4V6l-7-3Z" />
        <path d="m9.2 12 2 2 3.6-3.8" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
            What makes PredNim different
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,4.4vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink">
            Stop settling for a shelf full of maybes
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Most bookshops help you buy more books. PredNim helps you finish them — with titles
            chosen by people who read, and recommendations that tell you why before you spend.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="group rounded-2xl border border-line bg-card/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-card"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent transition group-hover:border-accent/50">
                {feature.icon}
              </span>
              <h3 className="font-display mt-5 text-[17px] font-bold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
