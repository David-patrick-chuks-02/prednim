export const SITE_NAME = "PredNim";
export const SITE_TAGLINE = "Community-powered adult books & comics. 18+";
export const SITE_TITLE = `${SITE_NAME} — Community-powered adult books & comics (18+)`;
export const SITE_DESCRIPTION =
  "PredNim is a community-driven adult book subscription service. Get unlimited access to exclusive erotic novels, romance, and comic books created by our community. Choose your plan: Monthly ($100), 6 Months ($500), or Annual ($1000). Content: 18+ Only";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prednim.com";

export const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "18+ Verified", href: "/verify-age" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Service",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Contact", href: "/contact" },
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
