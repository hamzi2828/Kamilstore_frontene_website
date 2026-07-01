"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard, MapPin, Truck, ShieldCheck, CheckCircle,
  Lock, ArrowRight, ArrowLeft, Wallet, ShoppingBag, Banknote,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/CheckoutPage.css";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/i18n";

const PLACEHOLDER =
  "https://png.pngtree.com/png-vector/20241018/ourmid/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_14112954.png";

const paymentMethods = [
  { id: "card", nameKey: "cart.checkout.payment.cardName", icon: CreditCard, descKey: "cart.checkout.payment.cardDesc" },
  { id: "paypal", nameKey: "cart.checkout.payment.paypalName", icon: Wallet, descKey: "cart.checkout.payment.paypalDesc" },
  { id: "cod", nameKey: "cart.checkout.payment.codName", icon: Banknote, descKey: "cart.checkout.payment.codDesc" },
];

const steps = [
  { id: 1, labelKey: "cart.checkout.steps.shipping", icon: MapPin },
  { id: 2, labelKey: "cart.checkout.steps.payment", icon: CreditCard },
  { id: 3, labelKey: "cart.checkout.steps.review", icon: CheckCircle },
];

const SHIPPING_OPTIONS = [
  { id: "standard", titleKey: "cart.checkout.shippingStandardTitle", descKey: "cart.checkout.shippingStandardDesc", price: 0 },
  { id: "express", titleKey: "cart.checkout.shippingExpressTitle", descKey: "cart.checkout.shippingExpressDesc", price: 14.99 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    items: cartItems,
    totalItems,
    subtotal,
    isReady,
    isAuthenticated,
    refresh,
    clearCart,
  } = useCart();
  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const [shippingMethodId, setShippingMethodId] = useState("standard");
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zipCode: "", country: "United States",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState<{
    id: string;
    total: number;
    vendorOrders: Array<{
      vendorId: string;
      vendorName: string;
      orderId: string;
      itemCount: number;
      total: number;
    }>;
  } | null>(null);

  // Pull fresh server cart for logged-in users on mount
  useEffect(() => {
    if (isAuthenticated) refresh();
  }, [isAuthenticated, refresh]);

  // Pre-fill name and email from the authenticated user
  useEffect(() => {
    if (!user) return;
    setShippingInfo((prev) => {
      const [first = "", ...rest] = (user.name || "").trim().split(" ");
      const last = rest.join(" ");
      return {
        ...prev,
        firstName: prev.firstName || first,
        lastName: prev.lastName || last,
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      };
    });
  }, [user]);

  const shippingMethod = SHIPPING_OPTIONS.find((s) => s.id === shippingMethodId) || SHIPPING_OPTIONS[0];
  const shipping = shippingMethod.price;
  const tax = useMemo(() => +(subtotal * 0.08).toFixed(2), [subtotal]);
  const total = useMemo(() => +(subtotal + shipping + tax).toFixed(2), [subtotal, shipping, tax]);

  const handleShipping = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardInfo((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const isShippingValid = useMemo(() => {
    const required: (keyof typeof shippingInfo)[] = [
      "firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode",
    ];
    return required.every((k) => shippingInfo[k].trim().length > 0);
  }, [shippingInfo]);

  const isPaymentValid = useMemo(() => {
    if (paymentMethod !== "card") return true;
    return (
      cardInfo.number.replace(/\s/g, "").length >= 12 &&
      cardInfo.name.trim().length > 0 &&
      /^\d{2}\/\d{2}$/.test(cardInfo.expiry) &&
      /^\d{3,4}$/.test(cardInfo.cvv)
    );
  }, [paymentMethod, cardInfo]);

  const placeOrder = async () => {
    setError(null);
    setPlacing(true);
    try {
      // Group cart items by vendor — one sub-order per supplier
      const groups = new Map<string, { vendorId: string; vendorName: string; items: typeof cartItems }>();
      for (const item of cartItems) {
        const vendorId = item.vendor?._id || "unknown";
        const vendorName = item.vendor?.name || "Unknown Vendor";
        const existing = groups.get(vendorId);
        if (existing) existing.items.push(item);
        else groups.set(vendorId, { vendorId, vendorName, items: [item] });
      }

      const baseId = Date.now().toString(36).toUpperCase();
      const masterId = `KS-${baseId}`;

      const subOrders = Array.from(groups.values()).map((g, idx) => ({
        orderId: `${masterId}-V${idx + 1}`,
        vendor: { id: g.vendorId, name: g.vendorName },
        items: g.items.map((it) => ({
          productId: it.productId,
          name: it.name,
          slug: it.slug,
          image: it.image,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          variantSku: it.variantSku,
        })),
        amount: g.items.reduce((s, it) => s + it.unitPrice * it.quantity, 0),
      }));

      const payload = {
        masterOrderId: masterId,
        customer: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`.trim(),
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          userId: user?._id,
        },
        shippingAddress: {
          line1: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country,
        },
        paymentMethod,
        shippingMethod: shippingMethodId,
        totals: { subtotal, shipping, tax, total },
        subOrders,
      };

      const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API}/api/public/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || t("cart.checkout.orderFailed"));
      }

      const vendorOrders = (json.data?.subOrders || subOrders).map((so: { orderId: string; vendorId?: string; vendorName?: string; vendor?: { id: string; name: string }; itemCount?: number; amount: number; items?: Array<{ quantity: number }>; }) => ({
        vendorId: so.vendorId || so.vendor?.id || "",
        vendorName: so.vendorName || so.vendor?.name || "",
        orderId: so.orderId,
        itemCount: so.itemCount ?? (so.items || []).reduce((s, it) => s + (it.quantity || 0), 0),
        total: so.amount,
      }));

      clearCart();
      setOrderPlaced({ id: json.data?.masterOrderId || masterId, total, vendorOrders });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("cart.checkout.orderFailed"));
    } finally {
      setPlacing(false);
    }
  };

  // ── Loading state ──
  if (!isReady) {
    return (
      <>
        <Breadcrumb items={[{ label: t("common.cart"), href: "/cart" }, { label: t("cart.checkout.title") }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div style={{ textAlign: "center", padding: "48px 0", color: "#9CA3AF", fontSize: 14 }}>
              {t("cart.checkout.loading")}
            </div>
          </section>
        </div>
      </>
    );
  }

  // ── Order success state ──
  if (orderPlaced) {
    return (
      <>
        <Breadcrumb items={[{ label: t("cart.checkout.title") }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div className="bg-white rounded-2xl p-10 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h1 className="text-2xl font-extrabold text-[#111] mb-2">{t("cart.checkout.success.title")}</h1>
              <p className="text-[#666] mb-1">{t("cart.checkout.success.thanks")}</p>
              <p className="text-[#666] mb-4">
                {t("cart.checkout.success.orderId")} <span className="font-semibold text-[#111]">{orderPlaced.id}</span>
                {" · "}{t("common.total")}: <span className="font-semibold text-[#111]">{formatPrice(orderPlaced.total)}</span>
              </p>

              {orderPlaced.vendorOrders.length > 0 && (
                <div className="text-left bg-[#fafafa] border border-[#f1f5f9] rounded-xl p-4 mb-6 max-w-md mx-auto">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-3">
                    {t(
                      orderPlaced.vendorOrders.length === 1
                        ? "cart.checkout.success.dispatchedOne"
                        : "cart.checkout.success.dispatchedOther",
                      { count: orderPlaced.vendorOrders.length },
                    )}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {orderPlaced.vendorOrders.map((vo) => (
                      <li key={vo.orderId} className="flex items-start justify-between gap-3 text-sm">
                        <div className="min-w-0">
                          <p className="font-semibold text-[#111] truncate">{vo.vendorName}</p>
                          <p className="text-xs text-[#9ca3af]">
                            #{vo.orderId} · {t(
                              vo.itemCount === 1
                                ? "cart.itemCountOne"
                                : "cart.itemCountOther",
                              { count: vo.itemCount },
                            )}
                          </p>
                        </div>
                        <span className="font-semibold text-[#111] shrink-0">
                          {formatPrice(vo.total)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/products" className="ks-co-back-btn">
                  {t("cart.continueShopping")}
                </Link>
                <Link href="/account" className="ks-co-next-btn">
                  {t("cart.checkout.viewOrders")}
                  <ArrowRight className="w-[18px] h-[18px]" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  // ── Empty cart ──
  if (cartItems.length === 0) {
    return (
      <>
        <Breadcrumb items={[{ label: t("common.cart"), href: "/cart" }, { label: t("cart.checkout.title") }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div className="bg-white rounded-2xl p-10 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-[#bbb]" />
              </div>
              <h1 className="text-xl font-bold text-[#111] mb-1">{t("cart.empty.title")}</h1>
              <p className="text-[#777] text-sm mb-5">
                {t("cart.checkout.emptySubtitle")}
              </p>
              <button onClick={() => router.push("/products")} className="ks-co-next-btn inline-flex">
                {t("cart.browseProducts")}
                <ArrowRight className="w-[18px] h-[18px]" />
              </button>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: t("common.cart"), href: "/cart" }, { label: t("cart.checkout.title") }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Steps indicator ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl p-5 sm:p-6">
            <div className="ks-co-steps">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isDone = step > s.id;
                const isActive = step === s.id;
                return (
                  <div key={s.id} className="ks-co-step-group">
                    {i > 0 && (
                      <div className={`ks-co-step-line ${step > s.id ? "ks-co-step-line-done" : step >= s.id ? "ks-co-step-line-active" : ""}`} />
                    )}
                    <div className={`ks-co-step ${isDone ? "ks-co-step-done" : isActive ? "ks-co-step-active" : ""}`}>
                      <div className={`ks-co-step-circle ${isDone ? "ks-co-step-circle-done" : isActive ? "ks-co-step-circle-active" : ""}`}>
                        {isDone ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-[18px] h-[18px]" />}
                      </div>
                      <span className="ks-co-step-label">{t(s.labelKey)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Main content ── */}
        <section className="site-container">
          <div className="ks-co-layout">
            {/* Left: Form */}
            <div className="ks-co-form-col">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="ks-co-card">
                  <h2 className="ks-co-card-title">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    {t("cart.checkout.shippingInfo")}
                  </h2>

                  <div className="ks-co-form-grid">
                    {[
                      { name: "firstName", labelKey: "cart.checkout.firstName", type: "text", half: true },
                      { name: "lastName", labelKey: "cart.checkout.lastName", type: "text", half: true },
                      { name: "email", labelKey: "cart.checkout.emailAddress", type: "email", half: true },
                      { name: "phone", labelKey: "cart.checkout.phoneNumber", type: "tel", half: true },
                      { name: "address", labelKey: "cart.checkout.streetAddress", type: "text", half: false },
                      { name: "city", labelKey: "cart.checkout.city", type: "text", half: true },
                      { name: "state", labelKey: "cart.checkout.state", type: "text", half: true },
                      { name: "zipCode", labelKey: "cart.checkout.zipCode", type: "text", half: true },
                    ].map((f) => (
                      <div key={f.name} className={f.half ? "ks-co-field-half" : "ks-co-field-full"}>
                        <label className="ks-co-label">{t(f.labelKey)}</label>
                        <input
                          type={f.type}
                          name={f.name}
                          value={(shippingInfo as Record<string, string>)[f.name]}
                          onChange={handleShipping}
                          className="ks-co-input"
                        />
                      </div>
                    ))}
                    <div className="ks-co-field-half">
                      <label className="ks-co-label">{t("cart.checkout.country")}</label>
                      <select name="country" value={shippingInfo.country} onChange={handleShipping} className="ks-co-input">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Pakistan</option>
                      </select>
                    </div>
                  </div>

                  {/* Shipping method */}
                  <div className="ks-co-section">
                    <h3 className="ks-co-section-title">
                      <Truck className="w-[18px] h-[18px] text-orange-500" />
                      {t("cart.checkout.shippingMethod")}
                    </h3>
                    <div className="ks-co-radio-group">
                      {SHIPPING_OPTIONS.map((opt) => (
                        <label
                          key={opt.id}
                          className={`ks-co-radio-card ${shippingMethodId === opt.id ? "ks-co-radio-card-active" : ""}`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={opt.id}
                            checked={shippingMethodId === opt.id}
                            onChange={(e) => setShippingMethodId(e.target.value)}
                            className="ks-co-radio"
                          />
                          <div>
                            <p className="ks-co-radio-title">{t(opt.titleKey)}</p>
                            <p className="ks-co-radio-desc">{t(opt.descKey)}</p>
                          </div>
                          <span className={`ks-co-radio-price ${opt.price === 0 ? "ks-co-radio-price-free" : ""}`}>
                            {opt.price === 0 ? t("common.free") : formatPrice(opt.price)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!isShippingValid}
                    className="ks-co-next-btn"
                    style={{ opacity: isShippingValid ? 1 : 0.5, cursor: isShippingValid ? "pointer" : "not-allowed" }}
                  >
                    {t("cart.checkout.continueToPayment")}
                    <ArrowRight className="w-[18px] h-[18px]" />
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="ks-co-card">
                  <h2 className="ks-co-card-title">
                    <CreditCard className="w-5 h-5 text-orange-500" />
                    {t("cart.checkout.paymentMethod")}
                  </h2>

                  <div className="ks-co-radio-group">
                    {paymentMethods.map((m) => {
                      const Icon = m.icon;
                      return (
                        <label key={m.id} className={`ks-co-radio-card ${paymentMethod === m.id ? "ks-co-radio-card-active" : ""}`}>
                          <input
                            type="radio" name="payment" value={m.id}
                            checked={paymentMethod === m.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="ks-co-radio"
                          />
                          <Icon className="w-5 h-5 text-[#555]" />
                          <div>
                            <p className="ks-co-radio-title">{t(m.nameKey)}</p>
                            <p className="ks-co-radio-desc">{t(m.descKey)}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {paymentMethod === "cod" && (
                    <div className="ks-co-section">
                      <h3 className="ks-co-section-title">
                        <Banknote className="w-[18px] h-[18px] text-emerald-500" />
                        {t("cart.checkout.payment.codName")}
                      </h3>
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                        <p className="text-sm text-emerald-900 font-medium mb-1">
                          {t("cart.checkout.cod.payLine", { total: formatPrice(total) })}
                        </p>
                        <ul className="text-xs text-emerald-800/80 list-disc pl-5 space-y-1">
                          <li>{t("cart.checkout.cod.note1")}</li>
                          <li>{t("cart.checkout.cod.note2")}</li>
                          <li>{t("cart.checkout.cod.note3")}</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="ks-co-section">
                      <h3 className="ks-co-section-title">
                        <Lock className="w-[18px] h-[18px] text-emerald-500" />
                        {t("cart.checkout.cardDetails")}
                      </h3>
                      <div className="ks-co-form-grid">
                        <div className="ks-co-field-full">
                          <label className="ks-co-label">{t("cart.checkout.cardNumber")}</label>
                          <input type="text" name="number" value={cardInfo.number} onChange={handleCard} placeholder="1234 5678 9012 3456" className="ks-co-input" />
                        </div>
                        <div className="ks-co-field-full">
                          <label className="ks-co-label">{t("cart.checkout.cardholderName")}</label>
                          <input type="text" name="name" value={cardInfo.name} onChange={handleCard} placeholder={t("cart.checkout.cardholderPlaceholder")} className="ks-co-input" />
                        </div>
                        <div className="ks-co-field-half">
                          <label className="ks-co-label">{t("cart.checkout.expiryDate")}</label>
                          <input type="text" name="expiry" value={cardInfo.expiry} onChange={handleCard} placeholder="MM/YY" className="ks-co-input" />
                        </div>
                        <div className="ks-co-field-half">
                          <label className="ks-co-label">CVV</label>
                          <input type="text" name="cvv" value={cardInfo.cvv} onChange={handleCard} placeholder="123" className="ks-co-input" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="ks-co-btn-row">
                    <button onClick={() => setStep(1)} className="ks-co-back-btn">
                      <ArrowLeft className="w-4 h-4" /> {t("common.back")}
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!isPaymentValid}
                      className="ks-co-next-btn"
                      style={{ opacity: isPaymentValid ? 1 : 0.5, cursor: isPaymentValid ? "pointer" : "not-allowed" }}
                    >
                      {t("cart.checkout.reviewOrder")} <ArrowRight className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="ks-co-card">
                  <h2 className="ks-co-card-title">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    {t("cart.checkout.reviewYourOrder")}
                  </h2>

                  {/* Shipping review */}
                  <div className="ks-co-review-block">
                    <div className="ks-co-review-header">
                      <h3 className="ks-co-review-label">{t("cart.checkout.shippingAddress")}</h3>
                      <button onClick={() => setStep(1)} className="ks-co-edit-btn">{t("common.edit")}</button>
                    </div>
                    <p className="ks-co-review-text">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                      {shippingInfo.country}<br />
                      {shippingInfo.phone}
                    </p>
                  </div>

                  {/* Shipping method review */}
                  <div className="ks-co-review-block">
                    <div className="ks-co-review-header">
                      <h3 className="ks-co-review-label">{t("cart.checkout.shippingMethod")}</h3>
                      <button onClick={() => setStep(1)} className="ks-co-edit-btn">{t("common.edit")}</button>
                    </div>
                    <p className="ks-co-review-text">
                      {t(shippingMethod.titleKey)} &middot; {t(shippingMethod.descKey)}{" "}
                      &mdash; {shippingMethod.price === 0 ? t("common.free") : formatPrice(shippingMethod.price)}
                    </p>
                  </div>

                  {/* Payment review */}
                  <div className="ks-co-review-block">
                    <div className="ks-co-review-header">
                      <h3 className="ks-co-review-label">{t("cart.checkout.paymentMethod")}</h3>
                      <button onClick={() => setStep(2)} className="ks-co-edit-btn">{t("common.edit")}</button>
                    </div>
                    <p className="ks-co-review-text">
                      {paymentMethod === "card"
                        ? t("cart.checkout.cardEndingIn", { last4: cardInfo.number.replace(/\s/g, "").slice(-4) || "****" })
                        : paymentMethod === "paypal"
                        ? "PayPal"
                        : t("cart.checkout.payment.codName")}
                    </p>
                  </div>

                  {/* Items review */}
                  <div className="ks-co-review-items">
                    <h3 className="ks-co-review-label" style={{ marginBottom: 14 }}>{t("cart.checkout.orderItems")}</h3>
                    {cartItems.map((item) => (
                      <div key={item._id} className="ks-co-review-item">
                        <div className="ks-co-review-item-img">
                          <ProductImage src={item.image || PLACEHOLDER} alt={item.name} className="object-cover" />
                        </div>
                        <div className="ks-co-review-item-info">
                          <p className="ks-co-review-item-name">{item.name}</p>
                          {item.vendor?.name && (
                            <p className="ks-co-review-item-vendor">
                              {t("cart.soldBy")} <strong>{item.vendor.name}</strong>
                            </p>
                          )}
                          <p className="ks-co-review-item-variant">
                            {item.variantLabel ? `${item.variantLabel} · ` : ""}{t("cart.checkout.qty", { count: item.quantity })}
                          </p>
                        </div>
                        <span className="ks-co-review-item-price">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm mt-3">{error}</p>
                  )}

                  <div className="ks-co-btn-row">
                    <button onClick={() => setStep(2)} className="ks-co-back-btn">
                      <ArrowLeft className="w-4 h-4" /> {t("common.back")}
                    </button>
                    <button
                      onClick={placeOrder}
                      disabled={placing}
                      className="ks-co-place-btn"
                      style={{ opacity: placing ? 0.6 : 1, cursor: placing ? "wait" : "pointer" }}
                    >
                      <Lock className="w-4 h-4" />
                      {placing ? t("cart.checkout.placing") : t("cart.checkout.placeOrder", { total: formatPrice(total) })}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <div className="ks-co-summary-col">
              <div className="ks-co-summary-card">
                <h2 className="ks-co-summary-title">{t("cart.orderSummary")}</h2>

                <div className="ks-co-summary-items">
                  {cartItems.map((item) => (
                    <div key={item._id} className="ks-co-summary-item">
                      <div className="ks-co-summary-item-img">
                        <ProductImage src={item.image || PLACEHOLDER} alt={item.name} className="object-cover" />
                        <span className="ks-co-summary-item-qty">{item.quantity}</span>
                      </div>
                      <div className="ks-co-summary-item-info">
                        <p className="ks-co-summary-item-name">{item.name}</p>
                        {item.vendor?.name && (
                          <p className="ks-co-summary-item-vendor">
                            {t("cart.soldBy")} <strong>{item.vendor.name}</strong>
                          </p>
                        )}
                        {item.variantLabel && (
                          <p className="ks-co-summary-item-variant">{item.variantLabel}</p>
                        )}
                      </div>
                      <span className="ks-co-summary-item-price">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="ks-co-summary-rows">
                  <div className="ks-co-summary-row">
                    <span>{t("cart.subtotalItems", { count: totalItems })}</span>
                    <span className="ks-co-summary-row-val">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="ks-co-summary-row">
                    <span>{t("common.shipping")}</span>
                    <span className={shipping === 0 ? "ks-co-summary-free" : "ks-co-summary-row-val"}>
                      {shipping === 0 ? t("common.free") : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="ks-co-summary-row">
                    <span>{t("cart.checkout.tax")}</span>
                    <span className="ks-co-summary-row-val">{formatPrice(tax)}</span>
                  </div>
                  <div className="ks-co-summary-total">
                    <span>{t("common.total")}</span>
                    <span className="ks-co-summary-total-val">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="ks-co-trust">
                  <ShieldCheck className="ks-co-trust-icon" />
                  <span>{t("cart.checkout.secureNotice")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
