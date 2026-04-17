"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingCart, Heart, Menu, X, User, LogOut, Search, ChevronDown, ChevronRight,
  MapPin, Shield, Headphones, Globe, LayoutGrid, Tag, Sparkles, Package,
  ArrowRight, Star, Store, Zap, TrendingUp, Bell,
  Smartphone, Shirt, Home, Dumbbell, Gamepad2, Watch, Car,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const categories = [
  { name: "Electronics", slug: "electronics", icon: Smartphone, color: "#3B82F6", bg: "#EFF6FF", sub: ["Phones", "Laptops", "Audio", "Cameras"] },
  { name: "Fashion", slug: "fashion", icon: Shirt, color: "#EC4899", bg: "#FDF2F8", sub: ["Men", "Women", "Kids", "Accessories"] },
  { name: "Home & Garden", slug: "home-garden", icon: Home, color: "#10B981", bg: "#ECFDF5", sub: ["Furniture", "Decor", "Kitchen", "Garden"] },
  { name: "Sports", slug: "sports", icon: Dumbbell, color: "#F97316", bg: "#FFF7ED", sub: ["Fitness", "Outdoors", "Team Sports", "Cycling"] },
  { name: "Beauty", slug: "beauty", icon: Sparkles, color: "#A855F7", bg: "#FAF5FF", sub: ["Skincare", "Makeup", "Haircare", "Fragrance"] },
  { name: "Gaming", slug: "gaming", icon: Gamepad2, color: "#EF4444", bg: "#FEF2F2", sub: ["Consoles", "PC Games", "Accessories", "VR"] },
  { name: "Watches", slug: "watches", icon: Watch, color: "#D97706", bg: "#FFFBEB", sub: ["Smartwatches", "Luxury", "Casual", "Sport"] },
  { name: "Automotive", slug: "automotive", icon: Car, color: "#6B7280", bg: "#F9FAFB", sub: ["Parts", "Accessories", "Tools", "Care"] },
];

const navLinks = [
  { label: "Today's Deals", href: "/deals", icon: Tag, hot: false },
  { label: "Flash Sale", href: "/flash-sale", icon: Zap, live: true },
  { label: "Trending", href: "/trending", icon: TrendingUp, hot: false },
  { label: "New Arrivals", href: "/new-arrivals", icon: Sparkles, hot: false },
  { label: "Our Vendors", href: "/vendors", icon: Store, hot: false },
];

