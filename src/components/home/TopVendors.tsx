"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styling/TopVendors.css";
import {
  Store, ChevronRight, ShieldCheck, MapPin,
  UserCircle, CalendarDays, ArrowRight, TrendingUp,
} from "lucide-react";
import { getVendors, type Vendor } from "@/app/vendors/services/vendorsApi";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const rankClass = (r: number) => r === 1 ? "gold" : r === 2 ? "silver" : "bronze";

function joinedYear(iso: string): string {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : `Joined ${d.getFullYear()}`;
}

export default function TopVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getVendors({ limit: 4, page: 1 });
        if (!mounted) return;
        setVendors(res.data);
        setTotal(res.pagination?.total ?? res.data.length);
      } catch {
        if (mounted) setVendors([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="ks-vendors site-container">
      <div className="ks-vendors-card">
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
        <div className="ks-vendors-grid">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="ks-vendor-card" style={{ pointerEvents: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div className="ks-vendor-avatar" style={{ background: "#F3F4F6", borderColor: "#E5E7EB" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ height: 12, width: "70%", background: "#F3F4F6", borderRadius: 6, marginBottom: 8 }} />
                    <div style={{ height: 10, width: "45%", background: "#F3F4F6", borderRadius: 6 }} />
                  </div>
                </div>
                <div style={{ height: 10, background: "#F3F4F6", borderRadius: 6, marginBottom: 6 }} />
                <div style={{ height: 10, width: "80%", background: "#F3F4F6", borderRadius: 6, marginBottom: 14 }} />
                <div style={{ height: 22, background: "#F9FAFB", borderRadius: 8 }} />
              </div>
            ))
          ) : vendors.length === 0 ? (
            <div style={{
              gridColumn: "1 / -1", padding: "32px 16px", textAlign: "center",
              color: "#9CA3AF", fontSize: 13, fontWeight: 500,
            }}>
              No vendors available yet.
            </div>
          ) : (
            vendors.map((v, i) => {
              const logoSrc = v.logo
                ? (v.logo.startsWith("http") ? v.logo : `${API}${v.logo}`)
                : null;
              const subtitle = v.shopTitle && v.shopTitle !== v.shopName ? v.shopTitle : null;
              const joined = joinedYear(v.createdAt);

              return (
                <Link key={v._id} href={`/vendor/${v._id}`} className="ks-vendor-card">
                  {i < 3 && (
                    <div className={`ks-vendor-rank ${rankClass(i + 1)}`}>
                      {i + 1}
                    </div>
                  )}

                  {/* Header: avatar + info */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div className="ks-vendor-avatar">
                      {logoSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logoSrc} alt={v.shopName} />
                      ) : (
                        v.shopName.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ marginBottom: 4 }}>
                        <span className="ks-vendor-name" style={{
                          display: "block",
                          fontSize: 14, fontWeight: 700, color: "#111827",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          {v.shopName}
                        </span>
                      </div>
                      {subtitle && (
                        <span style={{
                          display: "block",
                          fontSize: 11.5, color: "#9CA3AF", fontWeight: 500,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          {subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Verified badge — all public vendors are verified */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                    <span className="ks-vendor-verified">
                      <ShieldCheck style={{ width: 10, height: 10 }} />
                      Verified
                    </span>
                  </div>

                  {/* Description */}
                  {v.description && (
                    <p style={{
                      fontSize: 12.5, color: "#6B7280", lineHeight: 1.6,
                      margin: "0 0 14px",
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {v.description}
                    </p>
                  )}

                  {/* Stats */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
                    paddingTop: 14, borderTop: "1px solid #F1F5F9",
                  }}>
                    {v.address && (
                      <div className="ks-vendor-stat" style={{ maxWidth: "100%", overflow: "hidden" }}>
                        <MapPin style={{ width: 12, height: 12, flexShrink: 0 }} />
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {v.address}
                        </span>
                      </div>
                    )}
                    {v.owner?.name ? (
                      <div className="ks-vendor-stat">
                        <UserCircle style={{ width: 12, height: 12 }} />
                        {v.owner.name}
                      </div>
                    ) : joined ? (
                      <div className="ks-vendor-stat">
                        <CalendarDays style={{ width: 12, height: 12 }} />
                        {joined}
                      </div>
                    ) : null}
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Bottom promo strip */}
        <div className="ks-vendors-promo">
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ShieldCheck style={{ width: 14, height: 14, color: "#2563EB" }} />
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#374151" }}>All vendors verified</span>
          </div>
          <span style={{ color: "#E5E7EB" }}>|</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <TrendingUp style={{ width: 14, height: 14, color: "#10B981" }} />
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#374151" }}>
              {total > 0 ? `${total}+ active sellers` : "Active sellers"}
            </span>
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
