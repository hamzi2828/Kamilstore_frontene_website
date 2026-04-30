"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Package, Heart, MapPin, CreditCard, Settings,
  LogOut, ChevronRight, Star,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import "@/styling/AccountPage.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const { totalItems: wishlistCount } = useWishlist();
  const router = useRouter();
  const pathname = usePathname();
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (!user?._id) return;
    let cancelled = false;
    fetch(`${API_URL}/api/public/orders?customerUserId=${encodeURIComponent(user._id)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json.success) setOrderCount(json.data?.length || 0);
      })
      .catch(() => {
        if (!cancelled) setOrderCount(0);
      });
    return () => {
      cancelled = true;
    };
  }, [user?._id]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <div style={{ fontSize: 14, color: "#9CA3AF" }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

  const menuItems = [
    { label: "My Orders", icon: Package, href: "/account/orders", count: orderCount || undefined, color: "#F97316" },
    { label: "Wishlist", icon: Heart, href: "/wishlist", count: wishlistCount || undefined, color: "#EF4444" },
    { label: "Addresses", icon: MapPin, href: "/account/addresses", color: "#3B82F6" },
    { label: "Payment Methods", icon: CreditCard, href: "/account/payments", color: "#10B981" },
    { label: "Account Settings", icon: Settings, href: "/account/settings", color: "#8B5CF6" },
  ];

  const isActive = (href: string) => {
    if (href === "/account") return pathname === "/account";
    return pathname.startsWith(href);
  };

  return (
    <>
      <Breadcrumb items={[{ label: "My Account" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        <section className="site-container">
          <div className="ks-acc-layout">
            {/* ── Sidebar ── */}
            <aside className="ks-acc-sidebar">
              <div className="ks-acc-sidebar-card">
                <div className="ks-acc-user-section">
                  <div className="ks-acc-avatar">
                    <span className="ks-acc-avatar-letter">{user.name.charAt(0)}</span>
                  </div>
                  <h2 className="ks-acc-user-name">{user.name}</h2>
                  <p className="ks-acc-user-email">{user.email}</p>
                  <div className="ks-acc-member-badge">
                    <Star className="w-3 h-3" />
                    Member since {memberSince}
                  </div>
                </div>

                <nav className="ks-acc-menu">
                  <Link
                    href="/account"
                    className={`ks-acc-menu-item group ${isActive("/account") && pathname === "/account" ? "ks-acc-menu-item-active" : ""}`}
                  >
                    <div className="ks-acc-menu-icon" style={{ background: "#F97316" + "12", color: "#F97316" }}>
                      <Star className="w-[18px] h-[18px]" />
                    </div>
                    <span className="ks-acc-menu-label">Dashboard</span>
                    <div className="ks-acc-menu-right">
                      <ChevronRight className="ks-acc-menu-arrow" />
                    </div>
                  </Link>

                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`ks-acc-menu-item group ${active ? "ks-acc-menu-item-active" : ""}`}
                      >
                        <div className="ks-acc-menu-icon" style={{ background: `${item.color}12`, color: item.color }}>
                          <Icon className="w-[18px] h-[18px]" />
                        </div>
                        <span className="ks-acc-menu-label">{item.label}</span>
                        <div className="ks-acc-menu-right">
                          {item.count && <span className="ks-acc-menu-count">{item.count}</span>}
                          <ChevronRight className="ks-acc-menu-arrow" />
                        </div>
                      </Link>
                    );
                  })}
                  <button onClick={handleLogout} className="ks-acc-menu-item ks-acc-logout group">
                    <div className="ks-acc-menu-icon" style={{ background: "#FEF2F2", color: "#EF4444" }}>
                      <LogOut className="w-[18px] h-[18px]" />
                    </div>
                    <span className="ks-acc-menu-label">Sign Out</span>
                  </button>
                </nav>
              </div>
            </aside>

            {/* ── Main content ── */}
            <div className="ks-acc-main">{children}</div>
          </div>
        </section>
      </div>
    </>
  );
}
