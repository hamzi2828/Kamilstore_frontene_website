"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBanners } from "../hooks/useBanners";

type Slide = { id: string; src: string; alt: string; link: string };

const fallbackSlides: Slide[] = [
  { id: "f1", src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1440&h=460&fit=crop&q=80", alt: "Marketplace Sale - Up to 50% off", link: "/deals" },
  { id: "f2", src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1440&h=460&fit=crop&q=80", alt: "New Fashion Arrivals", link: "/products?newArrivals=1" },
  { id: "f3", src: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1440&h=460&fit=crop&q=80", alt: "Premium Electronics", link: "/category/electronics" },
];

const INTERVAL = 3000;

export default function HeroBanner() {
  const { banners } = useBanners("hero");

  const slides = useMemo<Slide[]>(() => {
    if (banners.length === 0) return fallbackSlides;
    return banners.map((b) => ({
      id: b._id,
      src: b.image,
      alt: b.title,
      link: b.link || "/",
    }));
  }, [banners]);

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef(Date.now());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCurrent(0);
    progressRef.current = 0;
    setProgress(0);
  }, [slides]);

  const goTo = useCallback(
    (i: number) => {
      if (isAnimating || i === current) return;
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
    () => goTo((current + 1) % slides.length),
    [current, goTo, slides.length]
  );
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo, slides.length]
  );

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchX.current = null;
  };

  return (
    <section className="site-container">
      <div
        className="relative overflow-hidden rounded-2xl h-[200px] sm:h-[300px] md:h-[400px] lg:h-[460px] group bg-gray-100"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => (
          <a
            key={slide.id}
            href={slide.link}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              i === current
                ? "opacity-100 z-10 scale-100"
                : "opacity-0 z-0 scale-105"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 1440px"
            />
          </a>
        ))}

        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent z-[11] pointer-events-none" />

        <button
          onClick={prev}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full text-gray-800 shadow-lg shadow-black/10 transition-all opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full text-gray-800 shadow-lg shadow-black/10 transition-all opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <span className="text-white/60 text-[11px] font-semibold tabular-nums font-mono hidden sm:block">
            {String(current + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-7 bg-white shadow-sm shadow-white/30"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-white/15">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-r shadow-[0_0_8px_rgba(234,107,14,0.4)]"
            style={{ width: `${progress * 100}%`, transition: "none" }}
          />
        </div>
      </div>
    </section>
  );
}
