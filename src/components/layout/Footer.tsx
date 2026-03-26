import Link from "next/link";
import "@/styling/Footer.css";
import {
  Facebook, Twitter, Instagram, Youtube,
  Mail, Phone, MapPin, Store, Shield,
  Package, ChevronRight, Headphones, CreditCard,
} from "lucide-react";

const footerLinks = {
  company: {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/vendors", label: "Our Vendors" },
      { href: "/vendor/register", label: "Become a Seller" },
      { href: "/buyer-protection", label: "Buyer Protection" },
      { href: "/careers", label: "Careers" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/shipping", label: "Shipping Info" },
      { href: "/returns", label: "Returns & Refunds" },
      { href: "/track-order", label: "Track Order" },
      { href: "/faq", label: "FAQs" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/sitemap", label: "Sitemap" },
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
  { icon: Shield, label: "Buyer Protection" },
  { icon: Package, label: "Free Returns" },
  { icon: Headphones, label: "24/7 Support" },
  { icon: CreditCard, label: "Secure Payments" },
];

export default function Footer() {
  return (
    <>
      <footer className="ks-footer">
        <div className="ks-footer-accent" />
        <div className="ks-footer-texture" />
        <div className="ks-footer-glow" />

        {/* Trust strip */}
        <div className="ks-trust-strip">
          <div className="ks-trust-inner">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="ks-trust-badge">
                <Icon style={{ width: 14, height: 14, color: "#EA6B0E" }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="ks-footer-main">

          {/* Brand column */}
          <div className="ks-footer-brand">
            <a href="/" className="ks-footer-logo">
              <span className="ks-footer-logo-k">Kamil</span>
              <span className="ks-footer-logo-s">Store</span>
              <span className="ks-footer-logo-dot" />
            </a>
            <p className="ks-footer-tagline">
              Your trusted multi-vendor marketplace — 1,200+ verified sellers, zero compromise on quality.
            </p>

            {/* Stats */}
            <div className="ks-footer-stats">
              <div className="ks-footer-stat">
                <div className="ks-footer-stat-num">1,<span>200</span>+</div>
                <div className="ks-footer-stat-label">Verified Sellers</div>
              </div>
              <div className="ks-footer-stat">
                <div className="ks-footer-stat-num"><span>500</span>K+</div>
                <div className="ks-footer-stat-label">Happy Buyers</div>
              </div>
              <div className="ks-footer-stat">
                <div className="ks-footer-stat-num"><span>4.9</span>/5</div>
                <div className="ks-footer-stat-label">Avg. Rating</div>
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
          {Object.values(footerLinks).map(({ title, links }) => (
            <div key={title}>
              <div className="ks-footer-col-title">{title}</div>
              <ul className="ks-footer-links">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="ks-footer-link">
                      <ChevronRight style={{ width: 12, height: 12 }} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Sell CTA under Company column */}
              {title === "Company" && (
                <a href="/vendor/register" className="ks-footer-sell">
                  <Store style={{ width: 14, height: 14 }} />
                  Start selling today →
                </a>
              )}

              {/* Contact under Support column */}
              {title === "Support" && (
                <div style={{ marginTop: 20 }}>
                  <div className="ks-footer-col-title" style={{ marginBottom: 12 }}>Contact</div>
                  {[
                    { Icon: MapPin, text: "123 Commerce Street, NY 10001" },
                    { Icon: Phone, text: "+1 (555) 123-4567" },
                    { Icon: Mail, text: "support@kamilstore.com" },
                  ].map(({ Icon, text }) => (
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
              © {new Date().getFullYear()} <a href="/">KamilStore</a>. All rights reserved.
            </p>
            <div className="ks-footer-legal">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/cookies">Cookies</Link>
              <Link href="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}