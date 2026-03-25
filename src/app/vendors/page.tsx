"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import VendorCard from "@/components/ui/VendorCard";

// Mock vendors data
const allVendors = [
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
  {
    _id: "5",
    name: "AudioMax",
    slug: "audiomax",
    logo: "/vendors/audiomax.jpg",
    description:
      "High-quality audio equipment for music lovers. From headphones to speakers.",
    rating: 4.9,
    reviewCount: 543,
    productCount: 156,
    isVerified: true,
  },
  {
    _id: "6",
    name: "BeautyGlow",
    slug: "beautyglow",
    logo: "/vendors/beautyglow.jpg",
    description:
      "Premium skincare and beauty products from leading brands worldwide.",
    rating: 4.4,
    reviewCount: 321,
    productCount: 278,
    isVerified: true,
  },
  {
    _id: "7",
    name: "KidsWorld",
    slug: "kidsworld",
    logo: "/vendors/kidsworld.jpg",
    description:
      "Everything for kids! Toys, clothing, and educational materials for all ages.",
    rating: 4.6,
    reviewCount: 432,
    productCount: 445,
    isVerified: false,
  },
  {
    _id: "8",
    name: "GardenPro",
    slug: "gardenpro",
    logo: "/vendors/gardenpro.jpg",
    description:
      "Quality gardening tools, plants, and outdoor living essentials.",
    rating: 4.7,
    reviewCount: 234,
    productCount: 167,
    isVerified: true,
  },
];

const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Beauty",
  "Kids",
];

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("featured");

  const filteredVendors = allVendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="site-container text-center">
          <h1 className="text-4xl font-bold mb-4">Our Trusted Vendors</h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Discover amazing products from our verified sellers. Shop with
            confidence from hundreds of quality vendors.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
        </div>
      </div>

      <div className="site-container py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-orange-500"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="products">Most Products</option>
              <option value="reviews">Most Reviews</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredVendors.length} vendors
        </p>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))}
        </div>

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No vendors found matching your search.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white">
              Previous
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white">
              Next
            </button>
          </nav>
        </div>

        {/* Become a Vendor CTA */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Become a Vendor</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Join thousands of successful sellers on KamilStore. Start selling
            your products today and reach millions of customers.
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Start Selling
          </button>
        </div>
      </div>
    </div>
  );
}
