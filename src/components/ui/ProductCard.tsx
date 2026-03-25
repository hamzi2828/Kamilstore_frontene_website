"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    images: string[];
    sellingPrice: number;
    discountPrice?: number;
    rating: number;
    reviewCount: number;
    vendor?: {
      name: string;
      slug: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.discountPrice
    ? Math.round(
        ((product.sellingPrice - product.discountPrice) / product.sellingPrice) *
          100
      )
    : 0;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`}>
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg z-10">
            -{discount}%
          </span>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-10">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:bg-orange-500 hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:bg-orange-500 hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add to Cart */}
        <button className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-medium text-sm z-10">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Vendor */}
        {product.vendor && (
          <Link
            href={`/vendor/${product.vendor.slug}`}
            className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            {product.vendor.name}
          </Link>
        )}

        {/* Product Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-gray-800 mt-1 line-clamp-2 hover:text-orange-500 transition-colors text-sm leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-200 fill-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.discountPrice || product.sellingPrice)}
          </span>
          {product.discountPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.sellingPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
