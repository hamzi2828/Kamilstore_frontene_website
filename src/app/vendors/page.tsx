"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search, ChevronDown, Store,
  ArrowRight, Users, Package,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { VendorCard, VendorsEmpty, VendorsLoading } from "./components";
import { getVendors, type Vendor, type VendorsPagination } from "./services/vendorsApi";
import "@/styling/VendorsPage.css";

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [pagination, setPagination] = useState<VendorsPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchVendors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getVendors({
        search: searchQuery || undefined,
        sort: sortBy === "newest" ? undefined : sortBy,
        page,
        limit: 12,
      });
      setVendors(res.data);
      setPagination(res.pagination);
    } catch {
      setVendors([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sortBy, page]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchVendors();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchVendors]);

  // Reset page when search/sort changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortBy]);

  return (
    <>
      <Breadcrumb items={[{ label: "Vendors" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header Card ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400" />

            <div className="p-5 sm:p-6">
              {/* Title row */}
              <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="ks-vs-icon-box">
                    <Store className="w-[22px] h-[22px] text-orange-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                      Our Vendors
                    </h1>
                    <p className="text-sm text-[#999] font-medium mt-1.5">
                      Shop from {pagination?.total ?? "..."} trusted sellers on KamilStore
                    </p>
                  </div>
                </div>

                {/* Search */}
                <div className="ks-vs-search-wrap">
                  <Search className="ks-vs-search-icon" />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ks-vs-search-input"
                  />
                </div>
              </div>

              {/* Stats strip */}
              <div className="ks-vs-stats-strip">
                <div className="ks-vs-stat">
                  <Store className="w-[18px] h-[18px] text-orange-500" />
                  <span className="ks-vs-stat-value">{pagination?.total ?? "..."}</span>
                  <span className="ks-vs-stat-label">Vendors</span>
                </div>
                <div className="ks-vs-stat-sep" />
                <div className="ks-vs-stat">
                  <Users className="w-[18px] h-[18px] text-emerald-500" />
                  <span className="ks-vs-stat-value">Verified</span>
                  <span className="ks-vs-stat-label">Sellers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sort + Grid ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl p-5 sm:p-6">
            {/* Sort bar */}
            <div className="ks-vs-filter-bar">
              <p className="text-[13px] text-[#999] font-medium">
                Showing <strong className="text-[#555]">{vendors.length}</strong> of {pagination?.total ?? 0} vendors
              </p>

              <div className="ks-vs-sort-wrap">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="ks-vs-sort-select"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="name-asc">A — Z</option>
                  <option value="name-desc">Z — A</option>
                </select>
                <ChevronDown className="ks-vs-sort-arrow" />
              </div>
            </div>

            {/* Content */}
            {loading ? (
              <VendorsLoading />
            ) : vendors.length === 0 ? (
              <VendorsEmpty />
            ) : (
              <div className="ks-vs-grid">
                {vendors.map((v, i) => (
                  <VendorCard key={v._id} vendor={v} index={i} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="ks-vs-pagination">
                <button
                  className="ks-vs-page-btn"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </button>
                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i}
                    className={`ks-vs-page-btn ${page === i + 1 ? "ks-vs-page-active" : ""}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="ks-vs-page-btn"
                  disabled={page >= pagination.pages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Become a Seller CTA ── */}
        <section className="site-container">
          <div className="ks-vs-cta-card">
            <div className="ks-vs-cta-content">
              <div className="ks-vs-cta-icon-box">
                <Store className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="ks-vs-cta-title">Become a Seller</h2>
                <p className="ks-vs-cta-sub">
                  Join thousands of successful sellers on KamilStore. Reach millions of customers today.
                </p>
              </div>
            </div>
            <Link href="/vendor/register" className="ks-vs-cta-btn">
              Start Selling
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
