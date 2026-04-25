"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag,
  ShoppingCart, ShieldCheck, Truck, Package, RotateCcw,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/CartPage.css";
import { useCart } from "@/lib/cart-context";

const PLACEHOLDER =
  "https://png.pngtree.com/png-vector/20241018/ourmid/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_14112954.png";

export default function CartPage() {
  const {
    items: cartItems,
    totalItems,
    subtotal,
    isReady,
    isAuthenticated,
    updateQuantity,
    removeItem,
    clearCart,
    refresh,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Pull latest server cart for logged-in users on mount
  useEffect(() => {
    if (isAuthenticated) refresh();
  }, [isAuthenticated, refresh]);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      setAppliedCoupon("SAVE10");
    }
  };

  const discount = appliedCoupon ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const total = Math.max(0, subtotal - discount + shipping);

  // Hydration guard: render skeleton until localStorage is read
  if (!isReady) {
    return (
      <>
        <Breadcrumb items={[{ label: "Cart" }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px 0",
                color: "#9CA3AF",
                fontSize: 14,
              }}
            >
              Loading cart...
            </div>
          </section>
        </div>
      </>
    );
  }

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
                    {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="site-container">
          <div className="ks-cart-layout">
            <div className="ks-cart-items-col">
              <div className="bg-white rounded-2xl overflow-hidden border border-[#f1f5f9]">
                <div className="ks-cart-table-head">
                  <div className="ks-cart-th-product">Product</div>
                  <div className="ks-cart-th">Price</div>
                  <div className="ks-cart-th">Quantity</div>
                  <div className="ks-cart-th ks-cart-th-right">Total</div>
                </div>

                <div className="ks-cart-items">
                  {cartItems.map((item) => {
                    const price = item.unitPrice;
                    const lineTotal = price * item.quantity;
                    const hasDiscount = item.sellingPrice > item.unitPrice;

                    return (
                      <div key={item._id} className="ks-cart-item">
                        <div className="ks-cart-item-product">
                          <Link
                            href={`/product/${item.slug}`}
                            className="ks-cart-item-img"
                          >
                            <ProductImage
                              src={item.image || PLACEHOLDER}
                              alt={item.name}
                              className="object-cover"
                            />
                          </Link>
                          <div className="ks-cart-item-info">
                            <Link
                              href={`/product/${item.slug}`}
                              className="ks-cart-item-name"
                            >
                              {item.name}
                            </Link>
                            {item.vendor && (
                              <p className="ks-cart-item-vendor">
                                Sold by{" "}
                                <Link
                                  href={`/vendor/${item.vendor._id}`}
                                  className="ks-cart-item-vendor-link"
                                >
                                  {item.vendor.name}
                                </Link>
                              </p>
                            )}
                            {item.variantLabel && (
                              <p className="ks-cart-item-variant">
                                {item.variantLabel}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="ks-cart-item-price">
                          <span className="ks-cart-label">Price</span>
                          <span className="ks-cart-item-price-current">
                            {formatPrice(price)}
                          </span>
                          {hasDiscount && (
                            <span className="ks-cart-item-price-old">
                              {formatPrice(item.sellingPrice)}
                            </span>
                          )}
                        </div>

                        <div className="ks-cart-item-qty">
                          <span className="ks-cart-label">Qty</span>
                          <div className="ks-cart-qty-control">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="ks-cart-qty-btn"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="ks-cart-qty-value">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="ks-cart-qty-btn"
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="ks-cart-item-total">
                          <span className="ks-cart-label">Total</span>
                          <span className="ks-cart-item-total-value">
                            {formatPrice(lineTotal)}
                          </span>
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

              <div className="ks-cart-actions">
                <Link href="/products" className="ks-cart-continue-link">
                  <Package className="w-4 h-4" />
                  Continue Shopping
                </Link>
                <button onClick={clearCart} className="ks-cart-clear-btn">
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="ks-cart-summary-col">
              <div className="ks-cart-summary-card">
                <h2 className="ks-cart-summary-title">Order Summary</h2>

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

                <Link href="/checkout" className="ks-cart-checkout-btn">
                  Proceed to Checkout
                  <ArrowRight className="w-[18px] h-[18px]" />
                </Link>

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
