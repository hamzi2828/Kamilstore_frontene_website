"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ChevronRight, Share2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";

// Mock wishlist data
const initialWishlistItems = [
  {
    _id: "1",
    name: "Apple MacBook Pro 14-inch M3 Pro",
    slug: "macbook-pro-14-m3",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    sellingPrice: 1999.99,
    discountPrice: 1849.99,
    inStock: true,
    vendor: { name: "TechZone", slug: "techzone" },
    addedAt: "2024-01-15",
  },
  {
    _id: "2",
    name: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    sellingPrice: 399.99,
    discountPrice: 349.99,
    inStock: true,
    vendor: { name: "AudioMax", slug: "audiomax" },
    addedAt: "2024-01-10",
  },
  {
    _id: "3",
    name: "Nike Air Max 270 Running Shoes",
    slug: "nike-air-max-270",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    sellingPrice: 150.00,
    discountPrice: 119.99,
    inStock: false,
    vendor: { name: "SportsFit Pro", slug: "sportsfit" },
    addedAt: "2024-01-05",
  },
  {
    _id: "4",
    name: "Samsung Galaxy S24 Ultra 256GB",
    slug: "samsung-galaxy-s24-ultra",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    sellingPrice: 1299.99,
    inStock: true,
    vendor: { name: "TechZone", slug: "techzone" },
    addedAt: "2024-01-01",
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item._id !== id));
  };

  const addToCart = (id: string) => {
    console.log("Adding to cart:", id);
    // Add to cart logic
  };

  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock);
    console.log("Adding all in-stock items to cart:", inStockItems);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="site-container py-16">
          <div className="max-w-md mx-auto text-center">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Your wishlist is empty
            </h1>
            <p className="text-gray-500 mb-8">
              Save items you love to your wishlist and they&apos;ll appear here.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="site-container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/account" className="hover:text-orange-500">Account</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Wishlist</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <div>
              <h1 className="text-3xl font-bold">My Wishlist</h1>
              <p className="text-gray-500">{wishlistItems.length} items saved</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Share2 className="w-4 h-4" />
              Share Wishlist
            </button>
            <button
              onClick={addAllToCart}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              <ShoppingCart className="w-4 h-4" />
              Add All to Cart
            </button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-100">
                <Link href={`/product/${item.slug}`}>
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
                {item.discountPrice && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    -
                    {Math.round(
                      ((item.sellingPrice - item.discountPrice) / item.sellingPrice) * 100
                    )}
                    %
                  </span>
                )}
                <button
                  onClick={() => removeItem(item._id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <Link
                  href={`/vendor/${item.vendor.slug}`}
                  className="text-xs text-orange-500 hover:underline"
                >
                  {item.vendor.name}
                </Link>
                <Link href={`/product/${item.slug}`}>
                  <h3 className="font-medium text-gray-800 mt-1 line-clamp-2 hover:text-orange-500 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-orange-500">
                    {formatPrice(item.discountPrice || item.sellingPrice)}
                  </span>
                  {item.discountPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(item.sellingPrice)}
                    </span>
                  )}
                </div>

                {/* Added Date */}
                <p className="text-xs text-gray-400 mt-2">
                  Added on {new Date(item.addedAt).toLocaleDateString()}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(item._id)}
                  disabled={!item.inStock}
                  className={`w-full mt-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                    item.inStock
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="text-orange-500 hover:underline font-medium"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
