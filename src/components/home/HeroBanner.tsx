"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShoppingBag,
  Users,
  Star,
} from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 50% Off",
    description:
      "Shop the latest trends from top vendors across the marketplace",
    gradient: "from-orange-500 via-rose-500 to-pink-600",
    accentColor: "bg-orange-400",
    link: "/deals",
    tag: "Limited Time",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh Collection",
    description:
      "Discover new products from hundreds of verified sellers worldwide",
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    accentColor: "bg-violet-400",
    link: "/new-arrivals",
    tag: "Just Dropped",
  },
  {
    id: 3,
    title: "Electronics Fair",
    subtitle: "Best Deals",
    description:
      "Premium electronics at unbeatable prices — phones, laptops & more",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    accentColor: "bg-emerald-400",
    link: "/category/electronics",
    tag: "Top Picks",
  },
];

const stats = [
  { icon: ShoppingBag, value: "50K+", label: "Products" },
  { icon: Users, value: "1,200+", label: "Vendors" },
  { icon: Star, value: "4.8", label: "Avg Rating" },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % banners.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + banners.length) % banners.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[420px] sm:h-[460px] md:h-[500px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out bg-gradient-to-br ${banner.gradient} ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${banner.accentColor} opacity-20 blur-3xl`}
              />
              <div
                className={`absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full ${banner.accentColor} opacity-15 blur-3xl`}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            <div className="site-container h-full relative z-10">
              <div className="flex items-center h-full">
                {/* Left — Text content */}
                <div
                  className={`w-full lg:w-3/5 text-white transition-all duration-700 delay-100 ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium mb-5 border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    {banner.tag}
                  </span>

                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 tracking-tight leading-[1.1]">
                    {banner.title}
                  </h2>
                  <p className="text-2xl sm:text-3xl font-light mb-4 text-white/90">
                    {banner.subtitle}
                  </p>
                  <p className="text-base sm:text-lg mb-8 text-white/70 max-w-lg leading-relaxed">
                    {banner.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={banner.link}
                      className="inline-flex items-center gap-2 bg-white text-gray-900 px-7 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition-all hover:gap-3 shadow-lg shadow-black/10"
                    >
                      Shop Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
                    >
                      Browse All
                    </Link>
                  </div>
                </div>

                {/* Right — Marketplace stats (desktop) */}
                <div
                  className={`hidden lg:flex flex-col items-end gap-4 w-2/5 pl-8 transition-all duration-700 delay-200 ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-4 w-56"
                      >
                        <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white leading-none">
                            {stat.value}
                          </p>
                          <p className="text-sm text-white/60 mt-0.5">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/25 backdrop-blur-sm rounded-full text-white transition-all border border-white/10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/25 backdrop-blur-sm rounded-full text-white transition-all border border-white/10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/40 w-2 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
