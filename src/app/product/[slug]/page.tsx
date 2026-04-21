"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star, Heart, ShoppingCart, Truck, Shield,
  RotateCcw, Share2, Minus, Plus, CheckCircle,
  Flame, ChevronRight,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import ProductImage from "@/components/ui/ProductImage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/ProductPage.css";
import { useProduct } from "../hooks/useProduct";
import { productApi } from "../service/productApi";
import type { ProductVariantPricing } from "../types";

const PLACEHOLDER =
  "https://png.pngtree.com/png-vector/20241018/ourmid/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_14112954.png";

const variantMatchesSelection = (
  variant: ProductVariantPricing,
  selected: Record<string, string>
): boolean => {
  return variant.combination.every(
    (c) => selected[c.attributeName] === c.value
  );
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data, isLoading, error } = useProduct(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews">("description");
  const [wishlisted, setWishlisted] = useState(false);

  const product = data?.product;
  const vendor = data?.vendor;
  const related = data?.related || [];

  const images = useMemo(() => {
    if (!product) return [PLACEHOLDER];
    const gallery = [
      product.thumbnailImage,
      ...(product.galleryImages || []),
      ...(product.images || []),
    ].filter(Boolean) as string[];
    const resolved = gallery
      .map((src) => productApi.getImageUrl(src))
      .filter((v): v is string => Boolean(v));
    return resolved.length ? resolved : [PLACEHOLDER];
  }, [product]);

  // Build variant groups from the combinations actually present in variantPricing
  const variantGroups = useMemo(() => {
    if (!product?.variantPricing?.length) return [] as Array<{ label: string; options: Array<{ value: string; valueName: string }> }>;
    const map = new Map<string, Map<string, string>>(); // attributeName -> (value -> valueName)
    for (const vp of product.variantPricing) {
      for (const c of vp.combination) {
        if (!map.has(c.attributeName)) map.set(c.attributeName, new Map());
        map.get(c.attributeName)!.set(c.value, c.valueName);
      }
    }
    return Array.from(map.entries()).map(([label, values]) => ({
      label,
      options: Array.from(values.entries()).map(([value, valueName]) => ({
        value,
        valueName,
      })),
    }));
  }, [product]);

  // Default selected variants once product loads
  useEffect(() => {
    if (!product?.variantPricing?.length) return;
    const initial: Record<string, string> = {};
    const first = product.variantPricing[0];
    for (const c of first.combination) {
      initial[c.attributeName] = c.value;
    }
    setSelectedVariants((prev) =>
      Object.keys(prev).length ? prev : initial
    );
  }, [product]);

  const activeVariant = useMemo<ProductVariantPricing | null>(() => {
    if (!product?.variantPricing?.length) return null;
    return (
      product.variantPricing.find((v) =>
        variantMatchesSelection(v, selectedVariants)
      ) || product.variantPricing[0]
    );
  }, [product, selectedVariants]);

  const sellingPrice = activeVariant?.sellingPrice ?? 0;
  const discountPrice =
    activeVariant?.discountType === "percentage" && activeVariant.discountValue
      ? sellingPrice * (1 - activeVariant.discountValue / 100)
      : activeVariant?.discountType === "flat" && activeVariant.discountValue
        ? Math.max(0, sellingPrice - activeVariant.discountValue)
        : undefined;
  const discountPct = discountPrice
    ? Math.round(((sellingPrice - discountPrice) / sellingPrice) * 100)
    : 0;
  const stockQty = activeVariant?.quantity ?? 0;
  const inStock = stockQty > 0;

  const specifications = useMemo(() => {
    if (!product) return [] as Array<{ label: string; value: string }>;
    const specs: Array<{ label: string; value: string }> = [];
    if (product.sku) specs.push({ label: "SKU", value: product.sku });
    if (product.category?.name) specs.push({ label: "Category", value: product.category.name });
    if (product.subCategory?.name) specs.push({ label: "Sub-category", value: product.subCategory.name });
    if (product.sellingType) specs.push({ label: "Selling type", value: product.sellingType });
    if (product.minOrderQuantity) specs.push({ label: "Min order qty", value: String(product.minOrderQuantity) });
    if (product.taxType) specs.push({ label: "Tax type", value: product.taxType });
    if (activeVariant?.sku) specs.push({ label: "Variant SKU", value: activeVariant.sku });
    if (activeVariant) specs.push({ label: "Variant stock", value: String(activeVariant.quantity) });
    return specs;
  }, [product, activeVariant]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <div style={{ fontSize: 14, color: "#9CA3AF" }}>Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 16, color: "#111", fontWeight: 600 }}>Product not found</div>
        <div style={{ fontSize: 13, color: "#6B7280" }}>
          {error || "We couldn't find a product matching this URL."}
        </div>
        <Link href="/products" style={{ marginTop: 8, color: "#EA6B0E", fontWeight: 600 }}>
          Browse all products
        </Link>
      </div>
    );
  }

  const ratingDisplay = 4.8; // rating/review data not modeled yet
  const reviewCount = 0;

  return (
    <>
      <Breadcrumb
        items={[
          ...(product.category
            ? [{ label: product.category.name, href: `/category/${product.category.slug}` }]
            : []),
          { label: product.name },
        ]}
      />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#f1f5f9]">
            <div className="p-5 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Gallery */}
                <div>
                  <div className="ks-pd-main-img">
                    <ProductImage
                      src={images[selectedImage] || PLACEHOLDER}
                      alt={product.name}
                      className="object-contain p-4"
                    />
                    {discountPct > 0 && (
                      <span className="ks-pd-discount-badge">-{discountPct}%</span>
                    )}
                    <button
                      onClick={() => setWishlisted(!wishlisted)}
                      className={`ks-pd-wishlist-btn ${wishlisted ? "ks-pd-wishlist-active" : ""}`}
                    >
                      <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
                    </button>
                  </div>
                  {images.length > 1 && (
                    <div className="ks-pd-thumbs">
                      {images.map((image, index) => (
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
                  )}
                </div>

                {/* Product Info */}
                <div>
                  {vendor && (
                    <Link href={`/vendor/${vendor._id}`} className="ks-pd-vendor-link">
                      <div className="ks-pd-vendor-avatar">
                        {vendor.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{vendor.name}</span>
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </Link>
                  )}

                  <h1 className="ks-pd-title">{product.name}</h1>

                  <div className="ks-pd-rating-row">
                    <div className="ks-pd-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-[18px] h-[18px] ${i < Math.floor(ratingDisplay) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
                      ))}
                      <span className="ks-pd-rating-num">{ratingDisplay}</span>
                    </div>
                    <span className="ks-pd-review-count">({reviewCount} reviews)</span>
                    <span className="ks-pd-stock-badge" style={!inStock ? { color: "#EF4444" } : undefined}>
                      <span className="ks-pd-stock-dot" style={!inStock ? { background: "#EF4444" } : undefined} />
                      {inStock ? `In Stock (${stockQty})` : "Out of stock"}
                    </span>
                  </div>

                  <div className="ks-pd-price-row">
                    <span className="ks-pd-price">{formatPrice(discountPrice ?? sellingPrice)}</span>
                    {discountPrice !== undefined && (
                      <>
                        <span className="ks-pd-price-old">{formatPrice(sellingPrice)}</span>
                        <span className="ks-pd-save-badge">Save {discountPct}%</span>
                      </>
                    )}
                  </div>

                  {variantGroups.map((group) => (
                    <div key={group.label} className="ks-pd-variant-group">
                      <label className="ks-pd-variant-label">
                        {group.label}:{" "}
                        <span className="ks-pd-variant-selected">
                          {
                            group.options.find(
                              (o) => o.value === selectedVariants[group.label]
                            )?.valueName || ""
                          }
                        </span>
                      </label>
                      <div className="ks-pd-variant-options">
                        {group.options.map((option) => {
                          const active = selectedVariants[group.label] === option.value;
                          return (
                            <button
                              key={option.value}
                              onClick={() =>
                                setSelectedVariants((p) => ({
                                  ...p,
                                  [group.label]: option.value,
                                }))
                              }
                              className={`ks-pd-variant-btn ${active ? "ks-pd-variant-btn-active" : ""}`}
                            >
                              {option.valueName}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="ks-pd-variant-group">
                    <label className="ks-pd-variant-label">Quantity</label>
                    <div className="ks-pd-qty">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="ks-pd-qty-btn">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="ks-pd-qty-value">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(stockQty || 99, quantity + 1))}
                        className="ks-pd-qty-btn"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="ks-pd-actions">
                    <button className="ks-pd-add-cart-btn" disabled={!inStock}>
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </button>
                    <button className="ks-pd-buy-btn" disabled={!inStock}>Buy Now</button>
                    <button className="ks-pd-icon-btn">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

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

                  {vendor && (
                    <Link href={`/vendor/${vendor._id}`} className="ks-pd-vendor-card group">
                      <div className="ks-pd-vendor-card-avatar">
                        {vendor.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ks-pd-vendor-card-info">
                        <div className="ks-pd-vendor-card-name-row">
                          <span className="ks-pd-vendor-card-name">{vendor.name}</span>
                          <span className="ks-pd-vendor-verified-pill">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        </div>
                        <div className="ks-pd-vendor-card-stats">
                          {vendor.address && <span>{vendor.address}</span>}
                          {vendor.address && <span className="ks-pd-vendor-card-dot" />}
                          <span>{vendor.productCount} products</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#ccc] group-hover:text-orange-500 transition-colors" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    {tab === "reviews" ? `Reviews (${reviewCount})` : tab}
                    {activeTab === tab && <span className="ks-pd-tab-bar" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {activeTab === "description" && (
                <div className="max-w-3xl">
                  <p className="whitespace-pre-line text-[14.5px] text-[#555] leading-[1.75]">
                    {product.description || "No description provided for this product yet."}
                  </p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="max-w-2xl">
                  {specifications.length === 0 ? (
                    <p className="text-sm text-[#6B7280]">No specifications available.</p>
                  ) : (
                    specifications.map((spec, i) => (
                      <div key={spec.label} className={`ks-pd-spec-row ${i % 2 === 0 ? "ks-pd-spec-row-alt" : ""}`}>
                        <span className="ks-pd-spec-label">{spec.label}</span>
                        <span className="ks-pd-spec-value">{spec.value}</span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="text-sm text-[#6B7280]">
                  No reviews yet. Be the first to review this product.
                </div>
              )}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="site-container">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#f1f5f9]">
              <div className="flex items-center gap-2.5 mb-5">
                <Flame className="w-[18px] h-[18px] text-orange-400" />
                <h2 className="text-lg font-extrabold text-[#111]">More from this vendor</h2>
              </div>
              <div className="ks-pd-related-grid">
                {related.map((p) => (
                  <div key={p._id} className="ks-pd-related-card">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
