"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "@/styling/Header.css";
import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronDown,
  Smartphone, Shirt, Home, Dumbbell, Sparkles, Gamepad2,
  Watch, Car, ChevronRight, LayoutGrid, Store, Zap, Tag,
  TrendingUp, Package, MapPin, Headphones, Bell, Globe,
  ArrowRight, Star, Shield,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    icon: Smartphone,
    color: "#3B82F6",
    bg: "#EFF6FF",
    sub: ["Phones", "Laptops", "Audio", "Cameras"],
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
    color: "#EC4899",
    bg: "#FDF2F8",
    sub: ["Men", "Women", "Kids", "Accessories"],
  },
  {
    name: "Home & Garden",
    slug: "home-garden",
    icon: Home,
    color: "#10B981",
    bg: "#ECFDF5",
    sub: ["Furniture", "Decor", "Kitchen", "Garden"],
  },
  {
    name: "Sports",
    slug: "sports",
    icon: Dumbbell,
    color: "#F97316",
    bg: "#FFF7ED",
    sub: ["Fitness", "Outdoors", "Team Sports", "Cycling"],
  },
  {
    name: "Beauty",
    slug: "beauty",
    icon: Sparkles,
    color: "#A855F7",
    bg: "#FAF5FF",
    sub: ["Skincare", "Makeup", "Haircare", "Fragrance"],
  },
  {
    name: "Gaming",
    slug: "gaming",
    icon: Gamepad2,
    color: "#EF4444",
    bg: "#FEF2F2",
    sub: ["Consoles", "PC Games", "Accessories", "VR"],
  },
  {
    name: "Watches",
    slug: "watches",
    icon: Watch,
    color: "#D97706",
    bg: "#FFFBEB",
    sub: ["Smartwatches", "Luxury", "Casual", "Sport"],
  },
  {
    name: "Automotive",
    slug: "automotive",
    icon: Car,
    color: "#6B7280",
    bg: "#F9FAFB",
    sub: ["Parts", "Accessories", "Tools", "Care"],
  },
];