const routes = {
  home: "/",
  shop: "/products",
  wishlist: "/wishlist",
  cart: "/cart",
  auth: "/login",
  userDetails: "/account",
  help: "/help",
  track: "/track-order",
  sell: "/vendor/register",
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileShowCategories, setMobileShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>(categories[0]);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const cartCount = 3;
  const wishlistCount = 0;

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen((s) => !s);
    setMobileSearchOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const handleLogout = () => {
    closeMobileMenu();
    logout();
    router.push("/");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchOpen(false);
    }
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-200 ${scrolled ? "shadow-lg" : ""}`}>
        {/* ─────────── Top Bar ─────────── */}
        <div className="bg-[#1A1A2E] text-gray-400 text-[8px] sm:text-[9px] md:text-xs">
          {/* Mobile */}
          <div className="md:hidden max-w-[1400px] mx-auto px-3 flex items-center justify-between h-6">
            <div className="flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-orange-400 flex-shrink-0" />
              <span>Free shipping on $50+</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
              <span className="text-emerald-400">Buyer Protected</span>
            </div>
          </div>
          {/* Desktop */}
          <div className="hidden md:flex max-w-[1400px] mx-auto px-5 items-center justify-between h-9">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-orange-400" />
              <span>Free shipping on orders over $50</span>
              <span className="text-gray-600 mx-1">·</span>
              <Shield className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Buyer Protection Guaranteed</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href={routes.sell} className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Store className="w-3 h-3" />
                Sell on KamilStore
              </Link>
              <span className="text-gray-600">|</span>
              <Link href={routes.help} className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Headphones className="w-3 h-3" />
                Help
              </Link>
              <span className="text-gray-600">|</span>
              <Link href={routes.track} className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Package className="w-3 h-3" />
                Track Order
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/language" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Globe className="w-3 h-3" />
                EN / USD
              </Link>
            </div>
          </div>
        </div>

        {/* ─────────── Main Header ─────────── */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-3 lg:px-5">
            <div className="flex items-center gap-2 lg:gap-4 h-12 lg:h-20">
              {/* Logo */}
              <Link href={routes.home} className="flex-shrink-0 flex items-baseline gap-0.5" onClick={closeMobileMenu}>
                <span className="text-xl lg:text-2xl font-extrabold text-orange-600 tracking-tight leading-none">Kamil</span>
                <span className="text-xl lg:text-2xl font-extrabold text-gray-900 tracking-tight leading-none">Store</span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 ml-0.5" />
              </Link>

              {/* Categories Mega Button (desktop only) */}
              <div
                className="relative flex-shrink-0 hidden lg:block"
                ref={megaRef}
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <button
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${
                    megaOpen ? "bg-orange-600 text-white" : "bg-[#1A1A2E] text-white hover:bg-[#1A1A2E]/90"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  All Categories
                  <ChevronDown className={`w-3.5 h-3.5 opacity-80 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
                </button>

                {megaOpen && (
                  <div
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                    className="absolute top-full left-0 mt-2 w-[720px] max-w-[calc(100vw-32px)] bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden flex z-[60]"
                  >
                    {/* Left: category list */}
                    <div className="w-[240px] bg-gray-50 border-r border-gray-100 py-2 max-h-[420px] overflow-y-auto flex-shrink-0">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        const active = activeCategory.slug === cat.slug;
                        return (
                          <div
                            key={cat.slug}
                            onMouseEnter={() => setActiveCategory(cat)}
                            className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                              active ? "bg-orange-50" : "hover:bg-gray-100"
                            }`}
                          >
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: cat.bg }}>
                              <Icon className="w-4 h-4" style={{ color: cat.color }} />
                            </div>
                            <span className={`text-sm font-semibold flex-1 truncate ${active ? "text-orange-600" : "text-gray-700"}`}>
                              {cat.name}
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${active ? "text-orange-600" : "text-gray-300"}`} />
                          </div>
                        );
                      })}
                    </div>

                    {/* Right: subcategories */}
                    <div className="flex-1 p-6 min-w-0">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: activeCategory.bg }}>
                          <activeCategory.icon className="w-5 h-5" style={{ color: activeCategory.color }} />
                        </div>
                        <div>
                          <div className="font-extrabold text-base text-gray-900">{activeCategory.name}</div>
                          <div className="text-xs text-gray-500">Browse all {activeCategory.name.toLowerCase()}</div>
                        </div>
                      </div>

                      <ul className="grid grid-cols-2 gap-2 mb-5">
                        {activeCategory.sub.map((sub) => (
                          <li key={sub}>
                            <Link
                              href={`/category/${activeCategory.slug}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                              onClick={() => setMegaOpen(false)}
                              className="group flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            >
                              <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-orange-500" />
                              <span className="truncate">{sub}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/category/${activeCategory.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
                      >
                        View all {activeCategory.name}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Search — desktop only */}
              <form
                onSubmit={handleSearchSubmit}
                className={`relative flex-1 max-w-2xl hidden lg:flex h-12 rounded-xl overflow-hidden transition-all ${
                  searchFocused
                    ? "ring-2 ring-orange-400 bg-white border-2 border-orange-500"
                    : "border-2 border-gray-200 bg-gray-50"
                }`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search for products, brands, categories..."
                  className="flex-1 px-4 text-sm bg-transparent outline-none text-gray-900 placeholder:text-gray-400 min-w-0"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="px-5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center justify-center transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Spacer on mobile to push icons right */}
              <div className="flex-1 lg:hidden" />

              {/* Right actions */}
              <div className="flex items-center gap-2 lg:gap-1.5 flex-shrink-0">
                {/* Mobile search toggle */}
                <button
                  onClick={() => setMobileSearchOpen((s) => !s)}
                  className="lg:hidden w-8 h-8 rounded-lg border-[1.5px] border-gray-200 bg-gray-50 flex items-center justify-center text-gray-700 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  aria-label="Toggle search"
                >
                  {mobileSearchOpen ? <X className="w-3.5 h-3.5" /> : <Search className="w-3.5 h-3.5" />}
                </button>

                {/* Notifications (desktop only) */}
                <button
                  className="hidden lg:flex relative w-11 h-11 rounded-xl border-[1.5px] border-gray-200 bg-gray-50 items-center justify-center text-gray-700 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-[18px] h-[18px]" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white animate-pulse" />
                </button>

                {/* Account — desktop */}
                {user ? (
                  <div className="hidden lg:flex items-center gap-1.5">
                    <Link
                      href={routes.userDetails}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl border-[1.5px] border-gray-200 bg-gray-50 text-gray-700 font-semibold text-sm hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-[11px] font-extrabold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{user.name.split(" ")[0]}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-11 h-11 rounded-xl border-[1.5px] border-gray-200 bg-gray-50 flex items-center justify-center text-red-500 hover:border-red-300 hover:bg-red-50 transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Link
                    href={routes.auth}
                    className="hidden lg:flex items-center gap-1.5 px-3 py-2.5 rounded-xl border-[1.5px] border-gray-200 bg-gray-50 text-gray-700 font-semibold text-sm hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </Link>
                )}

                {/* Wishlist */}
                <Link
                  href={routes.wishlist}
                  className="relative w-8 h-8 lg:w-11 lg:h-11 rounded-lg lg:rounded-xl border-[1.5px] border-gray-200 bg-gray-50 flex items-center justify-center text-gray-700 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  aria-label="Wishlist"
                  title="Wishlist"
                >
                  <Heart className="w-3.5 h-3.5 lg:w-[18px] lg:h-[18px]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 lg:-top-1.5 lg:-right-1.5 bg-red-500 text-white text-[9px] lg:text-[10px] font-extrabold w-4 h-4 lg:w-5 lg:h-5 rounded-full flex items-center justify-center border-[1.5px] lg:border-2 border-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link
                  href={routes.cart}
                  className="relative w-8 h-8 lg:w-11 lg:h-11 rounded-lg lg:rounded-xl bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center transition-colors"
                  aria-label="Cart"
                  title="Cart"
                >
                  <ShoppingCart className="w-3.5 h-3.5 lg:w-[18px] lg:h-[18px]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 lg:-top-1.5 lg:-right-1.5 bg-[#1A1A2E] text-white text-[9px] lg:text-[10px] font-extrabold w-4 h-4 lg:w-5 lg:h-5 rounded-full flex items-center justify-center border-[1.5px] lg:border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Mobile hamburger */}
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden w-8 h-8 rounded-lg border-[1.5px] border-gray-200 bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors"
                  aria-label="Toggle menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────── Mobile Search (slides below header) ─────────── */}
        {mobileSearchOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 px-3 py-2 sm:px-4 sm:py-3">
            <form
              onSubmit={handleSearchSubmit}
              className={`flex h-10 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden transition-all ${
                searchFocused
                  ? "ring-2 ring-orange-400 bg-white border-2 border-orange-500"
                  : "border-2 border-gray-200 bg-gray-50"
              }`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search products..."
                className="flex-1 px-3 sm:px-4 text-xs sm:text-sm bg-transparent outline-none text-gray-900 placeholder:text-gray-400 min-w-0"
                autoFocus
              />
              <button
                type="submit"
                aria-label="Search"
                className="px-3 sm:px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* ─────────── Nav Strip (desktop only) ─────────── */}
        <div className="hidden lg:block bg-white border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-3 xl:px-5 flex items-center h-10 xl:h-11 gap-0.5 xl:gap-1">
            {navLinks.map(({ label, href, icon: Icon, live }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-1 xl:gap-1.5 px-2 xl:px-3 py-1 xl:py-1.5 rounded-lg text-[11px] xl:text-[13px] whitespace-nowrap transition-all duration-200 ${
                    live
                      ? "font-bold text-red-600 bg-red-50 hover:bg-red-100"
                      : active
                        ? "font-bold text-orange-600 bg-orange-50"
                        : "font-semibold text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  <Icon className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                  {label}
                  {live && (
                    <span className="text-[8px] xl:text-[9px] font-extrabold px-1 xl:px-1.5 py-px bg-red-500 text-white rounded uppercase tracking-wider">
                      Live
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="ml-auto flex items-center gap-2 xl:gap-3">
              <div className="flex items-center gap-1 xl:gap-1.5 text-[10px] xl:text-xs text-gray-500">
                <Star className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">4.9/5</span>
                <span className="text-gray-400 hidden xl:inline">from 28k+ reviews</span>
              </div>
              <span className="text-gray-200">|</span>
              <Link
                href={routes.help}
                className="flex items-center gap-1 xl:gap-1.5 text-[10px] xl:text-xs text-gray-600 hover:text-orange-600 font-semibold transition-colors"
              >
                <Headphones className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                24/7 Support
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────── Mobile Slide-over ─────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div onClick={closeMobileMenu} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl overflow-y-auto">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 bg-[#1A1A2E]">
              <span className="text-white font-extrabold text-base sm:text-lg">
                <span className="text-orange-500">Kamil</span>Store
              </span>
              <button
                onClick={closeMobileMenu}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 sm:p-4">
              {/* Mobile search */}
              <form onSubmit={handleSearchSubmit} className="flex h-10 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50 mb-4 sm:mb-5">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-3 sm:px-4 text-xs sm:text-sm bg-transparent outline-none min-w-0"
                />
                <button type="submit" className="px-3 sm:px-4 bg-orange-600 text-white">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Quick actions grid */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                {[
                  { label: user ? user.name.split(" ")[0] : "Sign In", icon: User, href: user ? routes.userDetails : routes.auth },
                  { label: "Wishlist", icon: Heart, href: routes.wishlist, count: wishlistCount },
                  { label: "Cart", icon: ShoppingCart, href: routes.cart, count: cartCount },
                  { label: "Track", icon: Package, href: routes.track },
                ].map(({ label, icon: Icon, href, count }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMobileMenu}
                    className="relative flex items-center gap-2 px-2.5 py-2.5 sm:px-3 sm:py-3 rounded-lg sm:rounded-xl border-[1.5px] border-gray-200 bg-gray-50 text-gray-700 font-semibold text-xs sm:text-sm hover:border-orange-400 hover:bg-orange-50 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-orange-600" />
                    <span className="truncate">{label}</span>
                    {typeof count === "number" && count > 0 && (
                      <span className="ml-auto bg-orange-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Flash sale CTA */}
              <Link
                href="/flash-sale"
                onClick={closeMobileMenu}
                className="flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm mb-4"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Flash Sale — Live Now
                </span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-white text-red-500 rounded">LIVE</span>
              </Link>

              {/* Main nav */}
              <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[1px] px-1 mb-2">Explore</div>
              <div className="space-y-1 mb-4 sm:mb-5">
                {navLinks.map(({ label, href, icon: Icon, live }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-2.5 sm:gap-3 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                      live
                        ? "text-red-600 hover:bg-red-50"
                        : isActive(href)
                          ? "bg-orange-50 text-orange-600"
                          : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {label}
                    {live && (
                      <span className="ml-auto text-[9px] font-extrabold px-1.5 py-0.5 bg-red-500 text-white rounded uppercase tracking-wider">
                        Live
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Categories (collapsible) */}
              <button
                onClick={() => setMobileShowCategories((s) => !s)}
                className="w-full flex items-center justify-between px-1 mb-2"
              >
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[1px]">Categories</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileShowCategories ? "rotate-180" : ""}`} />
              </button>
              {mobileShowCategories && (
                <div className="space-y-1 mb-4 sm:mb-5">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-2.5 sm:gap-3 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: cat.bg }}>
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: cat.color }} />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 flex-1">{cat.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300" />
                      </Link>
                    );
                  })}
                  <Link
                    href={routes.shop}
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-lg bg-orange-50 text-orange-600 font-bold text-xs sm:text-sm"
                  >
                    View All Products
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Footer inside mobile menu */}
              <div className="pt-3 sm:pt-4 border-t border-gray-100 space-y-2">
                <Link
                  href={routes.sell}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-[#1A1A2E] text-white font-bold text-xs sm:text-sm"
                >
                  <Store className="w-4 h-4" />
                  Sell on KamilStore
                </Link>
                {user && (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-red-50 text-red-600 font-bold text-xs sm:text-sm hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
