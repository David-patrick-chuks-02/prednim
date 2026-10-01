import { Counter } from "@/components/counter";

const STATS = [
  { to: 2.4, decimals: 1, suffix: "M+", label: "Books delivered to readers" },
  { to: 98.6, decimals: 1, suffix: "%", label: "Orders dispatched the same day" },
  { to: 4.9, decimals: 1, suffix: "/5", label: "Average rating from readers" },
  { to: 10000, group: true, suffix: "+", label: "Regulars who keep coming back" },
];

export function Stats() {
  return (
    <section id="results" className="scroll-mt-20 border-y border-line bg-elevated/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <p className="text-center text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          Here’s what happens when you stop buying books nobody finishes
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
                    group={stat.group}
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
