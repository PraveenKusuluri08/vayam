# Blank Page Fix Guide

## Issue
The application shows a blank page with 404 errors for CSS and JavaScript files.

## Root Cause
The Next.js static files (`.next` folder) were corrupted or missing, causing the browser to fail loading CSS and JS chunks.

## Solution Applied

1. **Cleared build cache:**
   ```bash
   rm -rf .next
   ```

2. **Fixed authentication errors:**
   - Updated NextAuth route handler for v5
   - Fixed error page prerender issue
   - Removed incompatible PrismaAdapter

3. **Restarted dev server:**
   ```bash
   npm run dev
   ```

## Steps to Fix (If Still Having Issues)

1. **Stop the dev server** (Ctrl+C)

2. **Clear cache:**
   ```bash
   rm -rf .next
   rm -rf node_modules/.cache
   ```

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

4. **Hard refresh browser:**
   - Mac: `Cmd + Shift + R`
   - Windows/Linux: `Ctrl + Shift + R`
   - Or open in incognito/private mode

5. **Check browser console:**
   - Open DevTools (F12)
   - Check Network tab for failed requests
   - Check Console for errors

## Expected Result

After restarting, you should see:
- ✅ Hero banner carousel
- ✅ Product images loading
- ✅ All sections rendering properly
- ✅ CSS styles applied
- ✅ No 404 errors in console

## If Still Blank

1. Check terminal for build errors
2. Verify port 3000 is not in use: `lsof -i :3000`
3. Try different port: `npm run dev -- -p 3001`
4. Check `.env` file exists and has correct values

