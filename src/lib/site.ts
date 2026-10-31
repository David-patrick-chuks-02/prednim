export const SITE_NAME = "PredNim";
export const SITE_TAGLINE = "Unlimited books for book lovers";
export const SITE_TITLE = `${SITE_NAME} — Unlimited books for book lovers`;
export const SITE_DESCRIPTION =
  "PredNim is a premium book subscription service. Get unlimited access to 5,000+ hand-picked books. Choose your plan: Monthly ($100), 6 Months ($500), or Annual ($1000).";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prednim.com";

export const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Browse", href: "/browse" },
  { label: "FAQ", href: "/faq" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Service",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Browse books", href: "/browse" },
      { label: "Gift membership", href: "/gift" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our story", href: "/story" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Help centre", href: "/help" },
      { label: "Account settings", href: "/account" },
      { label: "Cancel membership", href: "/cancel" },
    ],
  },
] as const;
