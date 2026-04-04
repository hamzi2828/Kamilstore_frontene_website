import Link from "next/link";
import { Star, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
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
    <Link href={`/product/${product.slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden border border-[#f0f0f0] group-hover:border-orange-200 group-hover:shadow-[0_8px_30px_rgba(234,107,14,0.08)] transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-b from-[#fafafa] to-[#f3f3f3] overflow-hidden">
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            className="object-contain p-5 group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Discount Badge — top left */}
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10.5px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm tracking-wide">
              -{discount}%
            </span>
          )}

          {/* Save Badge — top right */}
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
              Save {formatPrice(product.sellingPrice - (product.discountPrice || product.sellingPrice))}
            </span>
          )}

          {/* Quick Add — appears on hover */}
          <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#111] text-white text-[12px] font-bold py-2.5 rounded-xl hover:bg-orange-500 transition-colors duration-200"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="px-4 pt-4 pb-4">
          {/* Vendor */}
          {product.vendor && (
            <span className="text-[10.5px] font-semibold text-orange-500 tracking-wider uppercase">
              {product.vendor.name}
            </span>
          )}

          {/* Title */}
          <h3 className="text-[13.5px] font-bold text-[#111] line-clamp-2 leading-[1.45] mt-1 group-hover:text-orange-500 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-[#555]">
              {product.rating}
            </span>
            <span className="text-[10.5px] text-[#bbb]">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#f0f0f0] my-3" />

          {/* Price */}
          <div>
            {product.discountPrice ? (
              <div className="flex items-baseline gap-2.5">
                <span className="text-[18px] font-extrabold text-[#111]">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-[12px] text-[#bbb] line-through">
                  {formatPrice(product.sellingPrice)}
                </span>
              </div>
            ) : (
              <span className="text-[18px] font-extrabold text-[#111]">
                {formatPrice(product.sellingPrice)}
              </span>
            )}
          </div>

          {/* Trust Signals */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-emerald-500" />
              <span className="text-[10px] font-semibold text-[#999]">Free Shipping</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span className="text-[10px] font-semibold text-[#999]">Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
