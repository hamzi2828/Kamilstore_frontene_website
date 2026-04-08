"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User, Package, Heart, MapPin, CreditCard, Settings,
  LogOut, ChevronRight, Edit2, ShieldCheck, Star, Clock,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useAuth } from "@/lib/auth-context";
import "@/styling/AccountPage.css";

const recentOrders = [
  { _id: "ORD001", date: "2024-01-15", status: "Delivered", total: 2199.98, items: 2 },
  { _id: "ORD002", date: "2024-01-10", status: "Shipped", total: 149.99, items: 1 },
  { _id: "ORD003", date: "2024-01-05", status: "Processing", total: 599.99, items: 3 },
];

const menuItems = [
  { label: "My Orders", icon: Package, href: "/account/orders", count: 5, color: "#F97316" },
  { label: "Wishlist", icon: Heart, href: "/wishlist", count: 12, color: "#EF4444" },
  { label: "Addresses", icon: MapPin, href: "/account/addresses", color: "#3B82F6" },
  { label: "Payment Methods", icon: CreditCard, href: "/account/payments", color: "#10B981" },
  { label: "Account Settings", icon: Settings, href: "/account/settings", color: "#8B5CF6" },
];

const quickStats = [
  { label: "Total Orders", value: "5", icon: Package, color: "#F97316", bg: "#FFF7ED" },
  { label: "Wishlist Items", value: "12", icon: Heart, color: "#EF4444", bg: "#FEF2F2" },
  { label: "Saved Addresses", value: "2", icon: MapPin, color: "#3B82F6", bg: "#EFF6FF" },
  { label: "Payment Methods", value: "1", icon: CreditCard, color: "#10B981", bg: "#ECFDF5" },
];

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  Delivered: { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  Shipped: { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
  Processing: { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
};

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

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

  return (
    <>
      <Breadcrumb items={[{ label: "My Account" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        <section className="site-container">
          <div className="ks-acc-layout">
            {/* ── Sidebar ── */}
            <aside className="ks-acc-sidebar">
              <div className="ks-acc-sidebar-card">
                {/* User info */}
                <div className="ks-acc-user-section">
                  <div className="ks-acc-avatar">
                    <span className="ks-acc-avatar-letter">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <h2 className="ks-acc-user-name">{user.name}</h2>
                  <p className="ks-acc-user-email">{user.email}</p>
                  <div className="ks-acc-member-badge">
                    <Star className="w-3 h-3" />
                    Member since {memberSince}
                  </div>
                </div>

                {/* Menu */}
                <nav className="ks-acc-menu">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.label} href={item.href} className="ks-acc-menu-item group">
                        <div className="ks-acc-menu-icon" style={{ background: `${item.color}12`, color: item.color }}>
                          <Icon className="w-[18px] h-[18px]" />
                        </div>
                        <span className="ks-acc-menu-label">{item.label}</span>
                        <div className="ks-acc-menu-right">
                          {item.count && (
                            <span className="ks-acc-menu-count">{item.count}</span>
                          )}
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

            {/* ── Main ── */}
            <div className="ks-acc-main">
              {/* Welcome banner */}
              <div className="ks-acc-welcome">
                <div className="ks-acc-welcome-bg" />
                <div className="ks-acc-welcome-content">
                  <div>
                    <h1 className="ks-acc-welcome-title">Welcome back, {user.name.split(" ")[0]}!</h1>
                    <p className="ks-acc-welcome-sub">Manage your orders, wishlist, and account settings.</p>
                  </div>
                  <Link href="/account/settings" className="ks-acc-welcome-btn">
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Link>
                </div>
              </div>

              {/* Quick stats */}
              <div className="ks-acc-stats-grid">
                {quickStats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="ks-acc-stat-card">
                      <div className="ks-acc-stat-icon" style={{ background: s.bg }}>
                        <Icon className="w-5 h-5" style={{ color: s.color }} />
                      </div>
                      <span className="ks-acc-stat-value">{s.value}</span>
                      <span className="ks-acc-stat-label">{s.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Recent orders */}
              <div className="ks-acc-orders-card">
                <div className="ks-acc-orders-header">
                  <h2 className="ks-acc-orders-title">Recent Orders</h2>
                  <Link href="/account/orders" className="ks-acc-orders-viewall">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="ks-acc-orders-list">
                  {recentOrders.map((order) => {
                    const st = statusStyles[order.status] || statusStyles.Processing;
                    return (
                      <div key={order._id} className="ks-acc-order-row">
                        <div className="ks-acc-order-left">
                          <div className="ks-acc-order-id-row">
                            <span className="ks-acc-order-id">#{order._id}</span>
                            <span
                              className="ks-acc-order-status"
                              style={{ background: st.bg, color: st.color, borderColor: st.border }}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="ks-acc-order-meta">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            <span className="ks-acc-order-dot" />
                            {order.items} item{order.items > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="ks-acc-order-right">
                          <span className="ks-acc-order-total">${order.total.toFixed(2)}</span>
                          <Link href={`/account/orders/${order._id}`} className="ks-acc-order-detail-btn">
                            Details <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Profile info */}
              <div className="ks-acc-profile-card">
                <div className="ks-acc-profile-header">
                  <h2 className="ks-acc-profile-title">Profile Information</h2>
                  <button className="ks-acc-profile-edit">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
                <div className="ks-acc-profile-grid">
                  {[
                    { label: "Full Name", value: user.name },
                    { label: "Email Address", value: user.email },
                    { label: "Phone Number", value: user.phone || "Not set" },
                    { label: "Member Since", value: memberSince },
                  ].map((f) => (
                    <div key={f.label} className="ks-acc-profile-field">
                      <span className="ks-acc-profile-label">{f.label}</span>
                      <span className="ks-acc-profile-value">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
