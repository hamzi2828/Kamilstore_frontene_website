"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag,
  ShoppingCart, ShieldCheck, Truck, Package, RotateCcw,
} from "@/components/icons";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/CartPage.css";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/i18n";

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
  const { t } = useLanguage();

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
        <Breadcrumb items={[{ label: t("common.cart") }]} />
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
              {t("cart.loading")}
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
        <Breadcrumb items={[{ label: t("common.cart") }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div className="ks-cart-empty-card">
              <div className="ks-cart-empty-icon-box">
                <ShoppingBag className="w-10 h-10 text-[#ddd]" />
              </div>
              <h1 className="ks-cart-empty-title">{t("cart.empty.title")}</h1>
              <p className="ks-cart-empty-sub">
                {t("cart.empty.subtitle")}
              </p>
              <Link href="/products" className="ks-cart-empty-btn">
                <ShoppingBag className="w-[18px] h-[18px]" />
                {t("cart.startShopping")}
              </Link>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: t("cart.title") }]} />

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
                    {t("cart.title")}
                  </h1>
                  <p className="text-sm text-[#999] font-medium mt-1.5">
                    {t(
                      totalItems === 1
                        ? "cart.itemsInCartOne"
                        : "cart.itemsInCartOther",
                      { count: totalItems },
                    )}
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
                  <div className="ks-cart-th-product">{t("cart.product")}</div>
                  <div className="ks-cart-th">{t("common.price")}</div>
                  <div className="ks-cart-th">{t("common.quantity")}</div>
                  <div className="ks-cart-th ks-cart-th-right">{t("common.total")}</div>
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
                            href={item.vendor?._id ? `/${item.vendor._id}/product/${item.slug}` : `/product/${item.slug}`}
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
                              href={item.vendor?._id ? `/${item.vendor._id}/product/${item.slug}` : `/product/${item.slug}`}
                              className="ks-cart-item-name"
                            >
                              {item.name}
                            </Link>
                            {item.vendor && (
                              <p className="ks-cart-item-vendor">
                                {t("cart.soldBy")}{" "}
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
                          <span className="ks-cart-label">{t("common.price")}</span>
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
                          <span className="ks-cart-label">{t("cart.qty")}</span>
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
                          <span className="ks-cart-label">{t("common.total")}</span>
                          <span className="ks-cart-item-total-value">
                            {formatPrice(lineTotal)}
                          </span>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="ks-cart-remove-btn"
                            aria-label={t("cart.removeItem")}
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
                  {t("cart.continueShopping")}
                </Link>
                <button onClick={clearCart} className="ks-cart-clear-btn">
                  <Trash2 className="w-4 h-4" />
                  {t("cart.clearCart")}
                </button>
              </div>
            </div>

            <div className="ks-cart-summary-col">
              <div className="ks-cart-summary-card">
                <h2 className="ks-cart-summary-title">{t("cart.orderSummary")}</h2>

                <div className="ks-cart-coupon">
                  <label className="ks-cart-coupon-label">{t("cart.couponCode")}</label>
                  <div className="ks-cart-coupon-row">
                    <div className="ks-cart-coupon-field">
                      <Tag className="ks-cart-coupon-icon" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder={t("cart.enterCode")}
                        className="ks-cart-coupon-input"
                      />
                    </div>
                    <button onClick={applyCoupon} className="ks-cart-coupon-btn">
                      {t("common.apply")}
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="ks-cart-coupon-success">
                      {t("cart.couponApplied", { coupon: appliedCoupon })}
                    </p>
                  )}
                  <p className="ks-cart-coupon-hint">
                    {t("cart.couponHint")}
                  </p>
                </div>

                <div className="ks-cart-summary-rows">
                  <div className="ks-cart-summary-row">
                    <span>{t("cart.subtotalItems", { count: totalItems })}</span>
                    <span className="ks-cart-summary-row-value">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="ks-cart-summary-row ks-cart-summary-discount">
                      <span>{t("cart.discount")}</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="ks-cart-summary-row">
                    <span>{t("common.shipping")}</span>
                    <span className="ks-cart-summary-row-value">
                      {shipping === 0 ? (
                        <span className="ks-cart-free-shipping">{t("common.free")}</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="ks-cart-shipping-hint">{t("header.freeShipping")}</p>
                  )}

                  <div className="ks-cart-summary-total-row">
                    <span>{t("common.total")}</span>
                    <span className="ks-cart-summary-total-value">{formatPrice(total)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="ks-cart-checkout-btn">
                  {t("cart.proceedToCheckout")}
                  <ArrowRight className="w-[18px] h-[18px]" />
                </Link>

                <div className="ks-cart-trust">
                  <div className="ks-cart-trust-item">
                    <ShieldCheck className="ks-cart-trust-icon" />
                    <span>{t("cart.secureCheckout")}</span>
                  </div>
                  <div className="ks-cart-trust-item">
                    <Truck className="ks-cart-trust-icon" />
                    <span>{t("cart.fastDelivery")}</span>
                  </div>
                  <div className="ks-cart-trust-item">
                    <RotateCcw className="ks-cart-trust-icon" />
                    <span>{t("cart.returns30Day")}</span>
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
