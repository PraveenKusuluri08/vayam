# Quick Start Guide

Get your Vayam website up and running in minutes!

## 🚀 Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your website!

### 3. Add Product Images

1. Create the directory structure:
```bash
mkdir -p public/images/products
```

2. Add your product images to `public/images/products/` with filenames matching your product data.

3. Update product image paths in `data/products.ts` to match your image filenames.

### 4. Customize Content

- **Brand Information**: Edit `lib/constants.ts`
- **Products**: Edit `data/products.ts`
- **Company Details**: Edit `components/Footer.tsx`
- **Styling**: Edit `tailwind.config.ts` for colors and theme

## 📁 Key Files to Customize

| File | Purpose |
|------|---------|
| `data/products.ts` | Add/edit products |
| `lib/constants.ts` | App configuration |
| `components/Footer.tsx` | Contact information |
| `app/page.tsx` | Homepage layout |
| `tailwind.config.ts` | Colors and styling |

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  gold: {
    // Your gold color palette
  },
  navy: {
    // Your navy color palette
  },
}
```

### Add New Products

Edit `data/products.ts`:

```typescript
{
  id: "product-id",
  name: "Product Name",
  category: "gold" | "diamond" | "silver" | "custom",
  price: 5000,
  description: "Product description",
  images: ["/images/products/product-image.jpg"],
  // ... other fields
}
```

## 🖼️ Image Requirements

- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 1200x1200px for product images
- **Location**: `public/images/products/`

## ✅ Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

Or use Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

Next.js can be deployed to:
- Vercel (Recommended)
- Netlify
- AWS
- DigitalOcean
- Your own server

## 🐛 Troubleshooting

### Images not loading?
- Check image paths in `data/products.ts`
- Ensure images are in `public/images/products/`
- Check file names match exactly (case-sensitive)

### Build errors?
- Run `npm install` again
- Delete `node_modules` and `.next` folder
- Check for TypeScript errors: `npm run lint`

### Styling issues?
- Clear browser cache
- Check Tailwind CSS is configured correctly
- Verify `globals.css` is imported in `layout.tsx`

## 📚 Next Steps

1. ✅ Add your product images
2. ✅ Customize content and branding
3. ✅ Test on mobile devices
4. ✅ Set up payment gateway (see `INTEGRATION_GUIDE.md`)
5. ✅ Set up delivery system (see `INTEGRATION_GUIDE.md`)

## 💡 Tips

- Use high-quality product images for best results
- Test responsive design on different devices
- Keep product descriptions clear and engaging
- Regularly update product information

## 📞 Need Help?

Refer to:
- [README.md](./README.md) - Full documentation
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Payment & Delivery setup

---

Happy building! ✨


