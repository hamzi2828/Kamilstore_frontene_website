"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Shirt, Sparkles, type LucideIcon } from "@/components/icons";
import "@/styling/PromoBanner.css";
import { useBanners } from "../hooks/useBanners";
import type { Banner } from "../types";
import { useLanguage } from "@/lib/i18n";

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

type FallbackPromo = {
  href: string;
  image: string;
  eyebrowKey: string;
  titleKey: string;
  subtitleKey: string;
  icon: LucideIcon;
  gradient: string;
  badgeKey: string;
  badgeClass: string;
};

const fallbackPromos: FallbackPromo[] = [
  {
    href: "/category/electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=500&fit=crop&q=80",
    eyebrowKey: "home.categories.electronics",
    titleKey: "home.promo.gadgetsTitle",
    subtitleKey: "home.promo.gadgetsSubtitle",
    icon: Cpu,
    gradient: "ks-promo-grad-blue",
    badgeKey: "home.promo.gadgetsBadge",
    badgeClass: "ks-promo-badge-blue",
  },
  {
    href: "/category/fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop&q=80",
    eyebrowKey: "home.categories.fashion",
    titleKey: "home.promo.springTitle",
    subtitleKey: "home.promo.springSubtitle",
    icon: Shirt,
    gradient: "ks-promo-grad-rose",
    badgeKey: "home.promo.springBadge",
    badgeClass: "ks-promo-badge-rose",
  },
];

const styleVariants: Array<Pick<Promo, "gradient" | "badgeClass" | "icon">> = [
  { gradient: "ks-promo-grad-blue", badgeClass: "ks-promo-badge-blue", icon: Cpu },
  { gradient: "ks-promo-grad-rose", badgeClass: "ks-promo-badge-rose", icon: Shirt },
  { gradient: "ks-promo-grad-blue", badgeClass: "ks-promo-badge-blue", icon: Sparkles },
];

const toPromo = (
  b: Banner,
  index: number,
  t: (key: string, vars?: Record<string, string | number>) => string
): Promo => {
  const variant = styleVariants[index % styleVariants.length];
  return {
    href: b.link || "/",
    image: b.image,
    eyebrow: b.eyebrow || t("home.promo.defaultEyebrow"),
    title: b.title,
    subtitle: b.subtitle || "",
    icon: variant.icon,
    gradient: variant.gradient,
    badge: b.badge || t("home.promo.defaultBadge"),
    badgeClass: variant.badgeClass,
  };
};

export default function PromoBanner() {
  const { t } = useLanguage();
  const { banners } = useBanners("promo");

  const promos = useMemo<Promo[]>(() => {
    if (banners.length === 0)
      return fallbackPromos.map((p) => ({
        href: p.href,
        image: p.image,
        eyebrow: t(p.eyebrowKey),
        title: t(p.titleKey),
        subtitle: t(p.subtitleKey),
        icon: p.icon,
        gradient: p.gradient,
        badge: t(p.badgeKey),
        badgeClass: p.badgeClass,
      }));
    return banners.map((b, i) => toPromo(b, i, t));
  }, [banners, t]);

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
                    {t("common.shopNow")}
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
