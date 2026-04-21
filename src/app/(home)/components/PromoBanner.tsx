"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Shirt, Sparkles, type LucideIcon } from "lucide-react";
import "@/styling/PromoBanner.css";
import { useBanners } from "../hooks/useBanners";
import type { Banner } from "../types";

type Promo = {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  badge: string;
  badgeClass: string;
};

const fallbackPromos: Promo[] = [
  {
    href: "/category/electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=500&fit=crop&q=80",
    eyebrow: "Electronics",
    title: "Latest Gadgets",
    subtitle: "Up to 40% off from verified sellers",
    icon: Cpu,
    gradient: "ks-promo-grad-blue",
    badge: "40% OFF",
    badgeClass: "ks-promo-badge-blue",
  },
  {
    href: "/category/fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop&q=80",
    eyebrow: "Fashion",
    title: "Spring Collection",
    subtitle: "New arrivals from top fashion vendors",
    icon: Shirt,
    gradient: "ks-promo-grad-rose",
    badge: "NEW",
    badgeClass: "ks-promo-badge-rose",
  },
];

const styleVariants: Array<Pick<Promo, "gradient" | "badgeClass" | "icon">> = [
  { gradient: "ks-promo-grad-blue", badgeClass: "ks-promo-badge-blue", icon: Cpu },
  { gradient: "ks-promo-grad-rose", badgeClass: "ks-promo-badge-rose", icon: Shirt },
  { gradient: "ks-promo-grad-blue", badgeClass: "ks-promo-badge-blue", icon: Sparkles },
];

const toPromo = (b: Banner, index: number): Promo => {
  const variant = styleVariants[index % styleVariants.length];
  return {
    href: b.link || "/",
    image: b.image,
    eyebrow: b.eyebrow || "Featured",
    title: b.title,
    subtitle: b.subtitle || "",
    icon: variant.icon,
    gradient: variant.gradient,
    badge: b.badge || "SHOP",
    badgeClass: variant.badgeClass,
  };
};

export default function PromoBanner() {
  const { banners } = useBanners("promo");

  const promos = useMemo<Promo[]>(() => {
    if (banners.length === 0) return fallbackPromos;
    return banners.map(toPromo);
  }, [banners]);

  return (
    <section className="site-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promos.map((p, idx) => {
          const Icon = p.icon;
          return (
            <Link key={`${p.href}-${idx}`} href={p.href} className="group">
              <div className={`ks-promo-card ${p.gradient}`}>
                <div className="ks-promo-img">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="ks-promo-overlay" />

                <div className="ks-promo-decor">
                  <div className="ks-promo-circle-1" />
                  <div className="ks-promo-circle-2" />
                  <div className="ks-promo-dots" />
                </div>

                <div className="ks-promo-content">
                  <div className="ks-promo-top">
                    <span className="ks-promo-eyebrow">
                      <Icon className="ks-promo-eyebrow-icon" />
                      {p.eyebrow}
                    </span>
                    <span className={`ks-promo-badge ${p.badgeClass}`}>
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="ks-promo-title">{p.title}</h3>
                  <p className="ks-promo-sub">{p.subtitle}</p>

                  <span className="ks-promo-cta">
                    Shop Now
                    <ArrowRight className="ks-promo-cta-icon" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