const navLinks = [
  { label: "Today's Deals", href: "/deals", icon: Tag, hot: false },
  { label: "Flash Sale", href: "/flash-sale", icon: Zap, hot: true },
  { label: "Trending", href: "/trending", icon: TrendingUp, hot: false },
  { label: "New Arrivals", href: "/new-arrivals", icon: Sparkles, hot: false },
  { label: "Our Vendors", href: "/vendors", icon: Store, hot: false },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<typeof categories[number] | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
    if (!activeCategory) setActiveCategory(categories[0]);
  };

  const closeMega = () => {
    megaTimeout.current = setTimeout(() => {
      setMegaOpen(false);
      setActiveCategory(null);
    }, 120);
  };

  return (
    <>
      <header className={`ks-header fixed top-0 left-0 right-0 z-50 ${scrolled ? "drop-shadow-md" : ""}`}>

        {/* ── Top Bar ── */}
        <div style={{ background: "#1A1A2E", color: "#9CA3AF", fontSize: 12 }}>
          <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 34 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin style={{ width: 12, height: 12, color: "#FB923C" }} />
              <span>Free shipping on orders over $50 &nbsp;·&nbsp; </span>
              <Shield style={{ width: 12, height: 12, color: "#34D399", marginLeft: 4 }} />
              <span style={{ color: "#34D399" }}>Buyer Protection Guaranteed</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a href="/vendor/register" style={{ color: "#9CA3AF", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#FB923C"}
                onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>
                <Store style={{ width: 12, height: 12 }} />
                Sell on KamilStore
              </a>
              <span style={{ color: "#374151" }}>|</span>
              <a href="/help" style={{ color: "#9CA3AF", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#FB923C"}
                onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>
                <Headphones style={{ width: 12, height: 12 }} />
                Help
              </a>
              <span style={{ color: "#374151" }}>|</span>
              <a href="/track-order" style={{ color: "#9CA3AF", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#FB923C"}
                onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>
                <Package style={{ width: 12, height: 12 }} />
                Track Order
              </a>
              <span style={{ color: "#374151" }}>|</span>
              <a href="/language" style={{ color: "#9CA3AF", textDecoration: "none", display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#FB923C"}
                onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}>
                <Globe style={{ width: 12, height: 12 }} />
                EN / USD
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Header ── */}
        <div style={{ background: "#FFFFFF", borderBottom: "1px solid #F1F5F9" }}>
          <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, height: 72 }}>

              {/* Logo */}
              <a href="/" className="ks-logo" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: 2 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: "#EA6B0E", letterSpacing: "-0.5px", lineHeight: 1 }}>Kamil</span>
                <span style={{ fontSize: 26, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", lineHeight: 1 }}>Store</span>
                <span className="ks-logo-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#EA6B0E", marginLeft: 2, marginBottom: 8, display: "inline-block" }} />
              </a>

              {/* Categories Mega Button */}
              <div style={{ position: "relative", flexShrink: 0 }} ref={megaRef}
                onMouseEnter={openMega} onMouseLeave={closeMega}>
                <button
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 18px",
                    background: megaOpen ? "#EA6B0E" : "#111827",
                    color: "#fff",
                    border: "none", borderRadius: 10,
                    fontWeight: 700, fontSize: 13.5,
                    cursor: "pointer", transition: "background 0.15s",
                    whiteSpace: "nowrap",
                  }}>
                  <LayoutGrid style={{ width: 16, height: 16 }} />
                  All Categories
                  <ChevronDown style={{ width: 14, height: 14, opacity: 0.7, transform: megaOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                </button>

                {/* Mega Menu */}
                {megaOpen && (
                  <div
                    onMouseEnter={openMega} onMouseLeave={closeMega}
                    style={{
                      position: "absolute", top: "calc(100% + 8px)", left: 0,
                      width: 680, background: "#fff",
                      borderRadius: 16,
                      border: "1px solid #F1F5F9",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                      display: "flex", overflow: "hidden",
                      zIndex: 100,
                    }}>
                    {/* Left: category list */}
                    <div style={{ width: 220, background: "#F9FAFB", borderRight: "1px solid #F1F5F9", padding: "8px 0" }}>
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory?.slug === cat.slug;
                        return (
                          <div key={cat.slug}
                            className={`ks-cat-item ${isActive ? "active" : ""}`}
                            onMouseEnter={() => setActiveCategory(cat)}
                            style={{
                              display: "flex", alignItems: "center", gap: 12,
                              padding: "11px 16px", cursor: "pointer",
                              background: isActive ? "#FFF7ED" : "transparent",
                            }}>
                            <div style={{
                              width: 36, height: 36, borderRadius: 9,
                              background: cat.bg,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0,
                            }}>
                              <Icon style={{ width: 18, height: 18, color: cat.color }} />
                            </div>
                            <span style={{ fontSize: 13.5, fontWeight: 600, color: isActive ? "#EA6B0E" : "#374151", flex: 1 }}>
                              {cat.name}
                            </span>
                            <ChevronRight style={{ width: 14, height: 14, color: isActive ? "#EA6B0E" : "#CBD5E1" }} />
                          </div>
                        );
                      })}
                    </div>

                    {/* Right: subcategories */}
                    {activeCategory && (
                      <div style={{ flex: 1, padding: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: activeCategory.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <activeCategory.icon style={{ width: 20, height: 20, color: activeCategory.color }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 16, color: "#111827" }}>{activeCategory.name}</div>
                            <div style={{ fontSize: 12, color: "#9CA3AF" }}>Browse all {activeCategory.name.toLowerCase()}</div>
                          </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                          {activeCategory.sub.map((sub) => (
                            <a key={sub} href={`/category/${activeCategory.slug}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                              style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "10px 14px", borderRadius: 10,
                                background: "#F9FAFB", textDecoration: "none",
                                fontSize: 13, fontWeight: 600, color: "#374151",
                                transition: "background 0.12s, color 0.12s",
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = activeCategory.bg; e.currentTarget.style.color = activeCategory.color; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.color = "#374151"; }}>
                              <ArrowRight style={{ width: 12, height: 12 }} />
                              {sub}
                            </a>
                          ))}
                        </div>
                        <a href={`/category/${activeCategory.slug}`}
                          style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "10px 16px", borderRadius: 10,
                            background: activeCategory.bg, textDecoration: "none",
                            fontSize: 13, fontWeight: 700, color: activeCategory.color,
                            width: "fit-content",
                          }}>
                          View All {activeCategory.name}
                          <ChevronRight style={{ width: 14, height: 14 }} />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="ks-search-glow" style={{
                flex: 1, maxWidth: 640,
                display: "flex", height: 48,
                borderRadius: 12, overflow: "hidden",
                border: searchFocused ? "2px solid #EA6B0E" : "2px solid #E5E7EB",
                background: searchFocused ? "#fff" : "#F9FAFB",
                transition: "border 0.2s, background 0.2s",
              }}>
                <input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  style={{
                    flex: 1, padding: "0 18px", fontSize: 13.5,
                    border: "none", outline: "none",
                    background: "transparent", color: "#111827",
                    fontFamily: "inherit",
                  }}
                />
                <button style={{
                  padding: "0 20px",
                  background: "#EA6B0E", color: "#fff",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                  fontWeight: 700, fontSize: 13,
                  transition: "background 0.15s",
                  fontFamily: "inherit",
                  flexShrink: 0,
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#D45D00"}
                  onMouseLeave={e => e.currentTarget.style.background = "#EA6B0E"}>
                  <Search style={{ width: 17, height: 17 }} />
                  <span style={{ display: "none" /* hide on small */ }}>Search</span>
                </button>
              </div>

              {/* Right Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto", flexShrink: 0 }}>

                {/* Notifications */}
                <button style={{
                  position: "relative", width: 44, height: 44,
                  borderRadius: 10, border: "1.5px solid #E5E7EB",
                  background: "#F9FAFB", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "border 0.15s, background 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#FDBA74"; e.currentTarget.style.background = "#FFF7ED"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = "#F9FAFB"; }}>
                  <Bell style={{ width: 18, height: 18, color: "#6B7280" }} />
                  <span className="ks-badge" style={{
                    position: "absolute", top: 8, right: 8,
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#EF4444", border: "2px solid #fff",
                  }} />
                </button>

                {/* Wishlist */}
                <a href="/wishlist" style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "10px 14px", borderRadius: 10,
                  border: "1.5px solid #E5E7EB", background: "#F9FAFB",
                  textDecoration: "none", color: "#374151",
                  fontWeight: 600, fontSize: 13,
                  transition: "border 0.15s, background 0.15s, color 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#FDBA74"; e.currentTarget.style.background = "#FFF7ED"; e.currentTarget.style.color = "#EA6B0E"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.color = "#374151"; }}>
                  <Heart style={{ width: 17, height: 17 }} />
                  <span>Wishlist</span>
                </a>

                {/* Account */}
                <a href="/account" style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "10px 14px", borderRadius: 10,
                  border: "1.5px solid #E5E7EB", background: "#F9FAFB",
                  textDecoration: "none", color: "#374151",
                  fontWeight: 600, fontSize: 13,
                  transition: "border 0.15s, background 0.15s, color 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#FDBA74"; e.currentTarget.style.background = "#FFF7ED"; e.currentTarget.style.color = "#EA6B0E"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.color = "#374151"; }}>
                  <User style={{ width: 17, height: 17 }} />
                  <span>Sign In</span>
                </a>

                {/* Cart — CTA */}
                <a href="/cart" className="ks-cart-btn" style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 18px", borderRadius: 10,
                  background: "#EA6B0E", color: "#fff",
                  textDecoration: "none", fontWeight: 700, fontSize: 13,
                  position: "relative",
                }}>
                  <ShoppingCart style={{ width: 17, height: 17 }} />
                  Cart
                  <span style={{
                    position: "absolute", top: -6, right: -6,
                    background: "#1A1A2E", color: "#fff",
                    fontSize: 10, fontWeight: 800,
                    width: 20, height: 20, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "2px solid #fff",
                  }}>3</span>
                </a>

                {/* Mobile Hamburger */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  style={{
                    display: "none", // override with CSS below
                    padding: 10, borderRadius: 10,
                    border: "1.5px solid #E5E7EB", background: "#F9FAFB",
                    cursor: "pointer", color: "#374151",
                  }}>
                  {mobileMenuOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
                </button>
              </div>
            </div>

            {/* Mobile Search Row */}
            <div style={{ display: "none", paddingBottom: 12 }} className="ks-mobile-search">
              <div style={{
                display: "flex", height: 44,
                borderRadius: 10, overflow: "hidden",
                border: "2px solid #E5E7EB", background: "#F9FAFB",
              }}>
                <input type="text" placeholder="Search products..."
                  style={{ flex: 1, padding: "0 14px", fontSize: 13, border: "none", outline: "none", background: "transparent", fontFamily: "inherit" }} />
                <button style={{ padding: "0 16px", background: "#EA6B0E", border: "none", color: "#fff", cursor: "pointer" }}>
                  <Search style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Nav Strip ── */}
        <div style={{ background: "#fff", borderBottom: "1px solid #F1F5F9" }}>
          <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 44, gap: 2 }}>
            {navLinks.map(({ label, href, icon: Icon, hot }) => (
              <a key={href} href={href} className="ks-nav-link"
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 12px", borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 13, fontWeight: hot ? 700 : 600,
                  color: hot ? "#EF4444" : "#4B5563",
                  background: hot ? "#FEF2F2" : "transparent",
                  whiteSpace: "nowrap",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={e => {
                  if (!hot) { e.currentTarget.style.color = "#EA6B0E"; e.currentTarget.style.background = "#FFF7ED"; }
                }}
                onMouseLeave={e => {
                  if (!hot) { e.currentTarget.style.color = "#4B5563"; e.currentTarget.style.background = "transparent"; }
                }}>
                <Icon style={{ width: 14, height: 14 }} />
                {label}
                {hot && (
                  <span style={{
                    fontSize: 9, fontWeight: 800, padding: "1px 5px",
                    background: "#EF4444", color: "#fff", borderRadius: 4,
                    textTransform: "uppercase", letterSpacing: 0.5,
                  }}>LIVE</span>
                )}
              </a>
            ))}

            {/* Promo banner in nav */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <Star style={{ width: 13, height: 13, color: "#F59E0B", fill: "#F59E0B" }} />
              <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>4.9/5 from 28k reviews</span>
              <span style={{ color: "#E5E7EB", margin: "0 4px" }}>|</span>
              <a href="/help" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "#6B7280", textDecoration: "none", fontWeight: 500, transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#EA6B0E"}
                onMouseLeave={e => e.currentTarget.style.color = "#6B7280"}>
                <Headphones style={{ width: 13, height: 13 }} />
                24/7 Support
              </a>
            </div>
          </div>
        </div>

        {/* ── Mobile Slide-over ── */}
        {mobileMenuOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
            <div onClick={() => setMobileMenuOpen(false)}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }} />
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: "85%", maxWidth: 360, height: "100%",
              background: "#fff", boxShadow: "-20px 0 60px rgba(0,0,0,0.15)",
              overflowY: "auto",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #F1F5F9", background: "#1A1A2E" }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>
                  <span style={{ color: "#EA6B0E" }}>Kamil</span>Store
                </span>
                <button onClick={() => setMobileMenuOpen(false)}
                  style={{ padding: 8, borderRadius: 8, background: "#374151", border: "none", cursor: "pointer", color: "#9CA3AF" }}>
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>

              <div style={{ padding: 16 }}>
                {/* Quick Actions */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                  {[
                    { label: "Sign In", icon: User, href: "/account" },
                    { label: "Wishlist", icon: Heart, href: "/wishlist" },
                    { label: "Cart (3)", icon: ShoppingCart, href: "/cart" },
                    { label: "Track Order", icon: Package, href: "/track-order" },
                  ].map(({ label, icon: Icon, href }) => (
                    <a key={href} href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "12px 14px", borderRadius: 10,
                        border: "1.5px solid #F1F5F9", background: "#F9FAFB",
                        textDecoration: "none", color: "#374151",
                        fontWeight: 600, fontSize: 13,
                      }}>
                      <Icon style={{ width: 16, height: 16, color: "#EA6B0E" }} />
                      {label}
                    </a>
                  ))}
                </div>

                {/* Flash Sale CTA */}
                <a href="/flash-sale" onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 16px", borderRadius: 12, marginBottom: 20,
                    background: "linear-gradient(135deg, #EF4444, #F97316)",
                    textDecoration: "none",
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff" }}>
                    <Zap style={{ width: 18, height: 18 }} />
                    <span style={{ fontWeight: 800, fontSize: 14 }}>Flash Sale — Live Now</span>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 6px", background: "#fff", color: "#EF4444", borderRadius: 4 }}>LIVE</span>
                </a>

                {/* Categories */}
                <div style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 1, padding: "0 4px" }}>Categories</span>
                </div>
                <div style={{ marginBottom: 20 }}>
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <a key={cat.slug} href={`/category/${cat.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "10px 8px", borderRadius: 10,
                          textDecoration: "none", color: "#374151",
                          transition: "background 0.12s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#FFF7ED"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon style={{ width: 18, height: 18, color: cat.color }} />
                        </div>
                        <span style={{ fontSize: 13.5, fontWeight: 600, flex: 1 }}>{cat.name}</span>
                        <ChevronRight style={{ width: 14, height: 14, color: "#CBD5E1" }} />
                      </a>
                    );
                  })}
                </div>

                {/* Sell CTA */}
                <a href="/vendor/register" onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "14px 20px", borderRadius: 12,
                    background: "#1A1A2E", color: "#fff", textDecoration: "none",
                    fontWeight: 700, fontSize: 14,
                  }}>
                  <Store style={{ width: 16, height: 16 }} />
                  Sell on KamilStore
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}