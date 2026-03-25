"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Minus,
  Plus,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import ProductImage from "@/components/ui/ProductImage";
import VendorAvatar from "@/components/ui/VendorAvatar";

// Mock product data
const product = {
  _id: "1",
  name: "Apple MacBook Pro 14-inch M3 Pro Chip - Space Gray",
  slug: "macbook-pro-14-m3",
  images: [
    "/products/macbook-1.jpg",
    "/products/macbook-2.jpg",
    "/products/macbook-3.jpg",
    "/products/macbook-4.jpg",
  ],
  description: `The most advanced MacBook Pro ever. The M3 Pro chip delivers exceptional performance for demanding workflows like editing photos in Lightroom, working with massive data sets in Excel, compiling in Xcode, or adding effects in Logic Pro.

  Features:
  • 14.2-inch Liquid Retina XDR display
  • M3 Pro chip with 11-core CPU and 14-core GPU
  • 18GB unified memory
  • 512GB SSD storage
  • Up to 17 hours of battery life
  • Three Thunderbolt 4 ports, HDMI port, SDXC card slot, MagSafe 3 port
  • Magic Keyboard with Touch ID`,
  category: { name: "Electronics", slug: "electronics" },
  vendor: {
    _id: "v1",
    name: "TechZone Electronics",
    slug: "techzone",
    logo: "/vendors/techzone.jpg",
    rating: 4.8,
    reviewCount: 1250,
    isVerified: true,
  },
  sellingPrice: 1999.99,
  discountPrice: 1849.99,
  quantity: 50,
  rating: 4.9,
  reviewCount: 234,
  specifications: [
    { label: "Processor", value: "Apple M3 Pro chip" },
    { label: "Memory", value: "18GB unified memory" },
    { label: "Storage", value: "512GB SSD" },
    { label: "Display", value: '14.2" Liquid Retina XDR' },
    { label: "Battery", value: "Up to 17 hours" },
    { label: "Weight", value: "1.6 kg" },
  ],
  variants: [
    { label: "Storage", options: ["512GB", "1TB", "2TB"] },
    { label: "Color", options: ["Space Gray", "Silver"] },
  ],
};

const relatedProducts = [
  {
    _id: "r1",
    name: "Apple Magic Keyboard",
    slug: "apple-magic-keyboard",
    images: ["/products/keyboard.jpg"],
    sellingPrice: 99.99,
    rating: 4.7,
    reviewCount: 189,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "r2",
    name: "Apple Magic Mouse",
    slug: "apple-magic-mouse",
    images: ["/products/mouse.jpg"],
    sellingPrice: 79.99,
    rating: 4.5,
    reviewCount: 234,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "r3",
    name: "USB-C Hub Adapter",
    slug: "usb-c-hub-adapter",
    images: ["/products/hub.jpg"],
    sellingPrice: 49.99,
    discountPrice: 39.99,
    rating: 4.6,
    reviewCount: 567,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "r4",
    name: "Laptop Sleeve Case",
    slug: "laptop-sleeve-case",
    images: ["/products/sleeve.jpg"],
    sellingPrice: 34.99,
    rating: 4.4,
    reviewCount: 345,
    vendor: { name: "FashionPlus", slug: "fashionplus" },
  },
];

const reviews = [
  {
    _id: "rev1",
    user: { name: "John D.", avatar: "/avatars/user1.jpg" },
    rating: 5,
    comment:
      "Absolutely love this MacBook! The M3 Pro chip is blazing fast and the battery life is incredible. Perfect for my work as a software developer.",
    date: "2024-01-15",
    verified: true,
  },
  {
    _id: "rev2",
    user: { name: "Sarah M.", avatar: "/avatars/user2.jpg" },
    rating: 4,
    comment:
      "Great laptop overall. Display is stunning and performance is top-notch. Only wish it had more ports.",
    date: "2024-01-10",
    verified: true,
  },
  {
    _id: "rev3",
    user: { name: "Mike R.", avatar: "/avatars/user3.jpg" },
    rating: 5,
    comment:
      "Best laptop I've ever owned. The build quality is exceptional and it handles everything I throw at it.",
    date: "2024-01-05",
    verified: false,
  },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({
    Storage: "512GB",
    Color: "Space Gray",
  });
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "reviews"
  >("description");

  const discount = product.discountPrice
    ? Math.round(
        ((product.sellingPrice - product.discountPrice) / product.sellingPrice) *
          100
      )
    : 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="site-container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/category/${product.category.slug}`}
            className="hover:text-orange-500"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                <ProductImage
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="object-contain"
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded">
                    -{discount}%
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-orange-500"
                        : "border-gray-200"
                    }`}
                  >
                    <ProductImage
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Vendor */}
              <Link
                href={`/vendor/${product.vendor.slug}`}
                className="inline-flex items-center gap-2 text-sm text-orange-500 hover:underline mb-2"
              >
                <span>{product.vendor.name}</span>
                {product.vendor.isVerified && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
              </Link>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-500">
                  ({product.reviewCount} reviews)
                </span>
                <span className="text-green-600 font-medium">In Stock</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-orange-500">
                  {formatPrice(product.discountPrice || product.sellingPrice)}
                </span>
                {product.discountPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.sellingPrice)}
                  </span>
                )}
              </div>

              {/* Variants */}
              {product.variants.map((variant) => (
                <div key={variant.label} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {variant.label}:{" "}
                    <span className="text-gray-900">
                      {selectedVariants[variant.label]}
                    </span>
                  </label>
                  <div className="flex gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option}
                        onClick={() =>
                          setSelectedVariants((prev) => ({
                            ...prev,
                            [variant.label]: option,
                          }))
                        }
                        className={`px-4 py-2 border rounded-lg ${
                          selectedVariants[variant.label] === option
                            ? "border-orange-500 bg-orange-50 text-orange-600"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="flex-1 border-2 border-orange-500 text-orange-500 py-3 px-6 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Buy Now
                </button>
                <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Truck className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-gray-500">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-gray-500">30 day return policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="font-medium">Secure Payment</p>
                    <p className="text-sm text-gray-500">100% protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="font-medium">Quality Guarantee</p>
                    <p className="text-sm text-gray-500">Verified products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`px-6 py-4 font-medium capitalize ${
                    activeTab === tab
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {tab === "reviews" && ` (${product.reviewCount})`}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-gray-600">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="max-w-2xl">
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec, index) => (
                      <tr
                        key={spec.label}
                        className={index % 2 === 0 ? "bg-gray-50" : ""}
                      >
                        <td className="py-3 px-4 font-medium text-gray-700">
                          {spec.label}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                {/* Rating Summary */}
                <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-200">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-900">
                      {product.rating}
                    </p>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-500 mt-1">
                      {product.reviewCount} reviews
                    </p>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review._id} className="border-b border-gray-100 pb-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <VendorAvatar
                            src={review.user.avatar}
                            name={review.user.name}
                            size="sm"
                            className="!rounded-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.user.name}</span>
                            {review.verified && (
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Write Review Button */}
                <button className="mt-6 px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
