import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#222] text-[#999]">
      <div className="site-container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              <span className="text-orange-500">Kamil</span>
              <span className="text-white">Store</span>
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted multi-vendor marketplace. Shop from 1,200+ verified sellers with buyer protection.
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-[#333] flex items-center justify-center text-[#999] hover:bg-orange-500 hover:text-white transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/vendors", label: "Our Vendors" },
                { href: "/vendor/register", label: "Become a Seller" },
                { href: "/buyer-protection", label: "Buyer Protection" },
              ].map(({ href, label }) => (
                <li key={href}><Link href={href} className="hover:text-orange-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-white text-sm mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/help", label: "Help Center" },
                { href: "/shipping", label: "Shipping Info" },
                { href: "/returns", label: "Returns" },
                { href: "/track-order", label: "Track Order" },
                { href: "/faq", label: "FAQs" },
              ].map(({ href, label }) => (
                <li key={href}><Link href={href} className="hover:text-orange-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>123 Commerce Street, NY 10001</span></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0" /><span>+1 (555) 123-4567</span></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0" /><span>support@kamilstore.com</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#333]">
        <div className="site-container py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[#666]">&copy; {new Date().getFullYear()} KamilStore. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-[#666]">
            <Link href="/privacy" className="hover:text-[#999]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#999]">Terms</Link>
            <Link href="/cookies" className="hover:text-[#999]">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
