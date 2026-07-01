"use client";

import Link from "next/link";
import "@/styling/Footer.css";
import {
  Facebook, Twitter, Instagram, Youtube,
  Mail, Phone, MapPin, Store, Shield,
  Package, ChevronRight, Headphones, CreditCard,
} from "@/components/icons";
import { useLanguage } from "@/lib/i18n";

const footerLinks = {
  company: {
    titleKey: "footer.company",
    links: [
      { href: "/about", labelKey: "footer.aboutUs" },
      { href: "/vendors", labelKey: "footer.ourVendors" },
      { href: "/vendor/register", labelKey: "footer.becomeSeller" },
      { href: "/buyer-protection", labelKey: "footer.buyerProtection" },
      { href: "/careers", labelKey: "footer.careers" },
    ],
  },
  support: {
    titleKey: "footer.support",
    links: [
      { href: "/help", labelKey: "footer.helpCenter" },
      { href: "/shipping", labelKey: "footer.shippingInfo" },
      { href: "/returns", labelKey: "footer.returns" },
      { href: "/track-order", labelKey: "header.trackOrder" },
      { href: "/faq", labelKey: "footer.faqs" },
    ],
  },
  legal: {
    titleKey: "footer.legal",
    links: [
      { href: "/privacy", labelKey: "footer.privacyPolicy" },
      { href: "/terms", labelKey: "footer.termsOfService" },
      { href: "/cookies", labelKey: "footer.cookiePolicy" },
      { href: "/sitemap", labelKey: "footer.sitemap" },
    ],
  },
};

const socials = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

const trustBadges = [
  { icon: Shield, labelKey: "footer.buyerProtection" },
  { icon: Package, labelKey: "footer.freeReturns" },
  { icon: Headphones, labelKey: "header.support247" },
  { icon: CreditCard, labelKey: "footer.securePayments" },
];

const contactInfo = [
  { Icon: MapPin, text: "123 Commerce Street, NY 10001" },
  { Icon: Phone, text: "+1 (555) 123-4567" },
  { Icon: Mail, text: "support@kamilstore.com" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <>
      <footer className="ks-footer">
        <div className="ks-footer-accent" />
        <div className="ks-footer-texture" />
        <div className="ks-footer-glow" />

        {/* Trust strip */}
        <div className="ks-trust-strip">
          <div className="ks-trust-inner">
            {trustBadges.map(({ icon: Icon, labelKey }) => (
              <div key={labelKey} className="ks-trust-badge">
                <Icon style={{ width: 14, height: 14, color: "#EA6B0E" }} />
                {t(labelKey)}
              </div>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="ks-footer-main">

          {/* Brand column */}
          <div className="ks-footer-brand">
            <a href="/" className="ks-footer-logo">
              <span className="ks-footer-logo-k">world</span>
              <span className="ks-footer-logo-s">B2B</span>
              <span className="ks-footer-logo-dot" />
            </a>
            <p className="ks-footer-tagline">
              {t("footer.tagline")}
            </p>

            {/* Stats */}
            <div className="ks-footer-stats">
              <div className="ks-footer-stat">
                <div className="ks-footer-stat-num">1,<span>200</span>+</div>
                <div className="ks-footer-stat-label">{t("footer.verifiedSellers")}</div>
              </div>
              <div className="ks-footer-stat">
                <div className="ks-footer-stat-num"><span>500</span>K+</div>
                <div className="ks-footer-stat-label">{t("footer.happyBuyers")}</div>
              </div>
              <div className="ks-footer-stat">
                <div className="ks-footer-stat-num"><span>4.9</span>/5</div>
                <div className="ks-footer-stat-label">{t("footer.avgRating")}</div>
              </div>
            </div>

            {/* Socials */}
            <div className="ks-footer-socials">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="ks-footer-social">
                  <Icon style={{ width: 15, height: 15 }} />
                </a>
              ))}
            </div>

            {/* Payments */}
            <div className="ks-payment-icons">
              {["Visa", "Mastercard", "PayPal", "Stripe", "Amex"].map(p => (
                <span key={p} className="ks-payment-pill">{p}</span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map(({ titleKey, links }) => (
            <div key={titleKey}>
              <div className="ks-footer-col-title">{t(titleKey)}</div>
              <ul className="ks-footer-links">
                {links.map(({ href, labelKey }) => (
                  <li key={href}>
                    <Link href={href} className="ks-footer-link">
                      <ChevronRight style={{ width: 12, height: 12 }} />
                      {t(labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Sell CTA under Company column */}
              {titleKey === "footer.company" && (
                <a href="/vendor/register" className="ks-footer-sell">
                  <Store style={{ width: 14, height: 14 }} />
                  {t("footer.startSelling")}
                </a>
              )}

              {/* Contact under Support column */}
              {titleKey === "footer.support" && (
                <div style={{ marginTop: 20 }}>
                  <div className="ks-footer-col-title" style={{ marginBottom: 12 }}>{t("footer.contact")}</div>
                  {contactInfo.map(({ Icon, text }) => (
                    <div key={text} className="ks-contact-item">
                      <div className="ks-contact-icon">
                        <Icon style={{ width: 13, height: 13, color: "#EA6B0E" }} />
                      </div>
                      <span className="ks-contact-text">{text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="ks-footer-bottom">
          <div className="ks-footer-bottom-inner">
            <p className="ks-footer-copy">
              © {new Date().getFullYear()} <a href="/">worldB2B</a>. {t("footer.copyright")}
            </p>
            <div className="ks-footer-legal">
              <Link href="/privacy">{t("footer.privacyShort")}</Link>
              <Link href="/terms">{t("footer.termsShort")}</Link>
              <Link href="/cookies">{t("footer.cookiesShort")}</Link>
              <Link href="/sitemap">{t("footer.sitemapShort")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
