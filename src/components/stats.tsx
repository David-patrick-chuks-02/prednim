import { Counter } from "@/components/counter";

const STATS = [
  { to: 100, decimals: 0, suffix: "%", label: "Community-created content" },
  { to: 100, decimals: 0, suffix: "%", label: "Discreet billing" },
  { to: 3, decimals: 0, suffix: "", label: "Subscription plans" },
  { to: 18, decimals: 0, suffix: "+", label: "Age requirement" },
];

export function Stats() {
  return (
    <section id="results" className="scroll-mt-20 border-y border-line bg-elevated/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <p className="text-center text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          Unlimited access to premium adult content
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display block text-[clamp(2.25rem,5vw,3.25rem)] leading-none font-extrabold tracking-[-0.03em] text-accent">
                  <Counter
                    to={stat.to}
                    decimals={stat.decimals ?? 0}
                    suffix={stat.suffix}
                  />
                </span>
                <span className="mt-3 block text-[13px] leading-snug text-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
