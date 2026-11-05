export interface PremiumBook {
  id: string;
  title: string;
  slug: string;
  description: string;
  pages: number;
  chapters: number;
  pdfUrl: string;
  coverUrl?: string;
  createdAt: string;
}

export const PREMIUM_BOOKS: PremiumBook[] = [
  {
    id: "pb-001",
    title: "The Cartographer of Borrowed Rain",
    slug: "the-cartographer-of-borrowed-rain",
    description: "An explorer mapping cities through memory and lost love, revealing secrets hidden in forgotten places.",
    pages: 714,
    chapters: 31,
    pdfUrl: "/books/the-cartographer-of-borrowed-rain/THE_CARTOGRAPHER_OF_BORROWED_RAIN.pdf",
    createdAt: "2026-11-05",
  },
  {
    id: "pb-002",
    title: "A Museum for Unfinished Goodbyes",
    slug: "a-museum-for-unfinished-goodbyes",
    description: "A curator collecting objects left behind at heartbreak, building a collection of unspoken farewells.",
    pages: 714,
    chapters: 31,
    pdfUrl: "/books/a-museum-for-unfinished-goodbyes/A_MUSEUM_FOR_UNFINISHED_GOODBYES.pdf",
    createdAt: "2026-11-05",
  },
  {
    id: "pb-003",
    title: "The Orchard Beneath the Clocktower",
    slug: "the-orchard-beneath-the-clocktower",
    description: "An orchard keeper hiding forbidden fruit and time's secrets in a place where past and present collide.",
    pages: 714,
    chapters: 31,
    pdfUrl: "/books/the-orchard-beneath-the-clocktower/THE_ORCHARD_BENEATH_THE_CLOCKTOWER.pdf",
    createdAt: "2026-11-05",
  },
  {
    id: "pb-004",
    title: "The Map of Things We Buried",
    slug: "the-map-of-things-we-buried",
    description: "Archaeologist uncovering what families deliberately hid, mapping the geography of shared secrets.",
    pages: 714,
    chapters: 31,
    pdfUrl: "/books/the-map-of-things-we-buried/THE_MAP_OF_THINGS_WE_BURIED.pdf",
    createdAt: "2026-11-05",
  },
  {
    id: "pb-005",
    title: "A Thousand Windows Facing North",
    slug: "a-thousand-windows-facing-north",
    description: "Building dweller discovering secrets behind every window, each pane revealing a different truth.",
    pages: 714,
    chapters: 31,
    pdfUrl: "/books/a-thousand-windows-facing-north/A_THOUSAND_WINDOWS_FACING_NORTH.pdf",
    createdAt: "2026-11-05",
  },
  {
    id: "pb-006",
    title: "The Lighthouse Keeps No Names",
    slug: "the-lighthouse-keeps-no-names",
    description: "Lighthouse keeper protecting lost souls finding refuge in the beam of a lighthouse that forgets nothing.",
    pages: 714,
    chapters: 31,
    pdfUrl: "/books/the-lighthouse-keeps-no-names/THE_LIGHTHOUSE_KEEPS_NO_NAMES.pdf",
    createdAt: "2026-11-05",
  },
  {
    id: "pb-007",
    title: "The Quiet Mathematics of Hearts",
    slug: "the-quiet-mathematics-of-hearts",
    description: "Mathematician calculating patterns of love and loss, finding equations in the chaos of emotion.",
    pages: 714,
    chapters: 31,
    pdfUrl: "/books/the-quiet-mathematics-of-hearts/THE_QUIET_MATHEMATICS_OF_HEARTS.pdf",
    createdAt: "2026-11-05",
  },
  {
    id: "pb-008",
    title: "Where the Paper Moons Fall",
    slug: "where-the-paper-moons-fall",
    description: "Poet discovering alternate worlds through written words, where reality bends to imagination.",
    pages: 714,
    chapters: 31,
    pdfUrl: "/books/where-the-paper-moons-fall/WHERE_THE_PAPER_MOONS_FALL.pdf",
    createdAt: "2026-11-05",
  },
  {
    id: "pb-009",
    title: "The Botanist of Forgotten Promises",
    slug: "the-botanist-of-forgotten-promises",
    description: "Garden scientist cultivating redemption through growth, nurturing broken things back to life.",
    pages: 714,
    chapters: 31,
    pdfUrl: "/books/the-botanist-of-forgotten-promises/THE_BOTANIST_OF_FORGOTTEN_PROMISES.pdf",
    createdAt: "2026-11-05",
  },
  {
    id: "pb-010",
    title: "A Season of Unclaimed Stars",
    slug: "a-season-of-unclaimed-stars",
    description: "Astronomer inheriting cosmic mysteries from predecessor, mapping the inheritance of wonder.",
    pages: 714,
    chapters: 31,
    pdfUrl: "/books/a-season-of-unclaimed-stars/A_SEASON_OF_UNCLAIMED_STARS.pdf",
    createdAt: "2026-11-05",
  },
];
