// App constants and configuration

export const APP_CONFIG = {
  name: "Vayam",
  tagline: "Let's shine together!",
  description: "Premium Rewards & Incentives in Gold, Diamond & Silver",
  contact: {
    address:
      "WeWork, 10th Floor, Nesco IT Park, Bldg. 4, North Wing, Western Exp Highway, Goregaon, Mumbai 400 603. INDIA.",
    email: "info@vayam.com",
    phone: "+91 XXX XXX XXXX",
  },
  startingPrice: 2000,
  currency: "INR",
  currencySymbol: "₹",
};

// Placeholder image URL - replace with actual product images
export const PLACEHOLDER_IMAGE = "/images/placeholder-product.jpg";

// Payment gateway configuration (ready for integration)
export const PAYMENT_CONFIG = {
  // Razorpay, Stripe, PayU, etc.
  gateway: null as string | null,
  apiKey: null as string | null,
  // Add other payment config as needed
};

// Delivery configuration (ready for integration)
export const DELIVERY_CONFIG = {
  enabled: false,
  providers: [] as string[],
  // Add delivery config as needed
};


