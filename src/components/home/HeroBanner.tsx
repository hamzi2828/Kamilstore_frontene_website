"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const banners = [
  {
    id: 1,
    tag: "Marketplace Sale",
    title: "Shop from 1,200+ Verified Sellers",
    subtitle: "Up to 50% off across all stores this season",
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
    accent: "bg-orange-500",
    link: "/deals",
    cta: "Shop Deals",
  },
  {
    id: 2,
    tag: "New Arrivals",
    title: "Fresh Drops Every Week",
    subtitle: "Curated collections from hundreds of sellers worldwide",
    gradient: "from-[#0f0c29] via-[#302b63] to-[#24243e]",
    accent: "bg-violet-500",
    link: "/new-arrivals",
    cta: "Shop New",
  },
  {
    id: 3,
    tag: "Electronics Fair",
    title: "Premium Tech at Best Prices",
    subtitle: "Phones, laptops, gadgets & more from verified sellers",
    gradient: "from-[#0d2137] via-[#0a3d62] to-[#1a535c]",
    accent: "bg-emerald-500",
    link: "/category/electronics",
    cta: "Shop Electronics",
  },
];

const INTERVAL = 5000;

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(Date.now());

  const goTo = useCallback(
    (i: number, dir: "left" | "right") => {
      if (isAnimating || i === current) return;
      setDirection(dir);
      setIsAnimating(true);
      setCurrent(i);
      progressRef.current = 0;
      setProgress(0);
      lastTickRef.current = Date.now();
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating, current]
  );

  const next = useCallback(
    () => goTo((current + 1) % banners.length, "right"),
    [current, goTo]
  );
  const prev = useCallback(
    () => goTo((current - 1 + banners.length) % banners.length, "left"),
    [current, goTo]
  );

  // Progress bar + auto-advance
  useEffect(() => {
    const tick = () => {
      if (!paused) {
        const now = Date.now();
        const delta = now - lastTickRef.current;
        lastTickRef.current = now;
        progressRef.current += delta;
        setProgress(Math.min(progressRef.current / INTERVAL, 1));

        if (progressRef.current >= INTERVAL) {
          progressRef.current = 0;
          setProgress(0);
          next();
        }
      } else {
        lastTickRef.current = Date.now();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, next]);

  // Touch swipe
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStart.current = null;
  };

  const slideClass = (i: number) => {
    if (i === current) return "translate-x-0 opacity-100 z-10 visible";
    if (direction === "right") return "translate-x-full opacity-0 z-0 invisible";
    return "-translate-x-full opacity-0 z-0 invisible";
  };

  return (
    <section className="site-container">
      <div
        className="relative overflow-hidden rounded-2xl h-[280px] sm:h-[340px] md:h-[420px] group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {banners.map((b, i) => (
          <div
            key={b.id}
            className={`absolute inset-0 bg-gradient-to-br ${b.gradient} transition-all duration-700 ease-out ${slideClass(i)}`}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-3xl" />
              <div className="absolute top-1/2 right-[15%] w-48 h-48 border border-white/[0.06] rounded-full -translate-y-1/2 hidden md:block" />
              <div className="absolute top-1/2 right-[15%] w-72 h-72 border border-white/[0.04] rounded-full -translate-y-1/2 hidden md:block" />
              <div className="absolute top-1/2 right-[15%] w-96 h-96 border border-white/[0.02] rounded-full -translate-y-1/2 hidden md:block" />
              {/* Dot grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-6 sm:px-12 md:px-20 lg:px-28">
              <div
                className={`w-full max-w-3xl transition-all duration-700 delay-150 ${
                  i === current
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <span
                  className={`inline-block px-3 py-1 ${b.accent} rounded-md text-xs font-semibold text-white mb-4 tracking-wide uppercase`}
                >
                  {b.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-[1.15] tracking-tight">
                  {b.title}
                </h2>
                <p className="text-sm sm:text-base text-white/50 mb-8 max-w-md leading-relaxed">
                  {b.subtitle}
                </p>
                <Link
                  href={b.link}
                  className="inline-flex items-center gap-2.5 bg-white text-gray-900 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all group/btn shadow-lg shadow-black/10"
                >
                  {b.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom bar: dots + progress */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          {/* Progress bar */}
          <div className="h-[3px] bg-white/10">
            <div
              className="h-full bg-white/40 transition-none"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() =>
                goTo(i, i > current ? "right" : "left")
              }
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-white w-7"
                  : "bg-white/30 w-2 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
