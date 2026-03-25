import Link from "next/link";
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .ks-footer * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

        .ks-footer {
          background: #111827;
          color: #6B7280;
          position: relative;
          overflow: hidden;
        }

        /* Subtle top accent line */
        .ks-footer-accent {
          height: 3px;
          background: linear-gradient(90deg, transparent, #EA6B0E 30%, #FB923C 50%, #EA6B0E 70%, transparent);
        }

        /* Background texture */
        .ks-footer-texture {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .ks-footer-glow {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(234,107,14,0.06) 0%, transparent 70%);
          bottom: -200px; right: -100px;
          pointer-events: none;
        }

        /* Trust strip */
        .ks-trust-strip {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 20px 0;
        }
        .ks-trust-inner {
          max-width: 1380px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .ks-trust-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 40px;
          font-size: 12.5px;
          font-weight: 600;
          color: #9CA3AF;
          white-space: nowrap;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .ks-trust-badge:hover {
          border-color: rgba(234,107,14,0.4);
          color: #FB923C;
          background: rgba(234,107,14,0.06);
        }

        /* Main grid */
        .ks-footer-main {
          max-width: 1380px;
          margin: 0 auto;
          padding: 56px 24px 48px;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 40px;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 1024px) {
          .ks-footer-main { grid-template-columns: 1fr 1fr; gap: 36px 40px; }
        }
        @media (max-width: 640px) {
          .ks-footer-main { grid-template-columns: 1fr; gap: 32px; padding: 40px 20px 36px; }
        }

        /* Brand column */
        .ks-footer-brand {}
        .ks-footer-logo {
          display: flex;
          align-items: baseline;
          gap: 1px;
          text-decoration: none;
          margin-bottom: 14px;
        }
        .ks-footer-logo-k { font-size: 24px; font-weight: 800; color: #EA6B0E; letter-spacing: -0.5px; }
        .ks-footer-logo-s { font-size: 24px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
        .ks-footer-logo-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #EA6B0E; margin-left: 2px; margin-bottom: 6px;
        }
        .ks-footer-tagline {
          font-size: 13.5px;
          line-height: 1.65;
          color: #6B7280;
          margin-bottom: 20px;
          max-width: 240px;
        }

        /* Stats row */
        .ks-footer-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 24px;
        }
        .ks-footer-stat {}
        .ks-footer-stat-num {
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }
        .ks-footer-stat-num span { color: #EA6B0E; }
        .ks-footer-stat-label {
          font-size: 11px;
          color: #6B7280;
          margin-top: 2px;
          font-weight: 500;
        }

        /* Socials */
        .ks-footer-socials { display: flex; gap: 8px; }
        .ks-footer-social {
          width: 36px; height: 36px;
          border-radius: 9px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.09);
          display: flex; align-items: center; justify-content: center;
          color: #6B7280;
          text-decoration: none;
          transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s;
        }
        .ks-footer-social:hover {
          background: #EA6B0E;
          border-color: #EA6B0E;
          color: #fff;
          transform: translateY(-2px);
        }

        /* Link columns */
        .ks-footer-col-title {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ks-footer-col-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .ks-footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px; }
        .ks-footer-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 8px;
          border-radius: 7px;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          color: #6B7280;
          transition: color 0.15s, background 0.15s, padding-left 0.15s;
        }
        .ks-footer-link:hover {
          color: #FB923C;
          background: rgba(234,107,14,0.08);
          padding-left: 12px;
        }
        .ks-footer-link svg { opacity: 0; transition: opacity 0.15s; flex-shrink: 0; }
        .ks-footer-link:hover svg { opacity: 1; }

        /* Contact items */
        .ks-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px;
          border-radius: 10px;
          margin-bottom: 4px;
          transition: background 0.15s;
          cursor: default;
        }
        .ks-contact-item:hover { background: rgba(255,255,255,0.04); }
        .ks-contact-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(234,107,14,0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .ks-contact-text { font-size: 13px; color: #9CA3AF; line-height: 1.5; font-weight: 500; }

        /* Sell CTA */
        .ks-footer-sell {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: rgba(234,107,14,0.1);
          border: 1px solid rgba(234,107,14,0.25);
          border-radius: 10px;
          text-decoration: none;
          color: #FB923C;
          font-size: 13px;
          font-weight: 700;
          margin-top: 20px;
          transition: background 0.15s, border-color 0.15s;
        }
        .ks-footer-sell:hover {
          background: rgba(234,107,14,0.18);
          border-color: rgba(234,107,14,0.5);
        }

        /* Bottom bar */
        .ks-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          position: relative;
          z-index: 1;
        }
        .ks-footer-bottom-inner {
          max-width: 1380px;
          margin: 0 auto;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .ks-footer-copy { font-size: 12px; color: #4B5563; }
        .ks-footer-copy a { color: #6B7280; text-decoration: none; transition: color 0.15s; }
        .ks-footer-copy a:hover { color: #FB923C; }
        .ks-footer-legal { display: flex; gap: 16px; }
        .ks-footer-legal a { font-size: 12px; color: #4B5563; text-decoration: none; transition: color 0.15s; }
        .ks-footer-legal a:hover { color: #FB923C; }

        /* Payment icons row */
        .ks-payment-icons {
          display: flex;
          gap: 6px;
          margin-top: 22px;
          flex-wrap: wrap;
        }
        .ks-payment-pill {
          padding: 4px 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #6B7280;
          letter-spacing: 0.3px;
        }
      `}</style>

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