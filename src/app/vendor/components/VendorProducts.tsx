"use client";

import { useState } from "react";
import { ChevronDown, Grid, List, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import {
  useVendorCategories,
  useVendorProducts,
} from "../hooks/useVendorProducts";
import type { VendorProductSort } from "../types";

interface VendorProductsProps {
  vendorId: string;
}

export default function VendorProducts({ vendorId }: VendorProductsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<VendorProductSort>("featured");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { categories, total: totalAcrossCats, isLoading: catsLoading } =
    useVendorCategories(vendorId);
  const { products, total, isLoading } = useVendorProducts({
    vendorId,
    category: selectedCategory,
    sort: sortBy,
  });

  const activeCategoryName =
    selectedCategory === "all"
      ? "All Products"
      : categories.find((c) => c._id === selectedCategory)?.name ||
        "All Products";

  return (
    <div className="ks-vp-products-layout">
      {/* Sidebar */}
      <aside className="ks-vp-sidebar">
        <div className="ks-vp-sidebar-card">
          <h3 className="ks-vp-sidebar-title">Categories</h3>
          <ul className="ks-vp-sidebar-list">
            <li>
              <button
                onClick={() => setSelectedCategory("all")}
                className={`ks-vp-sidebar-item ${
                  selectedCategory === "all" ? "ks-vp-sidebar-item-active" : ""
                }`}
              >
                <span>All Products</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                    {totalAcrossCats}
                  </span>
                  <ChevronRight className="ks-vp-sidebar-item-arrow" />
                </span>
              </button>
            </li>
            {catsLoading && (
              <li style={{ padding: "8px 12px", fontSize: 12, color: "#9CA3AF" }}>
                Loading...
              </li>
            )}
            {categories.map((cat) => (
              <li key={cat._id}>
                <button
                  onClick={() => setSelectedCategory(cat._id)}
                  className={`ks-vp-sidebar-item ${
                    selectedCategory === cat._id
                      ? "ks-vp-sidebar-item-active"
                      : ""
                  }`}
                >
                  <span>{cat.name}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                      {cat.count}
                    </span>
                    <ChevronRight className="ks-vp-sidebar-item-arrow" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main */}
      <div className="ks-vp-main">
        <div className="ks-vp-toolbar">
          <div>
            <h2 className="ks-vp-toolbar-title">{activeCategoryName}</h2>
            <p className="ks-vp-toolbar-count">
              {isLoading ? "Loading..." : `${total} products found`}
            </p>
          </div>

          <div className="ks-vp-toolbar-controls">
            <div className="ks-vp-sort-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as VendorProductSort)}
                className="ks-vp-sort-select"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
              <ChevronDown className="ks-vp-sort-arrow" />
            </div>

            <div className="ks-vp-view-toggle">
              <button
                onClick={() => setViewMode("grid")}
                className={`ks-vp-view-btn ${
                  viewMode === "grid" ? "ks-vp-view-btn-active" : ""
                }`}
              >
                <Grid className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`ks-vp-view-btn ${
                  viewMode === "list" ? "ks-vp-view-btn-active" : ""
                }`}
              >
                <List className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {!isLoading && products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              color: "#6B7280",
              fontSize: 14,
            }}
          >
            This vendor has no products in this category yet.
          </div>
        ) : (
          <div
            className={`ks-vp-grid ${
              viewMode === "list" ? "ks-vp-grid-list" : ""
            }`}
          >
            {products.map((product) => (
              <div key={product._id} className="ks-vp-product-wrap">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
