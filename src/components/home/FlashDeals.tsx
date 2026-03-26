"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ChevronRight, Flame, Clock, TrendingUp, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import "@/styling/FlashDeals.css";

const flashProducts = [
  {
    _id: "1",
    name: "Wireless Bluetooth Headphones with Noise Cancellation",
    slug: "wireless-bluetooth-headphones",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"],
    sellingPrice: 199.99,
    discountPrice: 99.99,
    rating: 4.5,
    reviewCount: 128,
    vendor: { name: "TechZone", slug: "techzone" },
    sold: 76,
    total: 100,
  },
  {
    _id: "2",
    name: "Smart Watch Series 5 - Fitness Tracker",
    slug: "smart-watch-series-5",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"],
    sellingPrice: 299.99,
    discountPrice: 149.99,
    rating: 4.8,
    reviewCount: 256,
    vendor: { name: "GadgetHub", slug: "gadgethub" },
    sold: 89,
    total: 100,
  },
  {
    _id: "3",
    name: "Premium Leather Backpack - Waterproof",
    slug: "premium-leather-backpack",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"],
    sellingPrice: 129.99,
    discountPrice: 79.99,
    rating: 4.3,
    reviewCount: 89,
    vendor: { name: "FashionPlus", slug: "fashionplus" },
    sold: 45,
    total: 100,
  },
  {
    _id: "4",
    name: "Portable Power Bank 20000mAh Fast Charging",
    slug: "portable-power-bank",
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop"],
    sellingPrice: 59.99,
    discountPrice: 34.99,
    rating: 4.6,
    reviewCount: 312,
    vendor: { name: "TechZone", slug: "techzone" },
    sold: 92,
    total: 100,
  },
];

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 23,
    seconds: 45,
  });

  useEffect(() => {
    const t = setInterval(() => {
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
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const timerUnits = [
    { value: pad(timeLeft.hours), label: "Hours" },
    { value: pad(timeLeft.minutes), label: "Min" },
    { value: pad(timeLeft.seconds), label: "Sec" },
  ];

  return (
    <section className="site-container">
      <div className="ks-flash-wrap">
        {/* ── Top accent bar ── */}
        <div className="ks-flash-accent-bar" />

        {/* ── Header ── */}
        <div className="ks-flash-header">
          <div className="ks-flash-header-inner">
            {/* Left: Title area */}
            <div className="ks-flash-title-area">
              <div className="ks-flash-icon">
                <Zap className="ks-flash-icon-svg" />
                <div className="ks-flash-icon-pulse" />
                <div className="ks-flash-icon-pulse ks-flash-icon-pulse-2" />
              </div>

              <div className="ks-flash-title-text">
                <div className="ks-flash-title-row">
                  <h2 className="ks-flash-title">Flash Deals</h2>
                  <span className="ks-flash-live-badge">
                    <span className="ks-flash-live-dot" />
                    LIVE
                  </span>
                </div>
                <p className="ks-flash-subtitle">
                  Grab before they&apos;re gone
                </p>
              </div>
            </div>

            {/* Center: Timer */}
            <div className="ks-flash-timer-area">
              <div className="ks-flash-timer-label">
                <Clock className="ks-flash-timer-label-icon" />
                <span>Ends in</span>
              </div>
              <div className="ks-flash-timer">
                {timerUnits.map((unit, i) => (
                  <div key={i} className="ks-flash-timer-group">
                    {i > 0 && (
                      <div className="ks-flash-timer-sep">
                        <span />
                        <span />
                      </div>
                    )}
                    <div className="ks-flash-timer-card">
                      <div className="ks-flash-timer-card-inner">
                        <span className="ks-flash-timer-digit">
                          {unit.value}
                        </span>
                      </div>
                      <span className="ks-flash-timer-unit">{unit.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: View all link */}
            <Link href="/flash-sale" className="ks-flash-viewall">
              <span>View All Deals</span>
              <ArrowRight className="ks-flash-viewall-icon" />
            </Link>
          </div>
        </div>

        {/* ── Products Grid ── */}
        <div className="ks-flash-grid-area">
          <div className="ks-flash-grid">
            {flashProducts.map((p) => {
              const pct = Math.round((p.sold / p.total) * 100);
              const isHot = pct >= 80;
              return (
                <div key={p._id} className="ks-flash-product">
                  <ProductCard product={p} />

                  {/* Sold progress */}
                  <div className="ks-flash-sold-section">
                    <div className="ks-flash-sold-track">
                      <div
                        className={`ks-flash-sold-bar ${isHot ? "ks-flash-sold-bar-hot" : ""}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="ks-flash-sold-info">
                      <span className="ks-flash-sold-text">
                        <TrendingUp className="ks-flash-sold-icon" />
                        {p.sold} sold
                      </span>
                      {isHot && (
                        <span className="ks-flash-hot-badge">
                          <Flame className="ks-flash-hot-icon" />
                          Almost gone!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom banner ── */}
        <div className="ks-flash-bottom">
          <div className="ks-flash-bottom-inner">
            <div className="ks-flash-bottom-info">
              <Zap className="ks-flash-bottom-icon" />
              <span>New flash deals added every <strong>6 hours</strong></span>
            </div>
            <Link href="/flash-sale" className="ks-flash-bottom-link">
              Browse all flash deals
              <ChevronRight className="ks-flash-bottom-link-icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
