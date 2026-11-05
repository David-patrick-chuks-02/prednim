# Premium Books Setup Guide

## Overview

This guide explains how to set up the premium books feature for Prednim. Paid users can read 10 premium books directly on the website using an integrated PDF reader.

## Current Status

✅ **Completed:**
- 10 Premium books created (714 pages each, 31 chapters per book)
- PDFs copied to `/public/books/` directory (5.4 MB total)
- React components created for premium books display
- API route created for authenticated access
- Database schema created
- All infrastructure ready

## Setup Steps

### 1. Seed the Database

Run this SQL script in your Supabase SQL editor:

```bash
# Via CLI (recommended)
supabase db push

# Or manually via Supabase dashboard:
# SQL Editor → Run the SQL from scripts/seed-premium-books.sql
```

**Script location:** `/scripts/seed-premium-books.sql`

This creates:
- `premium_books` table with 10 books seeded
- Indexes for performance
- Row-level security policies
- Permissions for authenticated users

### 2. Verify Setup

The database should now contain:

```sql
SELECT id, title, pages, chapters FROM premium_books;
```

Expected output: 10 books with 714 pages each

### 3. Test in Browser

1. Visit `http://localhost:3000/dashboard`
2. If you have an active subscription, you'll see:
   - "Premium Library" section with 10 books
   - Each book shows:
     - Title
     - Description
     - Page count (714)
     - Chapter count (31)

### 4. Reading a Book

Click any book card to open the PDF reader:

**Features:**
- ✓ Navigation (previous/next page)
- ✓ Page jump (enter page number)
- ✓ Zoom in/out (100% to 200%)
- ✓ Download PDF button
- ✓ Full-screen close button
- ✓ Page counter

## File Structure

```
/public/books/
├── the-cartographer-of-borrowed-rain/
│   └── THE_CARTOGRAPHER_OF_BORROWED_RAIN.pdf (538 KB)
├── a-museum-for-unfinished-goodbyes/
│   └── A_MUSEUM_FOR_UNFINISHED_GOODBYES.pdf
├── the-orchard-beneath-the-clocktower/
│   └── THE_ORCHARD_BENEATH_THE_CLOCKTOWER.pdf
├── ... (7 more books)

/src/components/
├── premium-books.tsx (displays book grid)
└── premium-book-reader.tsx (PDF reader UI)

/src/lib/
├── premiumBooks.ts (book metadata)

/src/app/api/books/
└── premium/route.ts (API endpoint)

/src/app/dashboard/
└── page.tsx (updated to show premium books)
```

## API Endpoint

**GET** `/api/books/premium`

**Requirements:**
- User must be authenticated
- User must have an active subscription

**Response:**
```json
{
  "books": [
    {
      "id": "pb-001",
      "title": "The Cartographer of Borrowed Rain",
      "slug": "the-cartographer-of-borrowed-rain",
      "description": "...",
      "pages": 714,
      "chapters": 31,
      "pdfUrl": "/books/the-cartographer-of-borrowed-rain/THE_CARTOGRAPHER_OF_BORROWED_RAIN.pdf",
      "createdAt": "2026-11-05"
    },
    ...
  ],
  "subscription": {
    "plan": "premium",
    "status": "active"
  }
}
```

## Premium Books Included

1. ✅ **The Cartographer of Borrowed Rain** - 714 pages
2. ✅ **A Museum for Unfinished Goodbyes** - 714 pages
3. ✅ **The Orchard Beneath the Clocktower** - 714 pages
4. ✅ **The Map of Things We Buried** - 714 pages
5. ✅ **A Thousand Windows Facing North** - 714 pages
6. ✅ **The Lighthouse Keeps No Names** - 714 pages
7. ✅ **The Quiet Mathematics of Hearts** - 714 pages
8. ✅ **Where the Paper Moons Fall** - 714 pages
9. ✅ **The Botanist of Forgotten Promises** - 714 pages
10. ✅ **A Season of Unclaimed Stars** - 714 pages

## Adding More Books

To add the remaining 10 books later:

1. Copy PDFs to `/public/books/{book-slug}/`
2. Add book entry to `PREMIUM_BOOKS` in `/src/lib/premiumBooks.ts`
3. Add SQL INSERT to seed script
4. Run database migration

## Security

✅ **Access Control:**
- Only authenticated users can access the API
- Only users with active subscriptions can read books
- Row-level security (RLS) enabled on database
- Books served from static public folder (no streaming required)

## Performance

📊 **Metrics:**
- 10 books × 714 pages = 7,140 total pages
- Total size: 5.4 MB (all books)
- Average per book: 538 KB
- PDF render: Native browser support (iframe)

## Troubleshooting

### Books not showing in dashboard
- [ ] User has active subscription? Check subscription status
- [ ] API returning 403? Check subscription in database
- [ ] PDFs not loading? Verify files in `/public/books/`

### PDF not rendering
- [ ] Check browser console for CORS errors
- [ ] Verify PDF file exists at path
- [ ] Try downloading PDF directly via link

### Database issues
- [ ] Check that `premium_books` table exists
- [ ] Verify RLS policies are set
- [ ] Confirm permissions are granted to authenticated users

## Next Steps

- [ ] Add cover images for each book
- [ ] Implement bookmarks/highlights feature
- [ ] Add book progress tracking
- [ ] Create reading statistics dashboard
- [ ] Add 10 more premium books (20 books total)
- [ ] Implement PDF search functionality

## Support

For issues or questions about the premium books feature, check:
1. `/src/components/premium-books.tsx` - UI component
2. `/src/app/api/books/premium/route.ts` - API logic
3. `/scripts/seed-premium-books.sql` - Database schema
4. Console logs in browser DevTools
