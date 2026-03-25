import Link from "next/link";
import VendorCard from "@/components/ui/VendorCard";
import { ChevronRight, Store } from "lucide-react";

const vendors = [
  { _id: "1", name: "TechZone Electronics", slug: "techzone", logo: "/vendors/techzone.jpg", description: "Your trusted source for premium electronics and gadgets. Quality products at competitive prices.", rating: 4.8, reviewCount: 1250, productCount: 342, isVerified: true, badge: "Top Rated" },
  { _id: "2", name: "FashionPlus", slug: "fashionplus", logo: "/vendors/fashionplus.jpg", description: "Trendy fashion for everyone. Stay stylish with our latest collections from top brands.", rating: 4.6, reviewCount: 890, productCount: 567, isVerified: true, badge: "Best Seller" },
  { _id: "3", name: "HomeStyle Decor", slug: "homestyle", logo: "/vendors/homestyle.jpg", description: "Transform your living space with our beautiful home decor and furniture collection.", rating: 4.7, reviewCount: 456, productCount: 234, isVerified: true, badge: "Featured" },
  { _id: "4", name: "SportsFit Pro", slug: "sportsfit", logo: "/vendors/sportsfit.jpg", description: "Premium sports equipment and fitness gear for athletes and fitness enthusiasts.", rating: 4.5, reviewCount: 678, productCount: 189, isVerified: false },
];

export default function TopVendors() {
  return (
    <section className="site-container">
      <div className="bg-white rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-orange-50 rounded-lg">
              <Store className="w-4.5 h-4.5 text-orange-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#333]">Top Vendors</h2>
              <p className="text-xs text-[#999] mt-0.5 hidden sm:block">Trusted sellers with the best ratings</p>
            </div>
          </div>
          <Link href="/vendors" className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-0.5 transition-colors">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {vendors.map((v, i) => (
            <VendorCard key={v._id} vendor={v} rank={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
