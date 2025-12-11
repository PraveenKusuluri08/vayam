"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
}

export default function ProductImage({
  src,
  alt,
  className = "",
  fill = false,
  sizes,
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // If image failed to load, show placeholder
  if (imageError || !src || src === "") {
    return (
      <div
        className={`relative flex items-center justify-center bg-gradient-to-br from-gold-100 via-silver-100 to-gold-100 ${className}`}
        style={fill ? { position: "absolute", inset: 0 } : {}}
      >
        <div className="text-center p-8">
          <Sparkles className="w-16 h-16 text-gold-400 mx-auto mb-4" />
          <p className="text-gold-600 font-semibold text-sm">{alt}</p>
          <p className="text-gray-500 text-xs mt-2">Image coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {imageLoading && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold-50 to-silver-50 ${className}`}
        >
          <div className="animate-pulse">
            <Sparkles className="w-12 h-12 text-gold-300" />
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`${className} ${imageLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        sizes={sizes}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
        onLoad={() => setImageLoading(false)}
        unoptimized={true}
      />
    </>
  );
}

