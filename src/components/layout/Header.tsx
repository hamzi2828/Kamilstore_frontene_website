"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
} from "lucide-react";

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Home & Garden", slug: "home-garden" },
  { name: "Sports", slug: "sports" },
  { name: "Beauty", slug: "beauty" },
  { name: "Toys", slug: "toys" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-900 text-gray-300 text-xs">
        <div className="site-container flex justify-between items-center h-9">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>Deliver to: <strong className="text-white">New York</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/vendor/register" className="hover:text-white transition-colors">
              Sell on KamilStore
            </Link>
            <span className="w-px h-3.5 bg-gray-700" />
            <Link href="/help" className="hover:text-white transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="site-container py-3.5">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-orange-500 tracking-tight">
              Kamil<span className="text-gray-800">Store</span>
            </h1>
          </Link>

          {/* Search Bar — Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-1 focus:ring-orange-400/30 transition-all"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <Link
              href="/account"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Account</span>
            </Link>

            <Link
              href="/wishlist"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">Wishlist</span>
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-orange-500 transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <span className="hidden md:inline text-sm font-medium">Cart</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors ml-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar — Mobile */}
        <div className="md:hidden mt-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Navigation — Desktop */}
      <nav className="hidden md:block border-t border-gray-100">
        <div className="site-container">
          <ul className="flex items-center gap-1 h-11 text-sm">
            <li className="relative group">
              <button className="flex items-center gap-1 px-3 h-11 font-medium text-gray-700 hover:text-orange-500 transition-colors">
                All Categories
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-1.5 mt-0">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="block px-4 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </li>

            <span className="w-px h-5 bg-gray-200" />

            <li>
              <Link href="/deals" className="px-3 h-11 flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                Today&apos;s Deals
              </Link>
            </li>
            <li>
              <Link href="/new-arrivals" className="px-3 h-11 flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/vendors" className="px-3 h-11 flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                Our Vendors
              </Link>
            </li>
            <li>
              <Link
                href="/flash-sale"
                className="px-3 h-11 flex items-center text-red-500 font-medium hover:text-red-600 transition-colors"
              >
                Flash Sale
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="site-container py-4">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5 text-gray-400" />
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5 text-gray-400" />
                  Wishlist
                </Link>
              </li>

              <li className="pt-3 mt-3 border-t border-gray-100">
                <span className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Categories
                </span>
                <ul className="mt-2 space-y-0.5">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/category/${category.slug}`}
                        className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="pt-3 mt-3 border-t border-gray-100 space-y-0.5">
                <Link
                  href="/deals"
                  className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Today&apos;s Deals
                </Link>
                <Link
                  href="/vendors"
                  className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Our Vendors
                </Link>
                <Link
                  href="/vendor/register"
                  className="block px-3 py-2 rounded-lg text-orange-500 font-medium hover:bg-orange-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sell on KamilStore
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
