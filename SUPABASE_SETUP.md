# PredNim Supabase Setup Guide

This guide walks you through setting up Supabase for PredNim.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new account or sign in
3. Click "New Project" and fill in the details
4. Copy your project URL and API key

## 2. Add Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 3. Create Database Tables

In Supabase SQL Editor, run these queries:

### Users Table (automatically created by Auth)

Supabase Auth handles users, but you may want to extend it:

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);
```

### Subscriptions Table

```sql
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  plan_type VARCHAR(50) NOT NULL, -- 'monthly', 'sixmonth', 'annual'
  price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription."
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription."
  ON public.subscriptions FOR UPDATE
  USING (auth.uid() = user_id);
```

### Books Table

```sql
CREATE TABLE public.books (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
  cover_url TEXT,
  rating DECIMAL(3, 1),
  reviews_count INT DEFAULT 0,
  price DECIMAL(10, 2),
  in_stock INT DEFAULT 0,
  content TEXT, -- Full book content
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Books are viewable by everyone."
  ON public.books FOR SELECT
  USING (true);
```

### Reading Progress Table

```sql
CREATE TABLE public.reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  book_id VARCHAR(50) NOT NULL REFERENCES public.books ON DELETE CASCADE,
  progress_percentage INT DEFAULT 0,
  last_position INT DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  reading_time_minutes INT DEFAULT 0,
  bookmarked BOOLEAN DEFAULT FALSE,
  notes TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, book_id)
);

ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reading progress."
  ON public.reading_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own reading progress."
  ON public.reading_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reading progress."
  ON public.reading_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Highlights/Notes Table

```sql
CREATE TABLE public.book_highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  book_id VARCHAR(50) NOT NULL REFERENCES public.books ON DELETE CASCADE,
  text TEXT NOT NULL,
  note TEXT,
  position INT,
  color VARCHAR(50) DEFAULT 'yellow',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.book_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own highlights."
  ON public.book_highlights FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own highlights."
  ON public.book_highlights FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own highlights."
  ON public.book_highlights FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own highlights."
  ON public.book_highlights FOR DELETE
  USING (auth.uid() = user_id);
```

### Wishlist Table

```sql
CREATE TABLE public.wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  book_id VARCHAR(50) NOT NULL REFERENCES public.books ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, book_id)
);

ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wishlist."
  ON public.wishlist FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own wishlist."
  ON public.wishlist FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own wishlist."
  ON public.wishlist FOR DELETE
  USING (auth.uid() = user_id);
```

## 4. Enable Email Provider

1. Go to Authentication → Providers
2. Enable "Email"
3. Configure email settings

## 5. Test the Connection

Run the app:

```bash
npm run dev
```

Try signing up or logging in. Check the Supabase dashboard to confirm user data is being created.

## 6. Seed Sample Data

In Supabase SQL Editor, insert sample books:

```sql
INSERT INTO public.books (id, title, author, description, rating, reviews_count, in_stock) VALUES
('1', 'The Midnight Library', 'Matt Haig', 'A dazzling novel about all the choices that go into a life well lived.', 4.8, 3421, 45),
('2', 'Lessons in Chemistry', 'Bonnie Garmus', 'A captivating novel set in the 1960s about a female chemist.', 4.7, 2156, 32),
-- Add more books...
;
```

## Next Steps

- Set up Stripe/Paddle for payments
- Implement email notifications
- Add book content storage
- Set up file storage for book covers

