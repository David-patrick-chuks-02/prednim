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
    title: "5,000+ premium books",
    body: "Unlimited access to erotic novels, romance, and mature comics. Browse our carefully curated collection of adult content.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M4 20V6.5A1.5 1.5 0 0 1 5.5 5H9a3 3 0 0 1 3 3v12" />
        <path d="M12 8a3 3 0 0 1 3-3h3.5A1.5 1.5 0 0 1 20 6.5V20" />
        <path d="M2 20h20" />
      </svg>
    ),
  },
  {
    title: "Read anywhere",
    body: "Access your library on any device—phone, tablet, or desktop. Sync your reading progress across all devices instantly.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <path d="M14 9v6M10 9v6M6 9v6M18 9v6" />
      </svg>
    ),
  },
  {
    title: "Discreet billing",
    body: "Your privacy matters. All transactions are processed securely with discreet billing. Only generic charges appear on your statement.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M12 1C6.5 1 2 5.5 2 11s4.5 10 10 10 10-4.5 10-10S17.5 1 12 1Z" />
        <path d="M9 11h6M9 15h6" />
      </svg>
    ),
  },
  {
    title: "Flexible plans",
    body: "Choose monthly, 6-month, or annual membership. Pause or cancel anytime—no long-term commitments or hidden fees.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Offline reading",
    body: "Download books to your device and read without an internet connection. Perfect for travel or anywhere you want privacy.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M12 1v6m0 6v6M1 12h6m6 0h6" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "Secure & private",
    body: "Bank-level encryption protects your data. Your reading history is private. We never share your information with third parties.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
        <path d="M12 1l9 4.2v7.6c0 5-4 9-9 9s-9-4-9-9V5.2L12 1Z" />
        <path d="m9.5 12.5 2.5 2.5 4-4" />
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
            What you get
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,4.4vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink">
            Premium adult content made simple
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Unlimited access to 5,000+ adult books, comics, and erotica. Private, secure, and available on all your devices.
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
