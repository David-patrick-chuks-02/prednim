const STARS = [0, 1, 2, 3, 4];

const PICKS = [
  { title: "Salt & Ceremony", author: "Nadia Okonjo", price: "$12.99", tag: "Staff pick" },
  { title: "Quiet Machines", author: "Peter Halvorsen", price: "$16.50", tag: "New in" },
  { title: "The Long Field", author: "Iris Beaumont", price: "$11.25", tag: "Signed" },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="flex items-center gap-0.5 text-accent" aria-label={`${count} out of 5`}>
      {STARS.map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden>
          <path d="M10 1.6l2.4 5 5.5.8-4 3.8.95 5.4L10 14.1 5.15 16.6 6.1 11.2l-4-3.8 5.5-.8L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

/** Static storefront preview — presentational only, no data fetching. */
export function BookshopMock() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="anim-glow absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(61,220,106,0.22),transparent_70%)]"
      />
      <div className="overflow-hidden rounded-2xl border border-line bg-card/80 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm">
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-line bg-elevated/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="ml-3 font-mono text-[11px] text-muted">shop.prednim.com/new-in</span>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* featured title */}
          <div className="flex gap-4">
            <div
              aria-hidden
              className="relative flex h-[9.5rem] w-[6.5rem] shrink-0 flex-col justify-between overflow-hidden rounded-lg border border-line bg-[linear-gradient(150deg,#132019_0%,#0f1a15_55%,#24382e_100%)] p-2.5 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)]"
            >
              <span className="absolute inset-y-0 left-0 w-1.5 bg-accent/25" />
              <span className="font-display relative text-[11px] leading-tight font-bold text-ink">
                The Lantern Keeper
              </span>
              <span className="relative text-[8px] tracking-wide text-muted uppercase">
                Mara Ellison
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-2 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[10px] font-semibold tracking-wide text-accent uppercase">
                  Book of the month
                </span>
              </span>

              <h3 className="font-display mt-2.5 text-[17px] leading-tight font-bold text-ink">
                The Lantern Keeper
              </h3>
              <p className="mt-0.5 text-[12px] text-muted">Mara Ellison</p>

              <div className="mt-2 flex items-center gap-2">
                <Stars />
                <span className="font-mono text-[11px] text-muted">4.9 · 214 reviews</span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span className="font-display text-lg font-bold text-ink">$14.99</span>
                <span className="text-[12px] text-muted line-through">$19.99</span>
              </div>

              <button
                type="button"
                className="mt-3 w-full rounded-lg bg-accent px-4 py-2 text-[12.5px] font-bold text-on-accent transition hover:bg-accent-dim"
              >
                Add to basket
              </button>
            </div>
          </div>

          {/* dispatch strip */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { k: "In stock", v: "12,480" },
              { k: "Dispatch", v: "98.6%" },
              { k: "Delivery", v: "Free" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-line/70 bg-elevated/50 px-3 py-2.5">
                <p className="text-[10px] font-semibold tracking-[0.1em] text-muted uppercase">
                  {s.k}
                </p>
                <p className="font-display mt-1 text-[15px] font-bold text-ink">{s.v}</p>
              </div>
            ))}
          </div>

          {/* picks list */}
          <div className="overflow-hidden rounded-xl border border-line/70">
            <div className="flex items-center justify-between bg-elevated/60 px-3 py-2">
              <p className="text-[10px] font-semibold tracking-[0.1em] text-muted uppercase">
                This week’s picks
              </p>
              <span className="font-mono text-[10px] text-muted">3 of 24</span>
            </div>
            <ul>
              {PICKS.map((book) => (
                <li
                  key={book.title}
                  className="flex items-center gap-3 border-t border-line/60 px-3 py-2.5"
                >
                  <span
                    aria-hidden
                    className="h-8 w-6 shrink-0 rounded border border-line bg-[linear-gradient(150deg,#132019,#24382e)]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-medium text-ink">
                      {book.title}
                    </span>
                    <span className="block truncate text-[10.5px] text-muted">{book.author}</span>
                  </span>
                  <span className="rounded-full border border-accent/25 bg-accent-soft px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-accent uppercase">
                    {book.tag}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{book.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
