"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";

const flashProducts = [
  {
    _id: "1",
    name: "Wireless Bluetooth Headphones with Noise Cancellation",
    slug: "wireless-bluetooth-headphones",
    images: ["/products/headphones.jpg"],
    sellingPrice: 199.99,
    discountPrice: 99.99,
    rating: 4.5,
    reviewCount: 128,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "2",
    name: "Smart Watch Series 5 - Fitness Tracker",
    slug: "smart-watch-series-5",
    images: ["/products/smartwatch.jpg"],
    sellingPrice: 299.99,
    discountPrice: 149.99,
    rating: 4.8,
    reviewCount: 256,
    vendor: { name: "GadgetHub", slug: "gadgethub" },
  },
  {
    _id: "3",
    name: "Premium Leather Backpack - Waterproof",
    slug: "premium-leather-backpack",
    images: ["/products/backpack.jpg"],
    sellingPrice: 129.99,
    discountPrice: 79.99,
    rating: 4.3,
    reviewCount: 89,
    vendor: { name: "FashionPlus", slug: "fashionplus" },
  },
  {
    _id: "4",
    name: "Portable Power Bank 20000mAh Fast Charging",
    slug: "portable-power-bank",
    images: ["/products/powerbank.jpg"],
    sellingPrice: 59.99,
    discountPrice: 34.99,
    rating: 4.6,
    reviewCount: 312,
    vendor: { name: "TechZone", slug: "techzone" },
  },
];

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 23,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-14">
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2.5 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg shadow-red-500/25">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Flash Deals
              </h2>
              <p className="text-gray-500 text-sm">
                Grab them before they&apos;re gone
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-medium">Ends in</span>
            <div className="flex items-center gap-1.5">
              <div className="bg-gray-900 text-white w-14 py-2 rounded-lg text-center">
                <span className="text-lg font-bold font-mono">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[10px] block text-gray-400 uppercase tracking-wider">
                  hrs
                </span>
              </div>
              <span className="text-xl font-bold text-gray-300">:</span>
              <div className="bg-gray-900 text-white w-14 py-2 rounded-lg text-center">
                <span className="text-lg font-bold font-mono">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[10px] block text-gray-400 uppercase tracking-wider">
                  min
                </span>
              </div>
              <span className="text-xl font-bold text-gray-300">:</span>
              <div className="bg-gray-900 text-white w-14 py-2 rounded-lg text-center">
                <span className="text-lg font-bold font-mono">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[10px] block text-gray-400 uppercase tracking-wider">
                  sec
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/flash-sale"
            className="hidden sm:inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            View All Deals
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {flashProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/flash-sale"
            className="inline-flex items-center gap-1.5 text-orange-500 font-medium"
          >
            View All Deals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
