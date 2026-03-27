# SubTrack Vercel Deployment Guide

## Critical: Environment Variables on Vercel

Your `.env` file does **NOT** deploy to Vercel for security reasons. You must manually set environment variables in the Vercel dashboard.

### Step 1: Add Environment Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your SubTrack project
3. Go to **Settings** → **Environment Variables**
4. Click **Add Environment Variable**
5. Add this variable:
   - **Name:** `VITE_GOOGLE_CLIENT_ID`
   - **Value:** Your Google Client ID (from Google Cloud Console)
   - Select **Preview, Production, Development** (all three)
6. Click **Save**

### Step 2: Redeploy Your Project

After adding env variables, redeploy your project:
- Push to GitHub, or
- Click **Redeploy** in Vercel dashboard

### Step 3: Authorize Your Vercel Domain in Google Cloud

1. Get your Vercel deployment URL: `yourproject.vercel.app`
2. Go to [Google Cloud Console](https://console.cloud.google.com/)
3. Navigate to **APIs & Services** → **Credentials**
4. Click your OAuth 2.0 Client ID
5. Under **Authorized JavaScript origins**, add:
   ```
   https://yourproject.vercel.app
   ```
6. Under **Authorized redirect URIs**, add:
   ```
   https://yourproject.vercel.app
   ```
7. Click **Save**

### Step 4: Test It

1. Visit your Vercel URL: `https://yourproject.vercel.app`
2. Open browser DevTools (F12) → **Console**
3. You should see:
   - `✓ Google Sign-In script loaded successfully`
   - `✓ Google Sign-In button rendered successfully`
4. Click the Google button and test the sign-in

## Troubleshooting

### "Google Client ID not configured!"
- Check Vercel dashboard → Settings → Environment Variables
- Make sure `VITE_GOOGLE_CLIENT_ID` is set
- Redeploy after adding the variable

### Google button doesn't appear
Check browser console (F12) for errors:
- `Google library not loaded yet` → Wait a moment and refresh
- `Google button container not found` → Contact support
- Any CORS error → Your domain is not authorized in Google Cloud Console

### Google sign-in fails with CORS error
1. You haven't added your Vercel domain to Google Cloud Console
2. Make sure you're using `https://` (not `http://`)
3. Wait a few minutes after updating Google Console for changes to propagate
4. Check that the domain matches exactly (including `www.` if applicable)

### Still not working?
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for error messages starting with ❌
4. Screenshot the errors and share them

## Expected Console Output (Success)

```
✓ Google Sign-In script loaded successfully
✓ Google Sign-In button rendered successfully
```

When you click the button:
```
✓ Google sign-in response received
✓ User signed in: user@gmail.com
```

## Environment Variable Reference

| Variable | Required | Example |
|----------|----------|---------|
| `VITE_GOOGLE_CLIENT_ID` | Yes | `1008055297524-skjnlhj5m9q0u0chnf...` |

---

**Pro Tip:** Use the browser's Application/Storage tab to verify `VITE_GOOGLE_CLIENT_ID` is loaded:
- Open DevTools → **Application** → **Environment Variables** (some browsers)
- Or run in console: `console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)`
