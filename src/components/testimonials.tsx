const QUOTES = [
  {
    quote:
      "I’d basically stopped finishing books. Three PredNim picks in a row and I read all of them cover to cover — the first time that’s happened in years.",
    name: "Sarah Johnson",
    role: "Member since 2023",
    initials: "SJ",
  },
  {
    quote:
      "The recommendations actually explain themselves. I know why they think I’ll like something, which means I trust the ones I’d never have picked myself.",
    name: "Michael Chen",
    role: "Member since 2024",
    initials: "MC",
  },
  {
    quote:
      "Orders arrive the next day, wrapped properly, and the staff notes make it feel like a real shop. My class reading list comes from here now.",
    name: "Emily Rodriguez",
    role: "Member since 2022",
    initials: "ER",
  },
];

export function Testimonials() {
  return (
    <section id="staff-picks" className="scroll-mt-20 border-y border-line bg-elevated/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
            Loved by real readers
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,4.4vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink">
            Real stories from real shelves
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
            Here’s what our regulars say about shopping with PredNim.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {QUOTES.map((item) => (
            <li
              key={item.name}
              className="flex flex-col rounded-2xl border border-line bg-card/70 p-6"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-2.5 py-1">
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-accent" fill="currentColor">
                  <path d="M9.6 5.5 7.9 8.4l-3 .7 2.1 2.2-.4 3 2.7-1.4 2.7 1.4-.4-3 2.1-2.2-3-.7-1.1-2.9Z" />
                </svg>
                <span className="text-[10px] font-semibold tracking-wide text-accent uppercase">
                  Verified purchase
                </span>
              </span>

              <blockquote className="mt-5 flex-1 text-[14.5px] leading-relaxed text-ink/90">
                <span aria-hidden className="text-accent">
                  “
                </span>
                {item.quote}
                <span aria-hidden className="text-accent">
                  ”
                </span>
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-line/70 pt-5">
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center rounded-full border border-accent/25 bg-accent-soft font-display text-[11px] font-bold text-accent"
                >
                  {item.initials}
                </span>
                <span>
                  <span className="block text-[13px] font-semibold text-ink">{item.name}</span>
                  <span className="block text-[11.5px] text-muted">{item.role}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
