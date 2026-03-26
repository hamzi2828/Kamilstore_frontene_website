"use client";

import Link from "next/link";
import "@/styling/TopVendors.css";
import {
  Store, ChevronRight, Star, ShieldCheck, Package,
  MessageSquare, Award, TrendingUp, ArrowRight,
} from "lucide-react";

const vendors = [
  { _id: "1", name: "TechZone Electronics", slug: "techzone", logo: "/vendors/techzone.jpg", description: "Your trusted source for premium electronics and gadgets. Quality products at competitive prices.", rating: 4.8, reviewCount: 1250, productCount: 342, isVerified: true, badge: "Top Rated" },
  { _id: "2", name: "FashionPlus", slug: "fashionplus", logo: "/vendors/fashionplus.jpg", description: "Trendy fashion for everyone. Stay stylish with our latest collections from top brands.", rating: 4.6, reviewCount: 890, productCount: 567, isVerified: true, badge: "Best Seller" },
  { _id: "3", name: "HomeStyle Decor", slug: "homestyle", logo: "/vendors/homestyle.jpg", description: "Transform your living space with our beautiful home decor and furniture collection.", rating: 4.7, reviewCount: 456, productCount: 234, isVerified: true, badge: "Featured" },
  { _id: "4", name: "SportsFit Pro", slug: "sportsfit", logo: "/vendors/sportsfit.jpg", description: "Premium sports equipment and fitness gear for athletes and fitness enthusiasts.", rating: 4.5, reviewCount: 678, productCount: 189, isVerified: false },
];

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return n.toString();
}

const rankClass = (r: number) => r === 1 ? "gold" : r === 2 ? "silver" : "bronze";
const badgeClass: Record<string, string> = {
  "Top Rated": "top-rated",
  "Best Seller": "best-seller",
  Featured: "featured",
};

export default function TopVendors() {
  return (
    <section className="ks-vendors" style={{ maxWidth: 1380, margin: "0 auto", padding: "0 20px" }}>
      <div style={{
        background: "#fff",
        borderRadius: 20,
        border: "1px solid #F1F5F9",
        padding: "32px 28px",
      }}>
        {/* Section Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 24,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 11,
              background: "#FFF7ED",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1.5px solid #FFEDD5",
            }}>
              <Store style={{ width: 20, height: 20, color: "#EA6B0E" }} />
            </div>
            <div>
              <h2 style={{
                fontSize: 20, fontWeight: 800, color: "#111827",
                margin: 0, letterSpacing: "-0.3px",
              }}>
                Top Vendors
              </h2>
              <p style={{ fontSize: 13, color: "#9CA3AF", margin: "3px 0 0", fontWeight: 500 }}>
                Trusted sellers with the best ratings
              </p>
            </div>
          </div>

          <Link href="/vendors" className="ks-view-all-btn">
            View All
            <ChevronRight style={{ width: 15, height: 15 }} />
          </Link>
        </div>

        {/* Vendor Grid */}
        <div className="ks-vendors-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}>
          {vendors.map((v, i) => (
            <Link key={v._id} href={`/vendor/${v.slug}`} className="ks-vendor-card">
              {/* Rank */}
              {i < 3 && (
                <div className={`ks-vendor-rank ${rankClass(i + 1)}`}>
                  {i + 1}
                </div>
              )}

              {/* Header: avatar + info */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div className="ks-vendor-avatar">
                  {v.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span className="ks-vendor-name" style={{
                      fontSize: 14, fontWeight: 700, color: "#111827",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {v.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {/* Stars */}
                    <div className="ks-vendor-stars">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} style={{
                          width: 12, height: 12,
                          color: j < Math.floor(v.rating) ? "#F59E0B" : "#E5E7EB",
                          fill: j < Math.floor(v.rating) ? "#F59E0B" : "#E5E7EB",
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#111827" }}>
                      {v.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified + Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                {v.isVerified && (
                  <span className="ks-vendor-verified">
                    <ShieldCheck style={{ width: 10, height: 10 }} />
                    Verified
                  </span>
                )}
                {v.badge && (
                  <span className={`ks-vendor-badge ${badgeClass[v.badge] || ""}`}>
                    <Award style={{ width: 10, height: 10 }} />
                    {v.badge}
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{
                fontSize: 12.5, color: "#6B7280", lineHeight: 1.6,
                margin: "0 0 14px",
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>
                {v.description}
              </p>

              {/* Stats */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                paddingTop: 14, borderTop: "1px solid #F1F5F9",
              }}>
                <div className="ks-vendor-stat">
                  <Package style={{ width: 12, height: 12 }} />
                  {formatCount(v.productCount)} products
                </div>
                <div className="ks-vendor-stat">
                  <MessageSquare style={{ width: 12, height: 12 }} />
                  {formatCount(v.reviewCount)} reviews
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom promo strip */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
          marginTop: 24, padding: "14px 20px",
          background: "#F9FAFB", borderRadius: 12,
          border: "1px solid #F1F5F9",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ShieldCheck style={{ width: 14, height: 14, color: "#2563EB" }} />
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#374151" }}>All vendors verified</span>
          </div>
          <span style={{ color: "#E5E7EB" }}>|</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <TrendingUp style={{ width: 14, height: 14, color: "#10B981" }} />
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#374151" }}>1,200+ active sellers</span>
          </div>
          <span style={{ color: "#E5E7EB" }}>|</span>
          <Link href="/vendor/register" style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 12.5, fontWeight: 700, color: "#EA6B0E",
            textDecoration: "none", transition: "color 0.15s",
          }}>
            <Store style={{ width: 13, height: 13 }} />
            Become a seller
            <ArrowRight style={{ width: 12, height: 12 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
