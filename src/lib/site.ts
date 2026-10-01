export const SITE_NAME = "PredNim";
export const SITE_TAGLINE = "Books you’ll actually finish";
export const SITE_TITLE = `${SITE_NAME} — Books you’ll actually finish`;
export const SITE_DESCRIPTION =
  "PredNim is an independent bookshop run by readers. Hand-picked titles, recommendations that explain themselves, and same-day dispatch on every order.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prednim.com";

export const NAV_LINKS = [
  { label: "Shop", href: "#shop" },
  { label: "Recommendations", href: "#features" },
  { label: "Reviews", href: "#staff-picks" },
  { label: "Membership", href: "#pricing" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "New in", href: "#shop" },
      { label: "Bestsellers", href: "#results" },
      { label: "Staff picks", href: "#staff-picks" },
      { label: "Gift cards", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#about" },
      { label: "Our booksellers", href: "#booksellers" },
      { label: "Contact", href: "#contact" },
      { label: "Careers", href: "#careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Delivery & returns", href: "#delivery" },
      { label: "Help centre", href: "#help" },
      { label: "Reading guide", href: "#reading-guide" },
      { label: "Membership", href: "#pricing" },
    ],
  },
] as const;
