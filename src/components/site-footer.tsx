import { Logo } from "@/components/logo";
import { FOOTER_COLUMNS, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted">
              Premium adult book & comic subscription. Unlimited access to 5,000+ titles.
              Discreet, secure, 18+ only.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-[11px] font-semibold tracking-[0.14em] text-ink uppercase">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13px] text-muted transition hover:text-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-muted">
            © {new Date().getFullYear()} {SITE_NAME}. All content 18+
          </p>
          <div className="flex gap-5">
            <a
              href="/privacy"
              className="text-[12px] text-muted transition hover:text-accent"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-[12px] text-muted transition hover:text-accent"
            >
              Terms
            </a>
            <a
              href="/cookies"
              className="text-[12px] text-muted transition hover:text-accent"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
