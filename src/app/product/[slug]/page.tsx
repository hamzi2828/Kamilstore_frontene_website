"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star, Heart, ShoppingCart, Truck, Shield,
  RotateCcw, Share2, Minus, Plus, CheckCircle,
  Flame, ChevronRight, Store, ThumbsUp,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import ProductImage from "@/components/ui/ProductImage";
import VendorAvatar from "@/components/ui/VendorAvatar";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/ProductPage.css";

const product = {
  _id: "1",
  name: "Apple MacBook Pro 14-inch M3 Pro Chip - Space Gray",
  slug: "macbook-pro-14-m3",
  images: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
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
    _id: "v1", name: "TechZone Electronics", slug: "techzone",
    logo: "/vendors/techzone.jpg", rating: 4.8, reviewCount: 1250, isVerified: true, productCount: 342,
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
  { _id: "r1", name: "Apple Magic Keyboard for Mac", slug: "apple-magic-keyboard", images: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop"], sellingPrice: 99.99, rating: 4.7, reviewCount: 189, vendor: { name: "TechZone", slug: "techzone" } },
  { _id: "r2", name: "Wireless Mouse Ergonomic", slug: "wireless-mouse", images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop"], sellingPrice: 79.99, rating: 4.5, reviewCount: 234, vendor: { name: "TechZone", slug: "techzone" } },
  { _id: "r3", name: "USB-C Hub Adapter 7-in-1", slug: "usb-c-hub-adapter", images: ["https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop"], sellingPrice: 49.99, discountPrice: 39.99, rating: 4.6, reviewCount: 567, vendor: { name: "TechZone", slug: "techzone" } },
  { _id: "r4", name: "Laptop Sleeve Case Premium", slug: "laptop-sleeve-case", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"], sellingPrice: 34.99, rating: 4.4, reviewCount: 345, vendor: { name: "FashionPlus", slug: "fashionplus" } },
];

const reviews = [
  { _id: "rev1", user: { name: "John D.", avatar: "/avatars/user1.jpg" }, rating: 5, comment: "Absolutely love this MacBook! The M3 Pro chip is blazing fast and the battery life is incredible. Perfect for my work as a software developer.", date: "2024-01-15", verified: true, helpful: 24 },
  { _id: "rev2", user: { name: "Sarah M.", avatar: "/avatars/user2.jpg" }, rating: 4, comment: "Great laptop overall. Display is stunning and performance is top-notch. Only wish it had more ports.", date: "2024-01-10", verified: true, helpful: 12 },
  { _id: "rev3", user: { name: "Mike R.", avatar: "/avatars/user3.jpg" }, rating: 5, comment: "Best laptop I've ever owned. The build quality is exceptional and it handles everything I throw at it.", date: "2024-01-05", verified: false, helpful: 8 },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    Storage: "512GB", Color: "Space Gray",
  });
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews">("description");
  const [wishlisted, setWishlisted] = useState(false);

  const discount = product.discountPrice
    ? Math.round(((product.sellingPrice - product.discountPrice) / product.sellingPrice) * 100)
    : 0;

  return (
    <>
      <Breadcrumb
        items={[
          { label: product.category.name, href: `/category/${product.category.slug}` },
          { label: product.name },
        ]}
      />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Product Section ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#f1f5f9]">
            <div className="p-5 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Gallery */}
                <div>
                  <div className="ks-pd-main-img">
                    <ProductImage
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="object-contain p-4"
                    />
                    {discount > 0 && (
                      <span className="ks-pd-discount-badge">-{discount}%</span>
                    )}
                    <button
                      onClick={() => setWishlisted(!wishlisted)}
                      className={`ks-pd-wishlist-btn ${wishlisted ? "ks-pd-wishlist-active" : ""}`}
                    >
                      <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
                    </button>
                  </div>
                  <div className="ks-pd-thumbs">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`ks-pd-thumb ${selectedImage === index ? "ks-pd-thumb-active" : ""}`}
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
                  <Link href={`/vendor/${product.vendor.slug}`} className="ks-pd-vendor-link">
                    <div className="ks-pd-vendor-avatar">
                      {product.vendor.name.charAt(0)}
                    </div>
                    <span>{product.vendor.name}</span>
                    {product.vendor.isVerified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                  </Link>

                  <h1 className="ks-pd-title">{product.name}</h1>

                  {/* Rating */}
                  <div className="ks-pd-rating-row">
                    <div className="ks-pd-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-[18px] h-[18px] ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
                      ))}
                      <span className="ks-pd-rating-num">{product.rating}</span>
                    </div>
                    <span className="ks-pd-review-count">({product.reviewCount} reviews)</span>
                    <span className="ks-pd-stock-badge">
                      <span className="ks-pd-stock-dot" /> In Stock
                    </span>
                  </div>

                  {/* Price */}
                  <div className="ks-pd-price-row">
                    <span className="ks-pd-price">{formatPrice(product.discountPrice || product.sellingPrice)}</span>
                    {product.discountPrice && (
                      <>
                        <span className="ks-pd-price-old">{formatPrice(product.sellingPrice)}</span>
                        <span className="ks-pd-save-badge">Save {discount}%</span>
                      </>
                    )}
                  </div>

                  {/* Variants */}
                  {product.variants.map((variant) => (
                    <div key={variant.label} className="ks-pd-variant-group">
                      <label className="ks-pd-variant-label">
                        {variant.label}: <span className="ks-pd-variant-selected">{selectedVariants[variant.label]}</span>
                      </label>
                      <div className="ks-pd-variant-options">
                        {variant.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => setSelectedVariants((p) => ({ ...p, [variant.label]: option }))}
                            className={`ks-pd-variant-btn ${selectedVariants[variant.label] === option ? "ks-pd-variant-btn-active" : ""}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Quantity */}
                  <div className="ks-pd-variant-group">
                    <label className="ks-pd-variant-label">Quantity</label>
                    <div className="ks-pd-qty">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="ks-pd-qty-btn">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="ks-pd-qty-value">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="ks-pd-qty-btn">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ks-pd-actions">
                    <button className="ks-pd-add-cart-btn">
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </button>
                    <button className="ks-pd-buy-btn">Buy Now</button>
                    <button className="ks-pd-icon-btn">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Features */}
                  <div className="ks-pd-features">
                    {[
                      { icon: Truck, title: "Free Shipping", desc: "On orders over $50", color: "#3B82F6" },
                      { icon: RotateCcw, title: "Easy Returns", desc: "30 day return policy", color: "#10B981" },
                      { icon: Shield, title: "Secure Payment", desc: "100% protected", color: "#EA6B0E" },
                      { icon: CheckCircle, title: "Genuine Product", desc: "Verified by seller", color: "#8B5CF6" },
                    ].map(({ icon: Icon, title, desc, color }) => (
                      <div key={title} className="ks-pd-feature">
                        <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />
                        <div>
                          <p className="ks-pd-feature-title">{title}</p>
                          <p className="ks-pd-feature-desc">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Vendor card */}
                  <Link href={`/vendor/${product.vendor.slug}`} className="ks-pd-vendor-card group">
                    <div className="ks-pd-vendor-card-avatar">
                      {product.vendor.name.charAt(0)}
                    </div>
                    <div className="ks-pd-vendor-card-info">
                      <div className="ks-pd-vendor-card-name-row">
                        <span className="ks-pd-vendor-card-name">{product.vendor.name}</span>
                        {product.vendor.isVerified && (
                          <span className="ks-pd-vendor-verified-pill">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                      <div className="ks-pd-vendor-card-stats">
                        <span>{product.vendor.rating} rating</span>
                        <span className="ks-pd-vendor-card-dot" />
                        <span>{product.vendor.productCount} products</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#ccc] group-hover:text-orange-500 transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tabs Section ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#f1f5f9]">
            <div className="border-b border-[#f1f5f9] px-5 sm:px-6">
              <div className="flex gap-1">
                {(["description", "specifications", "reviews"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`ks-pd-tab ${activeTab === tab ? "ks-pd-tab-active" : ""}`}
                  >
                    {tab === "reviews" ? `Reviews (${product.reviewCount})` : tab}
                    {activeTab === tab && <span className="ks-pd-tab-bar" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {activeTab === "description" && (
                <div className="max-w-3xl">
                  <p className="whitespace-pre-line text-[14.5px] text-[#555] leading-[1.75]">{product.description}</p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="max-w-2xl">
                  {product.specifications.map((spec, i) => (
                    <div key={spec.label} className={`ks-pd-spec-row ${i % 2 === 0 ? "ks-pd-spec-row-alt" : ""}`}>
                      <span className="ks-pd-spec-label">{spec.label}</span>
                      <span className="ks-pd-spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className="ks-pd-rating-summary">
                    <div className="ks-pd-rating-big">
                      <span className="ks-pd-rating-big-num">{product.rating}</span>
                      <div className="flex gap-0.5 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
                        ))}
                      </div>
                      <span className="ks-pd-rating-big-count">{product.reviewCount} reviews</span>
                    </div>
                  </div>

                  <div className="ks-pd-reviews-list">
                    {reviews.map((review) => (
                      <div key={review._id} className="ks-pd-review">
                        <VendorAvatar src={review.user.avatar} name={review.user.name} size="sm" className="!rounded-full flex-shrink-0" />
                        <div className="flex-1">
                          <div className="ks-pd-review-header">
                            <span className="ks-pd-review-name">{review.user.name}</span>
                            {review.verified && (
                              <span className="ks-pd-review-verified">Verified</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2.5 mt-1">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
                              ))}
                            </div>
                            <span className="text-[12px] text-[#bbb] font-medium">
                              {new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                          </div>
                          <p className="ks-pd-review-text">{review.comment}</p>
                          <button className="ks-pd-review-helpful">
                            <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="ks-pd-write-review-btn">Write a Review</button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Related Products ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#f1f5f9]">
            <div className="flex items-center gap-2.5 mb-5">
              <Flame className="w-[18px] h-[18px] text-orange-400" />
              <h2 className="text-lg font-extrabold text-[#111]">You May Also Like</h2>
            </div>
            <div className="ks-pd-related-grid">
              {relatedProducts.map((p) => (
                <div key={p._id} className="ks-pd-related-card">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
