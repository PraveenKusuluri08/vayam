# Vayam - Premium Rewards & Incentives

A modern, elegant Next.js web application for Vayam, showcasing premium rewards and incentives in Gold, Diamond & Silver.

## 🌟 Features

- **Modern Design**: Beautiful, responsive design with Indian aesthetic touches
- **Smooth Animations**: Powered by Framer Motion for delightful user interactions
- **Product Showcase**: Comprehensive product catalog with detailed specifications
- **Mobile Responsive**: Fully optimized for all device sizes
- **SEO Optimized**: Built with Next.js 14 for optimal performance
- **Type Safe**: Full TypeScript support
- **Ready for E-commerce**: Structured for easy integration of payment gateway and delivery system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd vayam
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```
vayam/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── products/          # Product pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   └── ...
├── data/                  # Static data
│   └── products.ts       # Product catalog
├── lib/                   # Utilities
│   └── utils.ts
├── types/                 # TypeScript types
│   └── product.ts
└── public/                # Static assets
    └── images/           # Product images (to be added)
```

## 🎨 Design System

### Colors
- **Primary Gold**: Used for accents and CTAs
- **Navy Blue**: Primary text and backgrounds
- **Silver**: Secondary accents
- **White/Cream**: Backgrounds and cards

### Typography
- **Playfair Display**: Serif font for headings and brand
- **Inter**: Sans-serif font for body text

## 📱 Pages & Sections

1. **Homepage**
   - Hero section with animated background
   - About Us section
   - Problem & Solution showcase
   - Product showcase grid
   - Why Vayam advantages
   - Call to Action section

2. **Product Detail Page**
   - Image gallery with thumbnails
   - Detailed specifications
   - Features list
   - Pricing information
   - Add to cart functionality (ready for integration)

## 🔧 Next Steps - Payment & Delivery Integration

The application is structured to easily integrate:

1. **Payment Gateway** (e.g., Razorpay, Stripe, PayU)
   - Add payment components in `components/Payment/`
   - Integrate with product checkout flow
   - Handle payment callbacks

2. **Delivery System**
   - Add delivery address form
   - Integrate shipping APIs
   - Order tracking functionality

3. **Cart & Checkout**
   - Cart state management (Context API or Redux)
   - Checkout page (`app/checkout/page.tsx`)
   - Order management

## 🛠️ Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

## 📝 Adding Products

Products are defined in `data/products.ts`. To add a new product:

1. Add product object to the `products` array
2. Follow the `Product` interface from `types/product.ts`
3. Add product images to `public/images/products/`

## 🌐 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

## 📞 Contact Information

- **Company**: Smart Jewels
- **Location**: WeWork, 10th Floor, Nesco IT Park, Bldg. 4, North Wing, Western Exp Highway, Goregaon, Mumbai 400 603. INDIA.

## 📄 License

© 2024 Vayam by Smart Jewels. All rights reserved.

---

**Let's shine together!** ✨






