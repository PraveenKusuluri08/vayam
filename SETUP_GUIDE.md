# Vayam - Database & Authentication Setup Guide

This guide will help you set up PostgreSQL database with Prisma and NextAuth.js authentication for the Vayam website.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud-hosted)
- npm or yarn package manager

## Step 1: Install Dependencies

All dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Step 2: Set Up PostgreSQL Database

### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:
```bash
createdb vayam
```

### Option B: Cloud PostgreSQL (Recommended for Production)

Use services like:
- [Supabase](https://supabase.com) (Free tier available)
- [Neon](https://neon.tech) (Free tier available)
- [Railway](https://railway.app)
- [Vercel Postgres](https://vercel.com/storage/postgres)

## Step 3: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update `.env` with your database URL and NextAuth secret:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vayam?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Node Environment
NODE_ENV="development"
```

### Generate NextAuth Secret

Generate a secure secret key:
```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in your `.env` file.

## Step 4: Set Up Database Schema

1. Generate Prisma Client:
```bash
npm run db:generate
```

2. Push the schema to your database:
```bash
npm run db:push
```

Or create a migration:
```bash
npm run db:migrate
```

## Step 5: Seed the Database

Seed the database with initial products and admin user:

```bash
npm run db:seed
```

This will:
- Create all products from `data/products.ts`
- Create a default admin user:
  - Email: `admin@vayam.com`
  - Password: `admin123`
  - Role: `ADMIN`

**⚠️ Important:** Change the admin password after first login!

## Step 6: Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Step 7: Test Authentication

1. **Sign Up**: Visit `/auth/signup` to create a new account
2. **Sign In**: Visit `/auth/signin` to sign in with your credentials
3. **Admin Access**: Sign in with `admin@vayam.com` / `admin123`

## Database Schema Overview

### Models

- **User**: User accounts with authentication
- **Account**: OAuth provider accounts (for future social login)
- **Session**: User sessions
- **Product**: Product catalog
- **Order**: Customer orders
- **OrderItem**: Items in each order
- **Cart**: Shopping carts
- **CartItem**: Items in carts

### User Roles

- `USER`: Regular customer
- `ADMIN`: Administrator with full access

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Authentication Features

✅ Email/Password authentication
✅ Session management with JWT
✅ Protected routes (ready to implement)
✅ User roles (USER, ADMIN)
✅ Password hashing with bcrypt
✅ Sign up / Sign in pages
✅ User menu in navigation

## Next Steps

1. **Update Admin Password**: Change the default admin password
2. **Configure Email**: Set up email service for password reset (optional)
3. **Add OAuth Providers**: Configure Google, GitHub, etc. (optional)
4. **Implement Protected Routes**: Add middleware for admin pages
5. **Add Cart Functionality**: Connect cart to database
6. **Order Management**: Build order processing system

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is correct in `.env`
- Ensure PostgreSQL is running
- Check database credentials

### Prisma Client Errors

```bash
npm run db:generate
```

### Migration Issues

```bash
npm run db:push
```

### Authentication Not Working

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

## Production Deployment

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://yourdomain.com"
NODE_ENV="production"
```

### Database Migrations

Before deploying, run migrations:
```bash
npm run db:migrate
```

### Seed Production Database

```bash
npm run db:seed
```

## Support

For issues or questions:
- Check Prisma documentation: https://www.prisma.io/docs
- Check NextAuth.js documentation: https://next-auth.js.org
- Review the codebase documentation in `/docs`

---

**Note**: This setup guide assumes you have basic knowledge of PostgreSQL and Next.js. For detailed information, refer to the official documentation of each technology.

