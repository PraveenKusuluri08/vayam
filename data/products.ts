import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "a7e3b788-4371-4b41-9c01-4cdb457c3a62",
    slug: "gold-diamond-letter-pendant",
    name: "Gold & Diamond Letter Pendant",
    category: "gold",
    subcategory: "Jewelry",
    price: 2000,
    startingPrice: 2000,
    description:
      "Versatile & meaningful reward that feels curated and personal. Works well for all genders and styles.",
    features: [
      "Customizable letter design",
      "Premium gold & diamond",
      "Suitable for all genders",
      "Elegant packaging included",
      "Starts at ₹2,000"
    ],
    specifications: {
      material: "Gold & Diamond",
      purity: "22K Gold",
      hallmark: true,
      finish: "Polished"
    },
    images: ["/images/products/image_1.jpeg"],
    inStock: true,
    tags: ["personalized", "versatile", "premium"]
  },
  {
    id: "13fd1829-9a03-4b9f-a8b4-4ca64f352b23",
    slug: "god-idols-silver",
    name: "Silver God Idols",
    category: "silver",
    subcategory: "Religious",
    description:
      "Spiritual blessings & protection. Auspicious gift cherished as family heirlooms.",
    price: 8000,
    startingPrice: 5000,
    features: [
      "Handcrafted design",
      "Spiritual significance",
      "Family heirloom quality",
      "925 Sterling Silver",
      "Hallmarked"
    ],
    specifications: {
      material: "Silver",
      purity: "925 Sterling Silver",
      hallmark: true,
      weight: "31.65gm",
      finish: "Premium polish"
    },
    images: ["/images/products/image_2.jpeg"],
    inStock: true,
    tags: ["spiritual", "auspicious", "traditional"],
    weight: "31.65gm",
    material: "925 Sterling Silver",
    purity: "925"
  },
  {
    id: "7be1496e-434a-42a7-acb1-4d36a297bab0",
    slug: "silver-celebration-glass",
    name: "Silver Celebration Glass",
    category: "silver",
    subcategory: "Dinnerware",
    description:
      "Blending celebration with modern elegance. Symbol of luxury & class. Unique & memorable gift.",
    price: 3500,
    features: [
      "Modern elegant design",
      "Luxury finish",
      "Unique craftsmanship",
      "Celebration ready",
      "925 Sterling Silver"
    ],
    specifications: {
      material: "Silver",
      purity: "925 Sterling Silver",
      hallmark: true,
      finish: "Polished"
    },
    images: ["/images/products/image_3.jpeg"],
    inStock: true,
    tags: ["elegant", "luxury", "celebration"],
    weight: "Variable",
    material: "925 Sterling Silver",
    purity: "925"
  },
  {
    id: "c5d83967-f4b8-494c-bb78-d52a086cf0eb",
    slug: "customized-logo-pendant",
    name: "Customized Logo Pendant",
    category: "custom",
    subcategory: "Corporate",
    description:
      "A powerful gesture that carries symbolic, emotional & professional significance. Signifies strong loyalty with a brand.",
    price: 4500,
    startingPrice: 4000,
    features: [
      "Custom logo engraving",
      "Brand loyalty symbol",
      "Professional significance",
      "Emotional connection",
      "Premium finish"
    ],
    specifications: {
      material: "Gold or Silver",
      purity: "Custom",
      hallmark: true,
      finish: "Custom"
    },
    images: ["/images/products/image_4.jpeg"],
    inStock: true,
    tags: ["custom", "corporate", "loyalty"]
  },
  {
    id: "f6d3e8a9-1281-4516-a528-d95bcce5c3cd",
    slug: "diamond-brooch",
    name: "Diamond Brooch",
    category: "diamond",
    subcategory: "Jewelry",
    description:
      "Represents honour, prestige & enduring commitment to the organization. Timeless value and brilliance. Reflects highest level of appreciation.",
    price: 15000,
    startingPrice: 12000,
    features: [
      "Prestigious design",
      "Timeless elegance",
      "Highest appreciation symbol",
      "Brilliant craftsmanship",
      "Premium diamonds"
    ],
    specifications: {
      material: "Diamond & Gold",
      purity: "22K Gold",
      hallmark: true,
      finish: "Premium polish"
    },
    images: ["/images/products/image_5.jpeg"],
    inStock: true,
    tags: ["prestigious", "diamond", "honour"]
  },
  {
    id: "6fe1af4d-e9a5-4e56-9166-31b8c4d38b02",
    slug: "cufflinks",
    name: "Premium Cufflinks",
    category: "gold",
    subcategory: "Accessories",
    description:
      "More than a fashionable accessory - conveys unspoken values that strengthen business bonds. Symbol of prestige & excellence.",
    price: 6000,
    features: [
      "Prestige symbol",
      "Business elegance",
      "Strengthens bonds",
      "Excellence crafted",
      "22K Gold"
    ],
    specifications: {
      material: "Gold",
      purity: "22K Gold",
      hallmark: true,
      finish: "Polished"
    },
    images: ["/images/products/image_6.jpeg"],
    inStock: true,
    tags: ["prestige", "business", "elegance"]
  },
  {
    id: "9d7b582d-a4da-4ac7-8e7b-831cdcc1dd02",
    slug: "silver-thali-set-12inch",
    name: "Silver Thali Set (12 inch)",
    category: "silver",
    subcategory: "Dinnerware",
    description:
      "Complete silver dining set featuring a traditional 12-inch thali with bowls and glass. Perfect for special occasions and celebrations. Hallmarked 925 Sterling Silver.",
    price: 25000,
    features: [
      "Complete dining set",
      "Traditional design",
      "Hallmarked silver",
      "Elegant presentation",
      "12 inch thali",
      "Includes bowls and glass"
    ],
    specifications: {
      material: "Silver",
      purity: "925 Sterling Silver",
      hallmark: true,
      weight: "1060gm",
      finish: "Polished",
      dimensions: "12 inch thali"
    },
    images: ["/images/products/image_7.jpeg"],
    inStock: true,
    tags: ["dining", "traditional", "complete-set"],
    weight: "1060gm",
    material: "925 Sterling Silver",
    purity: "925"
  },
  {
    id: "3f9c88b7-5b30-4cf2-ac7b-a26b43b8b7c3",
    slug: "silver-clutch-ornate",
    name: "Ornate Silver Clutch",
    category: "silver",
    subcategory: "Accessories",
    description:
      "Exquisitely designed silver clutch with intricate traditional patterns and peacock motifs. A statement piece that blends luxury with heritage. 925 Sterling Silver.",
    price: 12000,
    features: [
      "Intricate filigree work",
      "Traditional patterns",
      "Peacock motifs",
      "Luxury finish",
      "Statement piece",
      "925 Sterling Silver"
    ],
    specifications: {
      material: "Silver",
      purity: "925 Sterling Silver",
      hallmark: true,
      weight: "453gm",
      finish: "Oxidized & polished"
    },
    images: ["/images/products/image_8.jpeg"],
    inStock: true,
    tags: ["accessory", "ornate", "heritage"],
    weight: "453gm",
    material: "925 Sterling Silver",
    purity: "925"
  },
  {
    id: "88e9bc96-58ee-463b-87c0-d6edf34b79ce",
    slug: "silver-vase-water-bottle",
    name: "Silver Vase & Water Bottle Set",
    category: "silver",
    subcategory: "Dinnerware",
    description:
      "Elegant silver vase and water bottle set with intricate floral patterns. Perfect for home decoration and special occasions.",
    price: 15000,
    features: [
      "Matching set",
      "Intricate floral patterns",
      "Traditional design",
      "925 Sterling Silver",
      "Decorative & functional"
    ],
    specifications: {
      material: "Silver",
      purity: "925 Sterling Silver",
      hallmark: true,
      finish: "Polished"
    },
    images: ["/images/products/image_9.jpeg"],
    inStock: true,
    tags: ["decorative", "set", "traditional"],
    material: "925 Sterling Silver",
    purity: "925"
  },
  {
    id: "d28c9a23-40d4-4ef9-88ef-c590e63f2431",
    slug: "silver-tumblers-set",
    name: "Silver Tumblers Set",
    category: "silver",
    subcategory: "Dinnerware",
    description:
      "Set of elegant silver tumblers with decorative tray. Perfect for traditional dining and special occasions.",
    price: 18000,
    features: [
      "Complete set with tray",
      "Decorative patterns",
      "925 Sterling Silver",
      "Traditional design",
      "Includes decorative tray"
    ],
    specifications: {
      material: "Silver",
      purity: "925 Sterling Silver",
      hallmark: true,
      finish: "Polished"
    },
    images: ["/images/products/image_10.jpeg"],
    inStock: true,
    tags: ["dining", "set", "traditional"],
    material: "925 Sterling Silver",
    purity: "925"
  },
  {
    id: "b9fb7b82-1d66-4eb9-a7bd-78bbad86a6d2",
    slug: "silver-glass-set-amber",
    name: "Amber Glass Set with Bamboo Tray",
    category: "silver",
    subcategory: "Dinnerware",
    description:
      "Beautiful amber-tinted glass set with decorative silver bands and bamboo tray. Perfect for serving and special occasions.",
    price: 14000,
    features: [
      "6 piece glass set",
      "Bamboo tray included",
      "Decorative silver bands",
      "Amber-tinted glass",
      "Traditional design"
    ],
    specifications: {
      material: "Glass with Silver bands",
      weight: "124gm full set",
      finish: "Polished silver bands"
    },
    images: ["/images/products/image_11.jpeg"],
    inStock: true,
    tags: ["glass", "set", "bamboo-tray"],
    weight: "124gm full set"
  },
  {
    id: "55e3426e-986d-4c91-bd34-aac6e2134460",
    slug: "silver-jars-wooden-lids",
    name: "Silver Storage Jars with Wooden Lids",
    category: "silver",
    subcategory: "Dinnerware",
    description:
      "Set of decorative storage jars with glass bodies, wooden lids, and intricate silver metalwork. Features peacock motifs on the tray.",
    price: 22000,
    features: [
      "4 piece jar set",
      "Wooden lids with rose designs",
      "Circular tray included",
      "Peacock motifs",
      "925 Sterling Silver bands"
    ],
    specifications: {
      material: "Glass with Silver bands, Wooden lids",
      weight: "286gm full set",
      finish: "Polished silver"
    },
    images: ["/images/products/image_12.jpeg"],
    inStock: true,
    tags: ["storage", "jars", "decorative"],
    weight: "286gm full set"
  },
  {
    id: "8e34c71b-c2f2-47bc-9ba4-84e7b85967bf",
    slug: "silver-table-clock",
    name: "Antique Silver Table Clock",
    category: "silver",
    subcategory: "Decor",
    description:
      "Ornate antique-style table clock with rich two-tone metallic frame. Features intricate floral patterns and Roman numerals.",
    price: 28000,
    features: [
      "Antique design",
      "Roman numerals",
      "Intricate floral patterns",
      "Gold and silver accents",
      "Decorative piece"
    ],
    specifications: {
      material: "Silver & Gold plated",
      finish: "Antique finish",
      dimensions: "Variable"
    },
    images: ["/images/products/image_13.jpeg"],
    inStock: true,
    tags: ["decor", "antique", "clock"]
  }
];
