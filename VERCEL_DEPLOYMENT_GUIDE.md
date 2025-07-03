# 🚀 Vercel Deployment with Environment Variables

## Step 1: Create Production Environment File
Create `.env.production` (this will be used by Vercel):

```bash
# Your actual domain after deployment
NEXT_PUBLIC_BASE_URL=https://nutri-guardian.vercel.app

# Leave empty for now, add after Google Search Console setup
NEXT_PUBLIC_GOOGLE_VERIFICATION=

# Optional - add later when you set up analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Social media handles
NEXT_PUBLIC_TWITTER_HANDLE=@nutriguardian
NEXT_PUBLIC_FACEBOOK_PAGE=https://www.facebook.com/profile.php?id=61576751584978
```

## Step 2: Deploy with Environment Variables

### Option A: Interactive Deployment (Recommended)
```bash
vercel
```
When prompted:
- Project name: `nutri-guardian`
- Framework: `Next.js`
- Environment variables: Select "Yes" and add them

### Option B: Command Line Deployment
```bash
# Set environment variables
vercel env add NEXT_PUBLIC_BASE_URL production
# Enter: https://nutri-guardian.vercel.app

vercel env add NEXT_PUBLIC_TWITTER_HANDLE production  
# Enter: @nutriguardian

vercel env add NEXT_PUBLIC_FACEBOOK_PAGE production
# Enter: https://www.facebook.com/profile.php?id=61576751584978

# Deploy
vercel --prod
```

## Step 3: After Deployment - Update Base URL

Once deployed, you'll get your actual URL. Update it:
```bash
vercel env rm NEXT_PUBLIC_BASE_URL production
vercel env add NEXT_PUBLIC_BASE_URL production
# Enter your actual URL: https://your-actual-domain.vercel.app
```

## Step 4: Add Google Search Console

1. Get your live URL from Vercel
2. Go to Google Search Console
3. Add property with your URL
4. Get verification code
5. Add to Vercel:
```bash
vercel env add NEXT_PUBLIC_GOOGLE_VERIFICATION production
# Enter your Google verification code
```

## Step 5: Redeploy with Updated Variables
```bash
vercel --prod
```

## 🎯 Why This Matters for SEO:

✅ **Correct Open Graph URLs** - Social sharing will work properly
✅ **Proper Canonical URLs** - Prevents duplicate content issues  
✅ **Search Console Verification** - Google can index your site
✅ **Analytics Tracking** - Monitor your SEO performance
✅ **Social Media Integration** - Better brand presence

## 🚨 Important Notes:

1. **NEXT_PUBLIC_** prefix makes variables available in browser
2. **Never commit .env.local** to Git (it's in .gitignore)
3. **Always use production values** for deployed site
4. **Update BASE_URL** to match your actual domain
