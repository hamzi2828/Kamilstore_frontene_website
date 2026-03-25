import Link from "next/link";
import { Star, ShieldCheck, Package, MessageSquare } from "lucide-react";
import VendorAvatar from "@/components/ui/VendorAvatar";

interface VendorCardProps {
  vendor: {
    _id: string;
    name: string;
    slug: string;
    logo: string;
    description: string;
    rating: number;
    reviewCount: number;
    productCount: number;
    isVerified: boolean;
    badge?: string;
  };
  rank?: number;
}

const badgeColors: Record<string, string> = {
  "Top Rated": "bg-amber-50 text-amber-600 border-amber-200",
  "Best Seller": "bg-emerald-50 text-emerald-600 border-emerald-200",
  Featured: "bg-violet-50 text-violet-600 border-violet-200",
};

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return n.toString();
}

export default function VendorCard({ vendor, rank }: VendorCardProps) {
  return (
    <Link href={`/vendor/${vendor.slug}`} className="block group">
      <div className="relative bg-[#fafafa] rounded-xl p-4 hover:shadow-md border border-transparent hover:border-gray-100 transition-all duration-200 h-full">
        {/* Rank badge */}
        {rank && rank <= 3 && (
          <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shadow-sm z-10">
            {rank}
          </div>
        )}

        {/* Header: avatar + info */}
        <div className="flex items-center gap-3 mb-3">
          <VendorAvatar
            src={vendor.logo}
            name={vendor.name}
            size="md"
            className="border border-gray-200 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-[#333] text-sm truncate group-hover:text-orange-500 transition-colors">
                {vendor.name}
              </h3>
              {vendor.isVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              )}
            </div>
            {/* Rating */}
            <div className="flex items-center gap-1 mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3 h-3 ${
                      j < Math.floor(vendor.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#333]">{vendor.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#888] line-clamp-2 leading-relaxed mb-3">
          {vendor.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-[#999]">
          <span className="flex items-center gap-1">
            <Package className="w-3 h-3" />
            {formatCount(vendor.productCount)} products
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            {formatCount(vendor.reviewCount)} reviews
          </span>
        </div>

        {/* Badge */}
        {vendor.badge && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span
              className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                badgeColors[vendor.badge] ?? "bg-gray-50 text-gray-600 border-gray-200"
              }`}
            >
              {vendor.badge}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
