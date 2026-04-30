"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { getProducts, ProductListItem } from "@/app/products/services/productsApi";
import "@/styling/FeaturedProducts.css";

const MAX_FEATURED = 25;

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getProducts({ sort: "featured", page: 1, limit: MAX_FEATURED })
      .then((res) => {
        if (cancelled) return;
        setProducts(res.data);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message || "Failed to load products");
        setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="site-container">
      <div className="ks-fp-wrap">
        {/* ── Header ── */}
        <div className="ks-fp-header">
          <div className="ks-fp-header-left">
            <div className="ks-fp-icon">
              <Sparkles className="ks-fp-icon-svg" />
            </div>
            <div>
              <h2 className="ks-fp-title">Featured Products</h2>
            </div>
          </div>
          <Link href="/products" className="ks-fp-viewall">
            View All
            <ArrowRight className="ks-fp-viewall-icon" />
          </Link>
        </div>

        {/* ── Product Grid ── */}
        <div className="ks-fp-grid-area">
          {loading ? (
            <div className="ks-fp-empty">
              <Loader2 className="ks-fp-empty-icon animate-spin" />
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="ks-fp-empty">
              <Sparkles className="ks-fp-empty-icon" />
              <p>{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="ks-fp-empty">
              <Sparkles className="ks-fp-empty-icon" />
              <p>No featured products available</p>
            </div>
          ) : (
            <div className="ks-fp-grid">
              {products.map((p) => (
                <div key={p._id} className="ks-fp-product">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Bottom strip ── */}
        {!loading && !error && products.length > 0 && (
          <div className="ks-fp-bottom">
            <span className="ks-fp-bottom-text">
              Showing <strong>{products.length}</strong> featured products
            </span>
            <Link href="/products" className="ks-fp-bottom-link">
              Browse all products
              <ChevronRight className="ks-fp-bottom-link-icon" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
