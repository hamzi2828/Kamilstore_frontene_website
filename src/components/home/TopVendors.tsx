import Link from "next/link";
import VendorCard from "@/components/ui/VendorCard";
import { ArrowRight } from "lucide-react";

const vendors = [
  {
    _id: "1",
    name: "TechZone Electronics",
    slug: "techzone",
    logo: "/vendors/techzone.jpg",
    description:
      "Your trusted source for premium electronics and gadgets. Quality products at competitive prices.",
    rating: 4.8,
    reviewCount: 1250,
    productCount: 342,
    isVerified: true,
  },
  {
    _id: "2",
    name: "FashionPlus",
    slug: "fashionplus",
    logo: "/vendors/fashionplus.jpg",
    description:
      "Trendy fashion for everyone. Stay stylish with our latest collections from top brands.",
    rating: 4.6,
    reviewCount: 890,
    productCount: 567,
    isVerified: true,
  },
  {
    _id: "3",
    name: "HomeStyle Decor",
    slug: "homestyle",
    logo: "/vendors/homestyle.jpg",
    description:
      "Transform your living space with our beautiful home decor and furniture collection.",
    rating: 4.7,
    reviewCount: 456,
    productCount: 234,
    isVerified: true,
  },
  {
    _id: "4",
    name: "SportsFit Pro",
    slug: "sportsfit",
    logo: "/vendors/sportsfit.jpg",
    description:
      "Premium sports equipment and fitness gear for athletes and fitness enthusiasts.",
    rating: 4.5,
    reviewCount: 678,
    productCount: 189,
    isVerified: false,
  },
];

export default function TopVendors() {
  return (
    <section className="py-14 bg-gray-50/80">
      <div className="site-container">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Top Vendors
            </h2>
            <p className="text-gray-500 mt-1.5">
              Shop from our trusted sellers
            </p>
          </div>
          <Link
            href="/vendors"
            className="hidden sm:inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            View All Vendors
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vendors.map((vendor) => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-1.5 text-orange-500 font-medium"
          >
            View All Vendors <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
