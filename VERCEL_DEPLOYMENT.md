# Vercel Deployment Guide for PredNim

Deploy your book subscription service to production in 5 minutes.

## Prerequisites

✅ GitHub account with repo pushed
✅ Vercel account (free at vercel.com)
✅ Supabase project with credentials
✅ (Optional) Stripe account for payments

## Step 1: Push to GitHub

```bash
cd /Users/mac/Documents/github/prednim
git push origin main
```

**Important**: Only `.env.example` is committed. Your actual secrets (`.env.local`) are in `.gitignore`.

## Step 2: Create Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. Select your `prednim` repository
4. Click "Import"
5. Click "Deploy"

## Step 3: Add Environment Variables

After the initial deploy, go to:
**Project Settings → Environment Variables**

Add these variables (copy from your `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=https://ozxvfqkwvsfzixdhzlod.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Each variable should be added with:**
- **Key**: The variable name
- **Value**: The secret value
- **Environments**: Select "Production", "Preview", "Development"

## Step 4: Redeploy with Secrets

1. Go to **Deployments**
2. Click the latest deployment
3. Click **"Redeploy"**
4. Confirm

Vercel will now deploy with your Supabase credentials.

## Step 5: Verify Deployment

1. Click the Deployment URL
2. Test the site:
   - ✅ Landing page loads
   - ✅ Pricing page shows plans
   - ✅ /signup page works
   - ✅ /login page works
   - ✅ /browse shows books

## Step 6: Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your custom domain
3. Update DNS records (Vercel will guide you)

## Environment Variables Reference

| Variable | Source | Type |
|----------|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | String |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | Public Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | Secret Key |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe → Dashboard | Public Key |
| `STRIPE_SECRET_KEY` | Stripe → Dashboard | Secret Key |

## Security Checklist

✅ `.env.local` is NOT in git (check `.gitignore`)
✅ `.env.example` is committed as template
✅ All secrets added in Vercel UI
✅ Environment variables set for all environments
✅ CORS configured in Supabase

## Post-Deployment

### Configure Supabase CORS

In Supabase dashboard:

1. Go to **Authentication → URL Configuration**
2. Add Vercel URL under "Site URL":
   ```
   https://your-app.vercel.app
   https://your-domain.com (if using custom domain)
   ```

### Set Up Email Provider

In Supabase:

1. **Authentication → Providers → Email**
2. Configure email templates
3. Add authorized redirect URLs

### Add Payment Provider (Optional)

1. Get Stripe test keys
2. Add to Vercel environment variables
3. Integrate Stripe in checkout page
4. Switch to live keys before going live

## Continuous Deployment

Every push to `main` automatically:
- Builds your app
- Runs tests (if configured)
- Deploys to production
- Generates preview URLs for PRs

## Monitoring

### Performance
- **Analytics**: Built into Vercel dashboard
- **Real-time**: See requests, response times, errors

### Logs
- **Function Logs**: View server-side errors
- **Browser Console**: Check client-side issues
- **Supabase Logs**: Monitor database queries

## Rollback

If something breaks:

1. Go to **Deployments**
2. Find the last working deployment
3. Click **"Redeploy"**
4. Confirm

Your app will revert to the previous version.

## Common Issues

### "Module not found" error
- Make sure all dependencies are installed
- Run `npm install` locally, commit package-lock.json

### Blank page or 404
- Check browser console for errors
- Verify all environment variables are set
- Check that Supabase project is accessible

### Authentication not working
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase → Authentication → URL Configuration
- Add Vercel URL to authorized redirect URLs

### Database queries failing
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set
- Check Supabase → Database → Tables exist
- Verify row-level security policies

## Next Steps

1. ✅ Deploy to Vercel
2. ⬜ Configure custom domain
3. ⬜ Set up email notifications
4. ⬜ Integrate payment provider
5. ⬜ Set up monitoring/analytics
6. ⬜ Go live!

## Support

- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

---

🚀 Your app is ready to scale!
