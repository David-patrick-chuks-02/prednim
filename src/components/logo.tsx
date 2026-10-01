import Link from "next/link";

import { SITE_NAME } from "@/lib/site";

/** Wordmark: Pred + Nim, accent on the second half. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold tracking-tight ${className}`}>
      Pred<span className="text-accent">Nim</span>
    </span>
  );
}

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label={`${SITE_NAME} home`}>
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-lg border border-accent/30 bg-accent-soft"
      >
        {/* open book */}
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="none" strokeWidth="2">
          <path
            d="M12 7c-1.6-1.3-3.5-1.9-6-1.9H4.5v12H6c2.5 0 4.4.6 6 1.9 1.6-1.3 3.5-1.9 6-1.9h1.5v-12H18c-2.5 0-4.4.6-6 1.9Z"
            stroke="currentColor"
            strokeLinejoin="round"
          />
          <path d="M12 7v12" stroke="currentColor" strokeLinecap="round" />
        </svg>
      </span>
      <Wordmark className="text-[15px]" />
    </Link>
  );
}
