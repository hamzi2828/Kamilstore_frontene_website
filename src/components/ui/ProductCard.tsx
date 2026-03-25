import Link from "next/link";
import { Star } from "lucide-react";
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
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
        {/* Image */}
        <div className="relative aspect-square bg-[#f8f8f8] overflow-hidden">
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badge */}
          {discount > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3.5">
          {/* Title */}
          <h3 className="text-sm font-medium text-[#333] line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>

          {/* Vendor */}
          {product.vendor && (
            <p className="text-xs text-[#999] mt-1">
              by {product.vendor.name}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
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
            <span className="text-[11px] text-[#999]">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="mt-2.5">
            {product.discountPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-[#333]">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-xs text-[#999] line-through">
                  {formatPrice(product.sellingPrice)}
                </span>
              </div>
            ) : (
              <span className="text-base font-bold text-[#333]">
                {formatPrice(product.sellingPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
