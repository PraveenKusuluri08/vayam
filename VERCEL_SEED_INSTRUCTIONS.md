# Seeding Database on Vercel

After deploying to Vercel, you need to seed the database with products. Here are two methods:

## Method 1: Using the Seed API Route (Recommended)

1. Set the `ADMIN_SEED_SECRET` environment variable in Vercel:
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add: `ADMIN_SEED_SECRET` = `your-secret-key-here`

2. Call the seed API endpoint:
   ```bash
   curl -X POST https://your-app.vercel.app/api/admin/seed \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your-secret-key-here" \
     -d '{"secret": "your-secret-key-here"}'
   ```

   Or use a tool like Postman/Insomnia:
   - URL: `https://your-app.vercel.app/api/admin/seed`
   - Method: POST
   - Headers:
     - `Authorization: Bearer your-secret-key-here`
   - Body (JSON):
     ```json
     {
       "secret": "your-secret-key-here"
     }
     ```

## Method 2: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Link your project:
   ```bash
   vercel link
   ```

3. Pull environment variables:
   ```bash
   vercel env pull .env.local
   ```

4. Run the seed script locally (it will use your Vercel database):
   ```bash
   npm run db:seed
   ```

## Method 3: Using Vercel Functions (One-time)

You can also create a one-time seed function that runs automatically on first deployment, but this is less secure.

## Verify Seeding

After seeding, check:
- Visit: `https://your-app.vercel.app/api/products`
- Should return an array of products
- Visit: `https://your-app.vercel.app/products`
- Should show products

## Default Admin User

After seeding, you can login with:
- Email: `admin@vayam.com`
- Password: `admin123`

**Important:** Change the admin password after first login!




