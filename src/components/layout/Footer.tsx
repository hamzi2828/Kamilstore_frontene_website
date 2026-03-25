import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Main Footer */}
      <div className="site-container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-5">
              <span className="text-orange-500">Kamil</span>
              <span className="text-white">Store</span>
            </h3>
            <p className="text-sm leading-relaxed mb-5">
              Your one-stop destination for quality products from verified
              vendors. Shop with confidence from thousands of sellers.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
                { href: "/vendors", label: "Our Vendors" },
                { href: "/vendor/register", label: "Become a Vendor" },
                { href: "/careers", label: "Careers" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Customer Service
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/help", label: "Help Center" },
                { href: "/shipping", label: "Shipping Info" },
                { href: "/returns", label: "Returns & Exchange" },
                { href: "/track-order", label: "Track Your Order" },
                { href: "/faq", label: "FAQs" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>123 Commerce Street, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>support@kamilstore.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="site-container py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} KamilStore. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-gray-300 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
