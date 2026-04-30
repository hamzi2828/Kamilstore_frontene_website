"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Package, Search, Eye, EyeOff, RotateCcw, ShoppingBag,
  Clock, MapPin, Truck, Loader2,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useAuth } from "@/lib/auth-context";
import "@/styling/OrdersPage.css";

interface UiOrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface UiOrder {
  _id: string;
  date: string;
  status: string;
  total: number;
  items: UiOrderItem[];
  shippingAddress: string;
  vendorName?: string;
  trackingNumber?: string;
}

interface ApiOrder {
  orderId: string;
  placedAt: string;
  vendorName?: string;
  amount?: number;
  orderStatus?: string;
  items?: Array<{ name?: string; quantity?: number; unitPrice?: number; productId?: string; slug?: string; image?: string | null }>;
  shippingAddress?: { line1?: string; city?: string; state?: string; zipCode?: string; country?: string };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const PLACEHOLDER =
  "https://png.pngtree.com/png-vector/20241018/ourmid/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_14112954.png";

const formatAddress = (a?: ApiOrder["shippingAddress"]) =>
  !a
    ? "—"
    : [a.line1, a.city, a.state, a.zipCode, a.country].filter(Boolean).join(", ");

const statusFilters = ["all", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  Delivered: { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  Shipped: { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
  Processing: { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
  Cancelled: { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<UiOrder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?._id) return;
    let cancelled = false;
    setLoading(true);
    fetch(`${API_URL}/api/public/orders?customerUserId=${encodeURIComponent(user._id)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (!json.success) throw new Error(json.message || "Failed to load orders");
        const mapped: UiOrder[] = (json.data as ApiOrder[]).map((o) => ({
          _id: o.orderId,
          date: o.placedAt,
          status: o.orderStatus || "Processing",
          total: Number(o.amount || 0),
          items: (o.items || []).map((it) => ({
            name: it.name || "Item",
            image: it.image
              ? (it.image.startsWith("http") ? it.image : `${API_URL}${it.image}`)
              : PLACEHOLDER,
            quantity: it.quantity || 0,
            price: Number(it.unitPrice || 0),
          })),
          shippingAddress: formatAddress(o.shippingAddress),
          vendorName: o.vendorName,
        }));
        setOrders(mapped);
      })
      .catch(() => {
        if (!cancelled) setOrders([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user?._id]);

  const filtered = useMemo(
    () =>
      orders.filter((o) => {
        const matchStatus = selectedStatus === "all" || o.status === selectedStatus;
        const matchSearch = o._id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchStatus && matchSearch;
      }),
    [orders, selectedStatus, searchQuery]
  );

  return (
    <>
      <Breadcrumb items={[{ label: "Account", href: "/account" }, { label: "Orders" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="ks-ord-icon-box">
                  <Package className="w-[22px] h-[22px] text-orange-500" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                    My Orders
                  </h1>
                  <p className="text-sm text-[#999] font-medium mt-1.5">
                    {orders.length} orders placed
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="ks-ord-filter-bar">
                <div className="ks-ord-search-wrap">
                  <Search className="ks-ord-search-icon" />
                  <input
                    type="text"
                    placeholder="Search by order ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ks-ord-search-input"
                  />
                </div>

                <div className="ks-ord-status-pills">
                  {statusFilters.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedStatus(s)}
                      className={`ks-ord-pill ${selectedStatus === s ? "ks-ord-pill-active" : ""}`}
                    >
                      {s === "all" ? "All" : s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Orders List ── */}
        <section className="site-container">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-[#9ca3af] text-sm">
              <Loader2 className="w-6 h-6 animate-spin mb-2 text-orange-500" />
              Loading your orders...
            </div>
          )}
          {!loading && (
          <>
          <div className="ks-ord-list">
            {filtered.map((order) => {
              const st = statusStyles[order.status] || statusStyles.Processing;
              const isExpanded = expandedOrder === order._id;

              return (
                <div key={order._id} className="ks-ord-card">
                  {/* Header */}
                  <div className="ks-ord-card-header">
                    <div className="ks-ord-card-left">
                      <div className="ks-ord-id-row">
                        <span className="ks-ord-id">#{order._id}</span>
                        <span className="ks-ord-status" style={{ background: st.bg, color: st.color, borderColor: st.border }}>
                          {order.status}
                        </span>
                      </div>
                      <p className="ks-ord-meta">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(order.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        <span className="ks-ord-dot" />
                        {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        {order.vendorName && (
                          <>
                            <span className="ks-ord-dot" />
                            {order.vendorName}
                          </>
                        )}
                      </p>
                    </div>
                    <div className="ks-ord-card-right">
                      <span className="ks-ord-total">{formatPrice(order.total)}</span>
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                        className="ks-ord-toggle-btn"
                      >
                        {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {isExpanded ? "Hide" : "Details"}
                      </button>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="ks-ord-items-preview">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="ks-ord-preview-item">
                        <div className="ks-ord-preview-img">
                          <ProductImage src={item.image} alt={item.name} className="object-cover" />
                        </div>
                        <div className="ks-ord-preview-info">
                          <p className="ks-ord-preview-name">{item.name}</p>
                          <p className="ks-ord-preview-qty">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="ks-ord-preview-more">+{order.items.length - 3} more</div>
                    )}
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="ks-ord-expanded">
                      <h4 className="ks-ord-expanded-title">Order Items</h4>
                      <div className="ks-ord-expanded-items">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="ks-ord-expanded-item">
                            <div className="ks-ord-expanded-item-left">
                              <div className="ks-ord-expanded-img">
                                <ProductImage src={item.image} alt={item.name} className="object-cover" />
                              </div>
                              <div>
                                <p className="ks-ord-expanded-name">{item.name}</p>
                                <p className="ks-ord-expanded-qty">Quantity: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="ks-ord-expanded-price">{formatPrice(item.price)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="ks-ord-expanded-info-grid">
                        <div className="ks-ord-expanded-info-block">
                          <MapPin className="w-4 h-4 text-[#bbb]" />
                          <div>
                            <span className="ks-ord-expanded-info-label">Shipping Address</span>
                            <span className="ks-ord-expanded-info-value">{order.shippingAddress}</span>
                          </div>
                        </div>
                        {order.trackingNumber && (
                          <div className="ks-ord-expanded-info-block">
                            <Truck className="w-4 h-4 text-[#bbb]" />
                            <div>
                              <span className="ks-ord-expanded-info-label">Tracking Number</span>
                              <span className="ks-ord-expanded-info-value ks-ord-tracking">{order.trackingNumber}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ks-ord-expanded-actions">
                        {order.status === "Delivered" && (
                          <button className="ks-ord-action-btn-outline">
                            <RotateCcw className="w-4 h-4" /> Return Items
                          </button>
                        )}
                        <button className="ks-ord-action-btn-primary">
                          <ShoppingBag className="w-4 h-4" /> Buy Again
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty */}
          {filtered.length === 0 && (
            <div className="ks-ord-empty">
              <div className="ks-ord-empty-icon"><Package className="w-10 h-10 text-[#ddd]" /></div>
              <h3 className="ks-ord-empty-title">No orders found</h3>
              <p className="ks-ord-empty-sub">
                {searchQuery ? "Try adjusting your search or filter" : "You haven't placed any orders yet"}
              </p>
              <Link href="/products" className="ks-ord-empty-btn">
                <ShoppingBag className="w-[18px] h-[18px]" /> Start Shopping
              </Link>
            </div>
          )}
          </>
          )}
        </section>
      </div>
    </>
  );
}
