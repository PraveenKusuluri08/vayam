export interface Product {
  id: string;
  slug:string;
  name: string;
  category: "gold" | "diamond" | "silver" | "custom";
  subcategory: string;
  price: number;
  startingPrice?: number; // For products with "starts at" pricing
  description: string;
  features: string[];
  specifications?: ProductSpecification;
  images: string[];
  inStock: boolean;
  tags: string[];
  weight?: string;
  material?: string;
  purity?: string;
}

export interface ProductSpecification {
  dimensions?: string;
  weight?: string;
  material?: string;
  purity?: string;
  hallmark?: boolean;
  finish?: string;
  careInstructions?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}



