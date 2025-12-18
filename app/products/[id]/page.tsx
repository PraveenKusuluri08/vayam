"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import {
  Check,
  Sparkles,
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeByProductId: removeFromWishlist, isInWishlist } = useWishlist();
  const { data: session } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisting, setWishlisting] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const inWishlist = product ? isInWishlist(product.id) : false;

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(0);
        }
      } else {
        console.error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async (category: string, excludeId: string) => {
    try {
      setLoadingSimilar(true);
      const response = await fetch(`/api/products?category=${category}`);
      if (response.ok) {
        const data = await response.json();
        // Filter out the current product and limit to 8 similar products
        const similar = data
          .filter((p: Product) => p.id !== excludeId)
          .slice(0, 8);
        setSimilarProducts(similar);
      }
    } catch (error) {
      console.error("Error fetching similar products:", error);
    } finally {
      setLoadingSimilar(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    if (product) {
      fetchSimilarProducts(product.category, product.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">
            Product Not Found
          </h2>
          <Link
            href="/#products"
            className="text-gold-600 hover:text-gold-700 underline"
          >
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Product Details - White Background for Readability */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl mb-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/#products"
            className="inline-flex items-center space-x-2 text-navy-700 hover:text-gold-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-gold-50 to-silver-50 rounded-2xl overflow-hidden shadow-xl">
              {product.images && product.images.length > 0 ? (
                <ProductImage
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Sparkles className="w-32 h-32 text-gold-300" />
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-gold-600 shadow-lg"
                        : "border-gray-200 hover:border-gold-400"
                    }`}
                  >
                    <ProductImage
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  product.category === "gold"
                    ? "bg-gold-500 text-white"
                    : product.category === "diamond"
                    ? "bg-purple-500 text-white"
                    : product.category === "silver"
                    ? "bg-silver-600 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {product.category.toUpperCase()}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline space-x-4">
              {product.startingPrice ? (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Starts at</p>
                  <p className="text-4xl font-bold text-gold-600">
                    {formatCurrency(product.startingPrice)}
                  </p>
                </div>
              ) : (
                <p className="text-4xl font-bold text-gold-600">
                  {formatCurrency(product.price)}
                </p>
              )}
              {product.inStock && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  ✓ In Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-navy-900 mb-3">
                  Features
                </h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-navy-900 mb-4">
                  Specifications
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specifications.material && (
                    <>
                      <dt className="text-gray-600 font-medium">Material</dt>
                      <dd className="text-navy-900">{product.specifications.material}</dd>
                    </>
                  )}
                  {product.specifications.purity && (
                    <>
                      <dt className="text-gray-600 font-medium">Purity</dt>
                      <dd className="text-navy-900">{product.specifications.purity}</dd>
                    </>
                  )}
                  {product.specifications.weight && (
                    <>
                      <dt className="text-gray-600 font-medium">Weight</dt>
                      <dd className="text-navy-900">{product.specifications.weight}</dd>
                    </>
                  )}
                  {product.specifications.dimensions && (
                    <>
                      <dt className="text-gray-600 font-medium">Dimensions</dt>
                      <dd className="text-navy-900">{product.specifications.dimensions}</dd>
                    </>
                  )}
                  {product.specifications.hallmark !== undefined && (
                    <>
                      <dt className="text-gray-600 font-medium">Hallmark</dt>
                      <dd className="text-navy-900">
                        {product.specifications.hallmark ? "Yes" : "No"}
                      </dd>
                    </>
                  )}
                  {product.specifications.finish && (
                    <>
                      <dt className="text-gray-600 font-medium">Finish</dt>
                      <dd className="text-navy-900">{product.specifications.finish}</dd>
                    </>
                  )}
                </dl>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={adding || !product.inStock}
                onClick={async () => {
                  if (!product.inStock) {
                    alert("This product is out of stock");
                    return;
                  }
                  setAdding(true);
                  try {
                    await addItem(product.id, 1);
                    setAdded(true);
                    setTimeout(() => setAdded(false), 2000);
                  } catch (error: any) {
                    alert(error.message || "Failed to add to cart");
                  } finally {
                    setAdding(false);
                  }
                }}
                className={`flex-1 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center space-x-2 ${
                  added
                    ? "bg-green-500 text-white"
                    : product.inStock
                    ? "gradient-gold text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {adding ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </>
                ) : added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={wishlisting}
                onClick={async () => {
                  if (!session?.user) {
                    if (confirm("Please sign in to add items to your wishlist. Would you like to sign in now?")) {
                      window.location.href = `/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
                    }
                    return;
                  }

                  if (!product) return;

                  setWishlisting(true);
                  try {
                    if (inWishlist) {
                      await removeFromWishlist(product.id);
                    } else {
                      await addToWishlist(product.id);
                      setWishlisted(true);
                      setTimeout(() => setWishlisted(false), 2000);
                    }
                  } catch (error: any) {
                    alert(error.message || "Failed to update wishlist");
                  } finally {
                    setWishlisting(false);
                  }
                }}
                className={`px-8 py-4 border-2 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2 ${
                  inWishlist || wishlisted
                    ? "bg-red-50 border-red-500 text-red-600 hover:bg-red-100"
                    : "bg-white border-navy-900 text-navy-900 hover:bg-gray-50"
                } disabled:opacity-50`}
              >
                {wishlisting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Updating...</span>
                  </>
                ) : (
                  <>
                    <Heart className={`w-5 h-5 ${inWishlist || wishlisted ? "fill-current" : ""}`} />
                    <span className="hidden sm:inline">
                      {inWishlist || wishlisted ? "In Wishlist" : "Add to Wishlist"}
                    </span>
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white border-2 border-navy-900 text-navy-900 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden sm:inline">Share</span>
              </motion.button>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-24 pt-16 border-t border-amber-100/30 relative overflow-hidden"
          >
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-20 right-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-20 w-80 h-80 bg-gold-300 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 bg-clip-text text-transparent mb-4">
                You May Also Like
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "150px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="h-1.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto rounded-full"
              />
              <p className="text-gray-600 text-lg mt-6">
                Discover more products in this collection
              </p>
            </motion.div>

            {loadingSimilar ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading similar products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {similarProducts.map((similarProduct, index) => (
                  <ProductCard
                    key={similarProduct.id}
                    product={similarProduct}
                    index={index}
                  />
                ))}
              </div>
            )}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
