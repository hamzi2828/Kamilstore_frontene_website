import Link from "next/link";
import { Heart, ShoppingCart, Eye, Zap, Star } from "lucide-react";

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

const formatPrice = (price: number) => {
  return `$${(price / 100).toFixed(2)}`;
};

/** Temporary hardcoded product image until real assets are wired. */
const PRODUCT_IMAGE_PLACEHOLDER =
  "https://png.pngtree.com/png-vector/20241018/ourmid/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_14112954.png";

export default function PremiumProductCard({ product }: ProductCardProps) {
  const discount = product.discountPrice
    ? Math.round(
        ((product.sellingPrice - product.discountPrice) / product.sellingPrice) *
          100
      )
    : 0;

  const savingsCents =
    product.discountPrice != null
      ? product.sellingPrice - product.discountPrice
      : 0;

  return (
    <div className="group h-full min-h-0 bg-white rounded-xl transition-all duration-700 hover:shadow-2xl border border-stone-200 flex flex-col hover:-translate-y-1 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-stone-50 via-stone-50 to-stone-100 shrink-0">
        <Link href={`/product/${product.slug}`}>
          <img
            src={PRODUCT_IMAGE_PLACEHOLDER}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000 ease-out"
          />

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Discount badges — corners */}
        {discount > 0 && (
          <>
            <div className="absolute top-4 left-4 z-30 pointer-events-none">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black text-[10px] font-semibold tracking-widest uppercase shadow-lg transition-transform duration-300 group-hover:scale-105 pointer-events-auto text-red-500">
                <Zap className="w-3 h-3 shrink-0 text-red-500" />
                {discount}% OFF
              </div>
            </div>
            <div className="absolute top-4 right-4 z-30 pointer-events-none">
              <div className="px-3 py-1.5 rounded-full bg-black text-[10px] font-semibold normal-case tracking-normal tabular-nums shadow-lg transition-transform duration-300 group-hover:scale-105 pointer-events-auto text-emerald-400">
                Save {formatPrice(savingsCents)}
              </div>
            </div>
          </>
        )}

        {/* Premium Action Buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col items-center gap-2 z-20">
          <button
            type="button"
            className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-stone-900 transition-all duration-300 hover:bg-white hover:shadow-lg transform opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 hover:scale-110 active:scale-95"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5 transition-colors hover:text-rose-500" />
          </button>
          <button
            type="button"
            className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-stone-900 transition-all duration-300 hover:bg-white hover:shadow-lg transform opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 delay-75 hover:scale-110 active:scale-95"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-all duration-300 hover:bg-stone-800 hover:shadow-lg transform opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 delay-150 hover:scale-110 active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Premium Content Section */}
      <div className="flex flex-col flex-grow min-h-0 px-3 py-2 gap-3">
        {/* Vendor */}
        {product.vendor && (
          <Link
            href={`/vendor/${product.vendor.slug}`}
            className="text-[11px] text-stone-500 hover:text-black font-semibold uppercase tracking-wider transition-colors"
          >
            {product.vendor.name}
          </Link>
        )}

        {/* Product Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-stone-900 line-clamp-2 hover:text-stone-600 transition-colors text-[15px] leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5" role="img" aria-label={`${product.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => {
              const filled = i < Math.floor(product.rating);
              return (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                    filled
                      ? "fill-stone-900 text-stone-900"
                      : "fill-none text-stone-300"
                  }`}
                  strokeWidth={filled ? 0 : 1.5}
                  aria-hidden
                />
              );
            })}
          </div>
          <span className="text-[10px] text-stone-500 font-medium">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-auto pt-1 border-t border-stone-100">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-stone-900">
              {formatPrice(product.discountPrice || product.sellingPrice)}
            </span>
            {product.discountPrice && (
              <span className="text-xs text-stone-400 line-through font-medium">
                {formatPrice(product.sellingPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
