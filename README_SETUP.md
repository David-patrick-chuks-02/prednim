# PredNim - Book Subscription Service

A premium book subscription platform built with Next.js, Supabase, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or pnpm
- Supabase account (free at [supabase.com](https://supabase.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prednim.git
cd prednim
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Go to Project Settings → API to get your credentials

4. Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

5. Set up the database:
   - Open your Supabase project's SQL Editor
   - Copy and run all queries from `SUPABASE_SETUP.md`
   - This creates all necessary tables with security policies

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3005](http://localhost:3005) in your browser.

## 📖 Features

### For Customers

✅ **User Authentication**
- Sign up with email/password
- Email verification
- Secure session management
- Profile management

✅ **Book Library**
- Browse 5,000+ hand-picked books
- Book previews/reader interface
- Star ratings and reviews
- Stock availability tracking

✅ **Subscription Plans**
- Monthly: $100/month
- 6 Months: $500 (best value)
- Annual: $1,000/year
- 7-day free trial on all plans
- Cancel anytime

✅ **Reading Features**
- Full-screen book reader
- Adjustable font sizes
- Dark/light theme toggle
- Reading progress tracking
- Bookmarks and notes
- Offline reading support

✅ **Account Management**
- View subscription status
- Change plans
- Cancel subscription
- Download account data
- Delete account

### Admin Features (Coming Soon)

- Analytics dashboard
- Book management
- User management
- Revenue reporting
- Email campaigns

## 🗂️ Project Structure

```
prednim/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── signup/               # Sign up
│   │   ├── login/                # Login
│   │   ├── dashboard/            # User dashboard
│   │   ├── browse/               # Book library
│   │   ├── checkout/             # Payment page
│   │   ├── account/              # Account settings
│   │   ├── pricing/              # Pricing page
│   │   ├── faq/                  # FAQ page
│   │   ├── about/                # About page
│   │   └── [other pages]/        # Additional pages
│   ├── components/
│   │   ├── site-header.tsx       # Navigation
│   │   ├── site-footer.tsx       # Footer
│   │   ├── pricing.tsx           # Pricing cards
│   │   ├── books-grid.tsx        # Book grid
│   │   ├── book-reader.tsx       # Book reader UI
│   │   └── [other components]/
│   ├── contexts/
│   │   └── auth-context.tsx      # Auth state management
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client
│   │   ├── books.ts              # Books data
│   │   └── site.ts               # Site config
│   └── globals.css               # Global styles
├── .env.local                    # Environment variables (create this)
├── SUPABASE_SETUP.md             # Database setup guide
└── README_SETUP.md               # This file
```

## 🗄️ Database Schema

### Tables

1. **profiles** - User information extended from Auth
   - id (UUID)
   - full_name
   - email
   - avatar_url

2. **subscriptions** - User subscription data
   - id (UUID)
   - user_id (FK)
   - plan_type (monthly/sixmonth/annual)
   - status (active/cancelled/expired)
   - expires_at

3. **books** - Book information
   - id (VARCHAR)
   - title, author, description
   - rating, reviews_count
   - content (full text)

4. **reading_progress** - Track user reading
   - id (UUID)
   - user_id, book_id (FK)
   - progress_percentage
   - is_completed
   - reading_time_minutes

5. **book_highlights** - User notes
   - id (UUID)
   - user_id, book_id (FK)
   - text, note
   - color

6. **wishlist** - Books to read later
   - id (UUID)
   - user_id, book_id (FK)

## 🔐 Authentication

PredNim uses Supabase Auth with row-level security:

- **Sign Up**: Creates user in `auth.users` and `profiles`
- **Login**: Email/password authentication
- **Protected Routes**: Check `useAuth()` hook for user
- **Auto-redirect**: Logged-out users redirected to /login
- **Session**: Persists across page reloads

## 💳 Payment Integration

Currently using UI placeholder. To implement payments:

1. **Choose Provider**:
   - Stripe (recommended)
   - Paddle
   - Lemonsqueezy
   - Gumroad

2. **Setup**:
   - Add provider API keys to `.env.local`
   - Create Supabase function for webhook handling
   - Update checkout page with payment form
   - Store subscription data in `subscriptions` table

3. **Webhook Handling**:
   - Create Supabase Edge Function
   - Listen for payment events
   - Update subscription status

Example with Stripe:
```javascript
// In /checkout/page.tsx
import { loadStripe } from "@stripe/stripe-js";

const handleCheckout = async () => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  const { sessionId } = await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({ plan: selectedPlan })
  }).then(r => r.json());
  
  await stripe.redirectToCheckout({ sessionId });
};
```

## 📧 Email Notifications

Use Supabase Functions to send emails:

- Welcome email (new account)
- Trial ending soon
- Subscription renewal
- Payment failed
- Cancellation confirmation

```bash
supabase functions new send-emails
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

- Railway
- Netlify
- Supabase Hosting
- AWS Amplify

## 📊 Monitoring & Analytics

Add to your tech stack:

- **Analytics**: PostHog, Mixpanel, or Plausible
- **Error Tracking**: Sentry
- **Performance**: Vercel Analytics
- **Database**: Supabase built-in stats

## 🔄 API Endpoints (for payment processing)

Create these Supabase Edge Functions:

```
/api/checkout           - Create payment session
/api/webhooks/stripe    - Handle Stripe events
/api/subscription       - Get subscription status
/api/cancel-subscription - Cancel subscription
/api/books              - Get books list
/api/reading-progress   - Update reading progress
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📝 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Payment Provider (add as needed)
NEXT_PUBLIC_STRIPE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx

# Other
NEXT_PUBLIC_APP_URL=https://prednim.com
```

## 🛠️ Development Workflow

1. Create feature branch
2. Make changes
3. Test locally
4. Commit with clear messages
5. Push and create PR
6. Deploy to staging
7. Test in production
8. Merge to main

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Make changes
4. Submit PR

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 💬 Support

For questions or issues:
- Check `SUPABASE_SETUP.md` for database setup
- Review `/login` and `/signup` for auth examples
- See `/dashboard` for protected route patterns
- Check `/browse` for book library implementation

## 🎯 Next Steps

1. ✅ Set up Supabase (see SUPABASE_SETUP.md)
2. ⬜ Integrate payment provider (Stripe recommended)
3. ⬜ Deploy to Vercel
4. ⬜ Set up email notifications
5. ⬜ Add analytics tracking
6. ⬜ Launch MVP

---

Built with ❤️ by David
