-- Create premium_books table if it doesn't exist
CREATE TABLE IF NOT EXISTS premium_books (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  description TEXT,
  pages INTEGER NOT NULL,
  chapters INTEGER NOT NULL,
  pdf_url VARCHAR(1000) NOT NULL,
  cover_url VARCHAR(1000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for slug lookup
CREATE INDEX IF NOT EXISTS idx_premium_books_slug ON premium_books(slug);

-- Seed the first 10 premium books
INSERT INTO premium_books (id, title, slug, description, pages, chapters, pdf_url, created_at)
VALUES
  (
    'pb-001',
    'The Cartographer of Borrowed Rain',
    'the-cartographer-of-borrowed-rain',
    'An explorer mapping cities through memory and lost love, revealing secrets hidden in forgotten places.',
    714,
    31,
    '/books/the-cartographer-of-borrowed-rain/THE_CARTOGRAPHER_OF_BORROWED_RAIN.pdf',
    NOW()
  ),
  (
    'pb-002',
    'A Museum for Unfinished Goodbyes',
    'a-museum-for-unfinished-goodbyes',
    'A curator collecting objects left behind at heartbreak, building a collection of unspoken farewells.',
    714,
    31,
    '/books/a-museum-for-unfinished-goodbyes/A_MUSEUM_FOR_UNFINISHED_GOODBYES.pdf',
    NOW()
  ),
  (
    'pb-003',
    'The Orchard Beneath the Clocktower',
    'the-orchard-beneath-the-clocktower',
    'An orchard keeper hiding forbidden fruit and time''s secrets in a place where past and present collide.',
    714,
    31,
    '/books/the-orchard-beneath-the-clocktower/THE_ORCHARD_BENEATH_THE_CLOCKTOWER.pdf',
    NOW()
  ),
  (
    'pb-004',
    'The Map of Things We Buried',
    'the-map-of-things-we-buried',
    'Archaeologist uncovering what families deliberately hid, mapping the geography of shared secrets.',
    714,
    31,
    '/books/the-map-of-things-we-buried/THE_MAP_OF_THINGS_WE_BURIED.pdf',
    NOW()
  ),
  (
    'pb-005',
    'A Thousand Windows Facing North',
    'a-thousand-windows-facing-north',
    'Building dweller discovering secrets behind every window, each pane revealing a different truth.',
    714,
    31,
    '/books/a-thousand-windows-facing-north/A_THOUSAND_WINDOWS_FACING_NORTH.pdf',
    NOW()
  ),
  (
    'pb-006',
    'The Lighthouse Keeps No Names',
    'the-lighthouse-keeps-no-names',
    'Lighthouse keeper protecting lost souls finding refuge in the beam of a lighthouse that forgets nothing.',
    714,
    31,
    '/books/the-lighthouse-keeps-no-names/THE_LIGHTHOUSE_KEEPS_NO_NAMES.pdf',
    NOW()
  ),
  (
    'pb-007',
    'The Quiet Mathematics of Hearts',
    'the-quiet-mathematics-of-hearts',
    'Mathematician calculating patterns of love and loss, finding equations in the chaos of emotion.',
    714,
    31,
    '/books/the-quiet-mathematics-of-hearts/THE_QUIET_MATHEMATICS_OF_HEARTS.pdf',
    NOW()
  ),
  (
    'pb-008',
    'Where the Paper Moons Fall',
    'where-the-paper-moons-fall',
    'Poet discovering alternate worlds through written words, where reality bends to imagination.',
    714,
    31,
    '/books/where-the-paper-moons-fall/WHERE_THE_PAPER_MOONS_FALL.pdf',
    NOW()
  ),
  (
    'pb-009',
    'The Botanist of Forgotten Promises',
    'the-botanist-of-forgotten-promises',
    'Garden scientist cultivating redemption through growth, nurturing broken things back to life.',
    714,
    31,
    '/books/the-botanist-of-forgotten-promises/THE_BOTANIST_OF_FORGOTTEN_PROMISES.pdf',
    NOW()
  ),
  (
    'pb-010',
    'A Season of Unclaimed Stars',
    'a-season-of-unclaimed-stars',
    'Astronomer inheriting cosmic mysteries from predecessor, mapping the inheritance of wonder.',
    714,
    31,
    '/books/a-season-of-unclaimed-stars/A_SEASON_OF_UNCLAIMED_STARS.pdf',
    NOW()
  );

-- Enable RLS (Row Level Security) for premium_books table
ALTER TABLE premium_books ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to view premium books
CREATE POLICY IF NOT EXISTS "Users can view premium books"
  ON premium_books
  FOR SELECT
  TO authenticated
  USING (true);

-- Grant permissions to anon and authenticated users
GRANT SELECT ON premium_books TO anon;
GRANT SELECT ON premium_books TO authenticated;
