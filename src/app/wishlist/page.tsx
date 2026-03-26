"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart, ShoppingCart, Trash2, Share2, ArrowRight,
  ShoppingBag, Package,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/WishlistPage.css";

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
    sellingPrice: 150.0,
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
  const [items, setItems] = useState(initialWishlistItems);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const addToCart = (id: string) => {
    console.log("Adding to cart:", id);
  };

  const addAllToCart = () => {
    const inStock = items.filter((i) => i.inStock);
    console.log("Adding all in-stock items to cart:", inStock);
  };

  const inStockCount = items.filter((i) => i.inStock).length;

  // ── Empty state ──
  if (items.length === 0) {
    return (
      <>
        <Breadcrumb items={[{ label: "Wishlist" }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div className="ks-wl-empty-card">
              <div className="ks-wl-empty-icon-box">
                <Heart className="w-10 h-10 text-[#ddd]" />
              </div>
              <h1 className="ks-wl-empty-title">Your wishlist is empty</h1>
              <p className="ks-wl-empty-sub">
                Save items you love and they&apos;ll appear here for easy access.
              </p>
              <Link href="/products" className="ks-wl-empty-btn">
                <ShoppingBag className="w-[18px] h-[18px]" />
                Browse Products
              </Link>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Wishlist" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header Card ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-red-400 via-rose-500 to-pink-400" />

            <div className="p-5 sm:p-6">
              <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                <div className="flex items-center gap-3.5">
                  <div className="ks-wl-icon-box">
                    <Heart className="w-[22px] h-[22px] text-red-500 fill-red-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                      My Wishlist
                    </h1>
                    <p className="text-sm text-[#999] font-medium mt-1.5">
                      {items.length} items saved &middot; {inStockCount} in stock
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button className="ks-wl-share-btn">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button onClick={addAllToCart} className="ks-wl-addall-btn">
                    <ShoppingCart className="w-4 h-4" />
                    Add All to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Wishlist Items Grid ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl p-5 sm:p-6">
            <div className="ks-wl-grid">
              {items.map((item) => {
                const discount = item.discountPrice
                  ? Math.round(((item.sellingPrice - item.discountPrice) / item.sellingPrice) * 100)
                  : 0;

                return (
                  <div key={item._id} className="ks-wl-card group">
                    {/* Image */}
                    <div className="ks-wl-card-img-area">
                      <Link href={`/product/${item.slug}`}>
                        <ProductImage
                          src={item.image}
                          alt={item.name}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Out of stock overlay */}
                      {!item.inStock && (
                        <div className="ks-wl-oos-overlay">
                          <span className="ks-wl-oos-badge">Out of Stock</span>
                        </div>
                      )}

                      {/* Discount badge */}
                      {discount > 0 && (
                        <span className="ks-wl-discount-badge">-{discount}%</span>
                      )}

                      {/* Remove button */}
                      <button
                        onClick={() => removeItem(item._id)}
                        className="ks-wl-remove-btn"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="ks-wl-card-body">
                      <Link
                        href={`/vendor/${item.vendor.slug}`}
                        className="ks-wl-vendor"
                      >
                        {item.vendor.name}
                      </Link>

                      <Link href={`/product/${item.slug}`}>
                        <h3 className="ks-wl-card-name">{item.name}</h3>
                      </Link>

                      {/* Price */}
                      <div className="ks-wl-price-row">
                        <span className="ks-wl-price">
                          {formatPrice(item.discountPrice || item.sellingPrice)}
                        </span>
                        {item.discountPrice && (
                          <span className="ks-wl-price-old">
                            {formatPrice(item.sellingPrice)}
                          </span>
                        )}
                      </div>

                      <p className="ks-wl-added-date">
                        Added {new Date(item.addedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>

                      {/* Add to Cart */}
                      <button
                        onClick={() => addToCart(item._id)}
                        disabled={!item.inStock}
                        className={`ks-wl-cart-btn ${!item.inStock ? "ks-wl-cart-btn-disabled" : ""}`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue shopping */}
            <div className="ks-wl-continue">
              <Link href="/products" className="ks-wl-continue-link">
                <Package className="w-4 h-4" />
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
