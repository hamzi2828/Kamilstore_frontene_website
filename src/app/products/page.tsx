"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { SlidersHorizontal, Grid, List, ChevronDown, X, Search, Loader2 } from "lucide-react";
import { getProducts, ProductListItem, ProductsPagination } from "./services/productsApi";
import { categoriesApi, NavCategory } from "@/components/layout/service/categoriesApi";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $500", min: 100, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "Over $1000", min: 1000, max: Infinity },
];

const PAGE_LIMIT = 12;

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialNewArrivals =
    searchParams.get("newArrivals") === "1" ||
    searchParams.get("newArrivals") === "true";

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [newArrivalsOnly, setNewArrivalsOnly] = useState(initialNewArrivals);
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const effectiveSort = newArrivalsOnly ? "newest" : sortBy;

  const [categories, setCategories] = useState<NavCategory[]>([]);
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [pagination, setPagination] = useState<ProductsPagination>({
    total: 0,
    page: 1,
    limit: PAGE_LIMIT,
    pages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load categories once
  useEffect(() => {
    let cancelled = false;
    categoriesApi.getCategories().then((cats) => {
      if (!cancelled) setCategories(cats);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep New Arrivals checkbox in sync with the URL param (covers in-app nav)
  useEffect(() => {
    const v = searchParams.get("newArrivals");
    setNewArrivalsOnly(v === "1" || v === "true");
  }, [searchParams]);

  // Reflect checkbox state back to the URL (so unticking removes ?newArrivals=1)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get("newArrivals");
    const isOn = current === "1" || current === "true";
    if (newArrivalsOnly && !isOn) {
      params.set("newArrivals", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else if (!newArrivalsOnly && isOn) {
      params.delete("newArrivals");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }
  }, [newArrivalsOnly, searchParams, router, pathname]);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchTerm(searchInput.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategorySlug, selectedPriceRange, sortBy, newArrivalsOnly]);

  // Fetch products whenever query changes
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const minPrice = selectedPriceRange.min > 0 ? selectedPriceRange.min : undefined;
    const maxPrice = Number.isFinite(selectedPriceRange.max) ? selectedPriceRange.max : undefined;

    getProducts({
      search: searchTerm || undefined,
      category: selectedCategorySlug !== "all" ? selectedCategorySlug : undefined,
      minPrice,
      maxPrice,
      sort: effectiveSort,
      page,
      limit: PAGE_LIMIT,
    })
      .then((res) => {
        if (cancelled) return;
        setProducts(res.data);
        setPagination(res.pagination);
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
  }, [searchTerm, selectedCategorySlug, selectedPriceRange, effectiveSort, page]);

  const selectedCategoryName = useMemo(() => {
    if (selectedCategorySlug === "all") return "All Categories";
    const c = categories.find((c) => c.slug === selectedCategorySlug);
    return c?.name || "All Categories";
  }, [categories, selectedCategorySlug]);

  const pageNumbers = useMemo(() => {
    const total = pagination.pages;
    const current = pagination.page;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push("...");
    pages.push(total);
    return pages;
  }, [pagination]);

  const hasActiveFilter =
    selectedCategorySlug !== "all" ||
    selectedPriceRange.label !== "All Prices" ||
    searchTerm.length > 0 ||
    newArrivalsOnly;

  const clearAll = () => {
    setSelectedCategorySlug("all");
    setSelectedPriceRange(priceRanges[0]);
    setNewArrivalsOnly(false);
    setSearchInput("");
    setSearchTerm("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="site-container py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">All Products</span>
        </nav>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                {hasActiveFilter && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-orange-600 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Quick Filters */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Quick Filters</h4>
                <label className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-gray-100 rounded">
                  <input
                    type="checkbox"
                    checked={newArrivalsOnly}
                    onChange={(e) => setNewArrivalsOnly(e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm">New Arrivals</span>
                </label>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Categories</h4>
                <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  <li>
                    <button
                      onClick={() => setSelectedCategorySlug("all")}
                      className={`w-full text-left py-1 px-2 rounded ${
                        selectedCategorySlug === "all"
                          ? "bg-orange-100 text-orange-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category._id}>
                      <button
                        onClick={() => setSelectedCategorySlug(category.slug)}
                        className={`w-full text-left py-1 px-2 rounded ${
                          selectedCategorySlug === category.slug
                            ? "bg-orange-100 text-orange-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                  {categories.length === 0 && (
                    <li className="text-sm text-gray-400 px-2">Loading...</li>
                  )}
                </ul>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Price Range</h4>
                <ul className="space-y-2">
                  {priceRanges.map((range) => (
                    <li key={range.label}>
                      <button
                        onClick={() => setSelectedPriceRange(range)}
                        className={`w-full text-left py-1 px-2 rounded ${
                          selectedPriceRange.label === range.label
                            ? "bg-orange-100 text-orange-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {range.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">All Products</h1>
                  <p className="text-gray-500 text-sm">
                    {loading
                      ? "Loading products..."
                      : `Showing ${products.length} of ${pagination.total} products`}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search products..."
                      className="w-full md:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={effectiveSort}
                      onChange={(e) => setSortBy(e.target.value)}
                      disabled={newArrivalsOnly}
                      title={newArrivalsOnly ? "Sort locked to Newest while New Arrivals is on" : undefined}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-asc">Name: A-Z</option>
                      <option value="name-desc">Name: Z-A</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                      aria-label="List view"
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilter && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                    &quot;{searchTerm}&quot;
                    <button
                      onClick={() => {
                        setSearchInput("");
                        setSearchTerm("");
                      }}
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedCategorySlug !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                    {selectedCategoryName}
                    <button
                      onClick={() => setSelectedCategorySlug("all")}
                      aria-label="Clear category"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {newArrivalsOnly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                    New Arrivals
                    <button
                      onClick={() => setNewArrivalsOnly(false)}
                      aria-label="Clear new arrivals"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedPriceRange.label !== "All Prices" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                    {selectedPriceRange.label}
                    <button
                      onClick={() => setSelectedPriceRange(priceRanges[0])}
                      aria-label="Clear price range"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid / States */}
            {loading ? (
              <div className="bg-white rounded-xl shadow-sm p-16 flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                <p>Loading products...</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <p className="text-red-600 font-medium mb-2">{error}</p>
                <button
                  onClick={() => setPage((p) => p)}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Retry
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <p className="text-gray-700 font-medium mb-1">No products found</p>
                <p className="text-gray-500 text-sm mb-4">
                  Try adjusting your filters or search terms.
                </p>
                {hasActiveFilter && (
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div
                className={`grid gap-4 md:gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && pagination.pages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-2 flex-wrap">
                  <button
                    disabled={pagination.page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {pageNumbers.map((p, idx) =>
                    p === "..." ? (
                      <span key={`dots-${idx}`} className="px-2 text-gray-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-4 py-2 rounded-lg ${
                          p === pagination.page
                            ? "bg-orange-500 text-white"
                            : "border border-gray-300 hover:bg-gray-50 bg-white"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    disabled={pagination.page >= pagination.pages}
                    onClick={() =>
                      setPage((p) => Math.min(pagination.pages, p + 1))
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Filters */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Quick Filters</h4>
              <label className="flex items-center gap-2 cursor-pointer py-2 px-3 hover:bg-gray-100 rounded">
                <input
                  type="checkbox"
                  checked={newArrivalsOnly}
                  onChange={(e) => setNewArrivalsOnly(e.target.checked)}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span>New Arrivals</span>
              </label>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategorySlug("all")}
                    className={`w-full text-left py-2 px-3 rounded ${
                      selectedCategorySlug === "all"
                        ? "bg-orange-100 text-orange-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category._id}>
                    <button
                      onClick={() => setSelectedCategorySlug(category.slug)}
                      className={`w-full text-left py-2 px-3 rounded ${
                        selectedCategorySlug === category.slug
                          ? "bg-orange-100 text-orange-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Price Range</h4>
              <ul className="space-y-2">
                {priceRanges.map((range) => (
                  <li key={range.label}>
                    <button
                      onClick={() => setSelectedPriceRange(range)}
                      className={`w-full text-left py-2 px-3 rounded ${
                        selectedPriceRange.label === range.label
                          ? "bg-orange-100 text-orange-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
