# Authentication Error Fix

## Changes Made

1. **Removed PrismaAdapter** - Since we're using JWT sessions, we don't need PrismaAdapter
2. **Added Error Handling** - Better error handling in the authorize function
3. **Created Error Page** - Custom error page at `/auth/error` to show helpful messages

## Common Auth Errors & Solutions

### Error: "Configuration"
**Cause:** Missing or incorrect environment variables

**Fix:**
```bash
# Make sure these are in your .env file:
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### Error: "AccessDenied"
**Cause:** User doesn't have permission or credentials are wrong

**Fix:**
- Check if user exists in database
- Verify password is correct
- Make sure user has a password set

### Error: Database Connection Issues
**Cause:** Prisma can't connect to database

**Fix:**
1. Verify DATABASE_URL is correct in .env
2. Test connection: `npm run db:push`
3. Check if database server is running

## Testing Authentication

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Test Sign Up:**
   - Go to `http://localhost:3000/auth/signup`
   - Create a new account
   - Should redirect to sign in page

3. **Test Sign In:**
   - Go to `http://localhost:3000/auth/signin`
   - Use admin account:
     - Email: `admin@vayam.com`
     - Password: `admin123`
   - Should redirect to homepage

4. **Check Error Page:**
   - If you see `/auth/error`, check the error message
   - The error page will show what went wrong

## Debugging Steps

1. **Check terminal output** for any error messages
2. **Check browser console** (F12) for client-side errors
3. **Check Network tab** to see API request/response
4. **Verify environment variables** are loaded:
   ```bash
   cat .env | grep NEXTAUTH
   ```

## If Still Having Issues

1. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Regenerate Prisma Client:**
   ```bash
   npm run db:generate
   ```

3. **Check database connection:**
   ```bash
   npm run db:push
   ```

4. **Verify admin user exists:**
   ```bash
   npm run db:seed
   ```

