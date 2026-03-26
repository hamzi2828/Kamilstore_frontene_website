"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag,
  ShoppingCart, ShieldCheck, Truck, Package, RotateCcw,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/CartPage.css";

const initialCartItems = [
  {
    _id: "1",
    product: {
      _id: "p1",
      name: "Apple MacBook Pro 14-inch M3 Pro",
      slug: "macbook-pro-14-m3",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      sellingPrice: 1999.99,
      discountPrice: 1849.99,
      vendor: { name: "TechZone", slug: "techzone" },
    },
    quantity: 1,
    variant: { Storage: "512GB", Color: "Space Gray" },
  },
  {
    _id: "2",
    product: {
      _id: "p2",
      name: "Sony WH-1000XM5 Wireless Headphones",
      slug: "sony-wh-1000xm5",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
      sellingPrice: 399.99,
      discountPrice: 349.99,
      vendor: { name: "AudioMax", slug: "audiomax" },
    },
    quantity: 2,
    variant: { Color: "Black" },
  },
  {
    _id: "3",
    product: {
      _id: "p3",
      name: "USB-C Hub Adapter 7-in-1",
      slug: "usb-c-hub-adapter",
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
      sellingPrice: 49.99,
      discountPrice: 39.99,
      vendor: { name: "TechZone", slug: "techzone" },
    },
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setCartItems((items) =>
      items.map((i) => (i._id === id ? { ...i, quantity: qty } : i))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((i) => i._id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      setAppliedCoupon("SAVE10");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, i) =>
      sum + (i.product.discountPrice || i.product.sellingPrice) * i.quantity,
    0
  );
  const discount = appliedCoupon ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal - discount + shipping;
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  // ── Empty state ──
  if (cartItems.length === 0) {
    return (
      <>
        <Breadcrumb items={[{ label: "Cart" }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div className="ks-cart-empty-card">
              <div className="ks-cart-empty-icon-box">
                <ShoppingBag className="w-10 h-10 text-[#ddd]" />
              </div>
              <h1 className="ks-cart-empty-title">Your cart is empty</h1>
              <p className="ks-cart-empty-sub">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <Link href="/products" className="ks-cart-empty-btn">
                <ShoppingBag className="w-[18px] h-[18px]" />
                Start Shopping
              </Link>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Shopping Cart" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3.5">
                <div className="ks-cart-icon-box">
                  <ShoppingCart className="w-[22px] h-[22px] text-orange-500" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                    Shopping Cart
                  </h1>
                  <p className="text-sm text-[#999] font-medium mt-1.5">
                    {totalItems} items in your cart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cart Content ── */}
        <section className="site-container">
          <div className="ks-cart-layout">
            {/* ── Left: Items ── */}
            <div className="ks-cart-items-col">
              <div className="bg-white rounded-2xl overflow-hidden border border-[#f1f5f9]">
                {/* Table header */}
                <div className="ks-cart-table-head">
                  <div className="ks-cart-th-product">Product</div>
                  <div className="ks-cart-th">Price</div>
                  <div className="ks-cart-th">Quantity</div>
                  <div className="ks-cart-th ks-cart-th-right">Total</div>
                </div>

                {/* Items */}
                <div className="ks-cart-items">
                  {cartItems.map((item) => {
                    const price = item.product.discountPrice || item.product.sellingPrice;
                    const lineTotal = price * item.quantity;

                    return (
                      <div key={item._id} className="ks-cart-item">
                        {/* Product */}
                        <div className="ks-cart-item-product">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="ks-cart-item-img"
                          >
                            <ProductImage
                              src={item.product.image}
                              alt={item.product.name}
                              className="object-cover"
                            />
                          </Link>
                          <div className="ks-cart-item-info">
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="ks-cart-item-name"
                            >
                              {item.product.name}
                            </Link>
                            <p className="ks-cart-item-vendor">
                              Sold by{" "}
                              <Link
                                href={`/vendor/${item.product.vendor.slug}`}
                                className="ks-cart-item-vendor-link"
                              >
                                {item.product.vendor.name}
                              </Link>
                            </p>
                            {item.variant && (
                              <p className="ks-cart-item-variant">
                                {Object.entries(item.variant)
                                  .map(([k, v]) => `${k}: ${v}`)
                                  .join(" · ")}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="ks-cart-item-price">
                          <span className="ks-cart-label">Price</span>
                          <span className="ks-cart-item-price-current">{formatPrice(price)}</span>
                          {item.product.discountPrice && (
                            <span className="ks-cart-item-price-old">
                              {formatPrice(item.product.sellingPrice)}
                            </span>
                          )}
                        </div>

                        {/* Quantity */}
                        <div className="ks-cart-item-qty">
                          <span className="ks-cart-label">Qty</span>
                          <div className="ks-cart-qty-control">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="ks-cart-qty-btn"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="ks-cart-qty-value">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="ks-cart-qty-btn"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Total + Remove */}
                        <div className="ks-cart-item-total">
                          <span className="ks-cart-label">Total</span>
                          <span className="ks-cart-item-total-value">{formatPrice(lineTotal)}</span>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="ks-cart-remove-btn"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="ks-cart-actions">
                <Link href="/products" className="ks-cart-continue-link">
                  <Package className="w-4 h-4" />
                  Continue Shopping
                </Link>
                <button onClick={() => setCartItems([])} className="ks-cart-clear-btn">
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="ks-cart-summary-col">
              <div className="ks-cart-summary-card">
                <h2 className="ks-cart-summary-title">Order Summary</h2>

                {/* Coupon */}
                <div className="ks-cart-coupon">
                  <label className="ks-cart-coupon-label">Coupon Code</label>
                  <div className="ks-cart-coupon-row">
                    <div className="ks-cart-coupon-field">
                      <Tag className="ks-cart-coupon-icon" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="ks-cart-coupon-input"
                      />
                    </div>
                    <button onClick={applyCoupon} className="ks-cart-coupon-btn">
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="ks-cart-coupon-success">
                      Coupon &quot;{appliedCoupon}&quot; applied! 10% off
                    </p>
                  )}
                  <p className="ks-cart-coupon-hint">
                    Try &quot;SAVE10&quot; for 10% off
                  </p>
                </div>

                {/* Summary rows */}
                <div className="ks-cart-summary-rows">
                  <div className="ks-cart-summary-row">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="ks-cart-summary-row-value">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="ks-cart-summary-row ks-cart-summary-discount">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="ks-cart-summary-row">
                    <span>Shipping</span>
                    <span className="ks-cart-summary-row-value">
                      {shipping === 0 ? (
                        <span className="ks-cart-free-shipping">FREE</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="ks-cart-shipping-hint">Free shipping on orders over $50</p>
                  )}

                  <div className="ks-cart-summary-total-row">
                    <span>Total</span>
                    <span className="ks-cart-summary-total-value">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout */}
                <Link href="/checkout" className="ks-cart-checkout-btn">
                  Proceed to Checkout
                  <ArrowRight className="w-[18px] h-[18px]" />
                </Link>

                {/* Trust badges */}
                <div className="ks-cart-trust">
                  <div className="ks-cart-trust-item">
                    <ShieldCheck className="ks-cart-trust-icon" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="ks-cart-trust-item">
                    <Truck className="ks-cart-trust-icon" />
                    <span>Fast delivery</span>
                  </div>
                  <div className="ks-cart-trust-item">
                    <RotateCcw className="ks-cart-trust-icon" />
                    <span>30-day returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
