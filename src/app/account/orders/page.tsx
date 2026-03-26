"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package, Search, Eye, EyeOff, RotateCcw, ShoppingBag,
  ChevronDown, Clock, MapPin, Truck, ArrowRight,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/OrdersPage.css";

const orders = [
  {
    _id: "ORD001", date: "2024-01-15", status: "Delivered", total: 2199.98,
    items: [
      { name: "Apple MacBook Pro 14-inch M3 Pro", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", quantity: 1, price: 1849.99 },
      { name: "Sony WH-1000XM5 Wireless Headphones", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop", quantity: 1, price: 349.99 },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA10123456784",
  },
  {
    _id: "ORD002", date: "2024-01-10", status: "Shipped", total: 149.99,
    items: [
      { name: "USB-C Hub Adapter 7-in-1", image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop", quantity: 1, price: 49.99 },
      { name: "Wireless Charging Pad", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop", quantity: 2, price: 50.00 },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA10123456785",
  },
  {
    _id: "ORD003", date: "2024-01-05", status: "Processing", total: 599.99,
    items: [
      { name: "iPad Pro 12.9-inch Case", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", quantity: 1, price: 79.99 },
      { name: "Apple Pencil 2nd Generation", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", quantity: 1, price: 129.00 },
      { name: "Magic Keyboard for iPad Pro", image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop", quantity: 1, price: 349.00 },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    _id: "ORD004", date: "2023-12-20", status: "Cancelled", total: 299.99,
    items: [
      { name: "Beats Studio Pro Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", quantity: 1, price: 299.99 },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
  },
];

const statusFilters = ["all", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  Delivered: { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  Shipped: { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
  Processing: { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
  Cancelled: { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
};

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchStatus = selectedStatus === "all" || o.status === selectedStatus;
    const matchSearch = o._id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

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
        </section>
      </div>
    </>
  );
}
