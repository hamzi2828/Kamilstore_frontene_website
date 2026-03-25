import Link from "next/link";
import { Star, CheckCircle, Package, ArrowRight } from "lucide-react";
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
  };
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Link href={`/vendor/${vendor.slug}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
        {/* Header accent */}
        <div className="h-20 bg-gradient-to-br from-orange-50 to-amber-50 relative">
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #f97316 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
        </div>

        <div className="px-5 pb-5 -mt-8 relative z-10">
          {/* Logo */}
          <VendorAvatar
            src={vendor.logo}
            name={vendor.name}
            size="lg"
            className="border-2 border-white shadow-md"
          />

          {/* Info */}
          <div className="mt-3">
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-orange-500 transition-colors">
                {vendor.name}
              </h3>
              {vendor.isVerified && (
                <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500 flex-shrink-0" />
              )}
            </div>

            {/* Rating & Products */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-gray-700">
                  {vendor.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400">
                  ({vendor.reviewCount})
                </span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Package className="w-3.5 h-3.5" />
                <span>{vendor.productCount}</span>
              </div>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>

          <div className="mt-4 w-full py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:border-orange-500 hover:text-orange-500 transition-colors font-medium text-sm flex items-center justify-center gap-1.5 group-hover:border-orange-500 group-hover:text-orange-500">
            Visit Store
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
