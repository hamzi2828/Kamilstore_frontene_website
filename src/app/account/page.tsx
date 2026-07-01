"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package, Heart, MapPin, CreditCard,
  ChevronRight, Edit2, Clock,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useLanguage } from "@/lib/i18n";
import "@/styling/AccountPage.css";

interface RecentOrder {
  _id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  vendorName?: string;
}

interface ApiOrder {
  orderId: string;
  vendorName?: string;
  amount?: number;
  itemCount?: number;
  orderStatus?: string;
  placedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  Delivered: { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  Shipped: { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
  Processing: { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
};

export default function AccountPage() {
  const { user } = useAuth();
  const { totalItems: wishlistCount } = useWishlist();
  const { t } = useLanguage();

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (!user?._id) return;
    let cancelled = false;
    setOrdersLoading(true);
    fetch(`${API_URL}/api/public/orders?customerUserId=${encodeURIComponent(user._id)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (!json.success) throw new Error(json.message || "Failed to load orders");
        const mapped: RecentOrder[] = (json.data as ApiOrder[]).map((o) => ({
          _id: o.orderId,
          date: o.placedAt,
          status: o.orderStatus || "Processing",
          total: Number(o.amount || 0),
          items: o.itemCount || 0,
          vendorName: o.vendorName,
        }));
        setRecentOrders(mapped);
      })
      .catch(() => {
        if (!cancelled) setRecentOrders([]);
      })
      .finally(() => {
        if (!cancelled) setOrdersLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user?._id]);

  if (!user) return null;

  const totalOrders = recentOrders.length;
  const savedAddresses = 0;
  const savedPayments = 0;

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : t("account.recently");

  const statusLabel = (s: string) =>
    ({
      Processing: t("account.orders.statusProcessing"),
      Shipped: t("account.orders.statusShipped"),
      Delivered: t("account.orders.statusDelivered"),
      Cancelled: t("account.orders.statusCancelled"),
    } as Record<string, string>)[s] || s;

  const quickStats = [
    { labelKey: "account.stats.totalOrders", value: String(totalOrders), icon: Package, color: "#F97316", bg: "#FFF7ED" },
    { labelKey: "account.stats.wishlistItems", value: String(wishlistCount), icon: Heart, color: "#EF4444", bg: "#FEF2F2" },
    { labelKey: "account.stats.savedAddresses", value: String(savedAddresses), icon: MapPin, color: "#3B82F6", bg: "#EFF6FF" },
    { labelKey: "account.nav.paymentMethods", value: String(savedPayments), icon: CreditCard, color: "#10B981", bg: "#ECFDF5" },
  ];

  return (
    <>
      {/* Welcome banner */}
      <div className="ks-acc-welcome">
        <div className="ks-acc-welcome-bg" />
        <div className="ks-acc-welcome-content">
          <div>
            <h1 className="ks-acc-welcome-title">{t("account.welcomeBack", { name: user.name.split(" ")[0] })}</h1>
            <p className="ks-acc-welcome-sub">{t("account.welcomeSub")}</p>
          </div>
          <Link href="/account/settings" className="ks-acc-welcome-btn">
            <Edit2 className="w-4 h-4" />
            {t("account.editProfile")}
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="ks-acc-stats-grid">
        {quickStats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.labelKey} className="ks-acc-stat-card">
              <div className="ks-acc-stat-icon" style={{ background: s.bg }}>
                <Icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <span className="ks-acc-stat-value">{s.value}</span>
              <span className="ks-acc-stat-label">{t(s.labelKey)}</span>
            </div>
          );
        })}
      </div>

      {/* Recent orders */}
      <div className="ks-acc-orders-card">
        <div className="ks-acc-orders-header">
          <h2 className="ks-acc-orders-title">{t("account.recentOrders")}</h2>
          <Link href="/account/orders" className="ks-acc-orders-viewall">
            {t("common.viewAll")} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {ordersLoading ? (
          <div className="flex items-center justify-center py-10 text-sm text-[#9ca3af]">
            {t("account.loadingOrders")}
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10 px-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-3">
              <Package className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-sm font-semibold text-[#111] mb-1">{t("account.noOrdersYet")}</p>
            <p className="text-xs text-[#9ca3af] mb-4">{t("account.noOrdersSub")}</p>
            <Link href="/products" className="ks-acc-welcome-btn">
              {t("account.startShopping")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="ks-acc-orders-list">
            {recentOrders.slice(0, 5).map((order) => {
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
                        {statusLabel(order.status)}
                      </span>
                    </div>
                    <p className="ks-acc-order-meta">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      <span className="ks-acc-order-dot" />
                      {order.items} {order.items > 1 ? t("account.itemPlural") : t("account.itemSingular")}
                      {order.vendorName && (
                        <>
                          <span className="ks-acc-order-dot" />
                          {order.vendorName}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="ks-acc-order-right">
                    <span className="ks-acc-order-total">${order.total.toFixed(2)}</span>
                    <Link href={`/account/orders/${order._id}`} className="ks-acc-order-detail-btn">
                      {t("account.details")} <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Profile info */}
      <div className="ks-acc-profile-card">
        <div className="ks-acc-profile-header">
          <h2 className="ks-acc-profile-title">{t("account.profileInfo")}</h2>
          <button className="ks-acc-profile-edit">
            <Edit2 className="w-3.5 h-3.5" /> {t("common.edit")}
          </button>
        </div>
        <div className="ks-acc-profile-grid">
          {[
            { labelKey: "account.fields.fullName", value: user.name },
            { labelKey: "account.fields.emailAddress", value: user.email },
            { labelKey: "account.fields.phoneNumber", value: user.phone || t("account.notSet") },
            { labelKey: "account.fields.memberSince", value: memberSince },
          ].map((f) => (
            <div key={f.labelKey} className="ks-acc-profile-field">
              <span className="ks-acc-profile-label">{t(f.labelKey)}</span>
              <span className="ks-acc-profile-value">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
