"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard, MapPin, Truck, ShieldCheck, CheckCircle,
  Lock, ArrowRight, ArrowLeft, Wallet, ShoppingBag,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/CheckoutPage.css";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

const PLACEHOLDER =
  "https://png.pngtree.com/png-vector/20241018/ourmid/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_14112954.png";

const paymentMethods = [
  { id: "card", name: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, AMEX" },
  { id: "paypal", name: "PayPal", icon: Wallet, desc: "Pay with your PayPal account" },
  { id: "cod", name: "Cash on Delivery", icon: Wallet, desc: "Pay when you receive your order" },
];

const steps = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: CheckCircle },
];

const SHIPPING_OPTIONS = [
  { id: "standard", title: "Free Standard Shipping", desc: "5-7 business days", price: 0 },
  { id: "express", title: "Express Shipping", desc: "2-3 business days", price: 14.99 },
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
  const [orderPlaced, setOrderPlaced] = useState<{ id: string; total: number } | null>(null);

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
      // Best-effort: simulate order placement. Backend order endpoint can be wired here later.
      await new Promise((resolve) => setTimeout(resolve, 600));
      const id = `KS-${Date.now().toString(36).toUpperCase()}`;
      clearCart();
      setOrderPlaced({ id, total });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  // ── Loading state ──
  if (!isReady) {
    return (
      <>
        <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div style={{ textAlign: "center", padding: "48px 0", color: "#9CA3AF", fontSize: 14 }}>
              Loading checkout...
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
        <Breadcrumb items={[{ label: "Checkout" }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div className="bg-white rounded-2xl p-10 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h1 className="text-2xl font-extrabold text-[#111] mb-2">Order placed!</h1>
              <p className="text-[#666] mb-1">Thanks for shopping with us.</p>
              <p className="text-[#666] mb-6">
                Order ID: <span className="font-semibold text-[#111]">{orderPlaced.id}</span>
                {" · "}Total: <span className="font-semibold text-[#111]">{formatPrice(orderPlaced.total)}</span>
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/products" className="ks-co-back-btn">
                  Continue Shopping
                </Link>
                <Link href="/account" className="ks-co-next-btn">
                  View Orders
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
        <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
        <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
          <section className="site-container">
            <div className="bg-white rounded-2xl p-10 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-[#bbb]" />
              </div>
              <h1 className="text-xl font-bold text-[#111] mb-1">Your cart is empty</h1>
              <p className="text-[#777] text-sm mb-5">
                Add items to your cart before proceeding to checkout.
              </p>
              <button onClick={() => router.push("/products")} className="ks-co-next-btn inline-flex">
                Browse Products
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
      <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />

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
                      <span className="ks-co-step-label">{s.label}</span>
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
                    Shipping Information
                  </h2>

                  <div className="ks-co-form-grid">
                    {[
                      { name: "firstName", label: "First Name", type: "text", half: true },
                      { name: "lastName", label: "Last Name", type: "text", half: true },
                      { name: "email", label: "Email Address", type: "email", half: true },
                      { name: "phone", label: "Phone Number", type: "tel", half: true },
                      { name: "address", label: "Street Address", type: "text", half: false },
                      { name: "city", label: "City", type: "text", half: true },
                      { name: "state", label: "State", type: "text", half: true },
                      { name: "zipCode", label: "ZIP Code", type: "text", half: true },
                    ].map((f) => (
                      <div key={f.name} className={f.half ? "ks-co-field-half" : "ks-co-field-full"}>
                        <label className="ks-co-label">{f.label}</label>
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
                      <label className="ks-co-label">Country</label>
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
                      Shipping Method
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
                            <p className="ks-co-radio-title">{opt.title}</p>
                            <p className="ks-co-radio-desc">{opt.desc}</p>
                          </div>
                          <span className={`ks-co-radio-price ${opt.price === 0 ? "ks-co-radio-price-free" : ""}`}>
                            {opt.price === 0 ? "FREE" : formatPrice(opt.price)}
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
                    Continue to Payment
                    <ArrowRight className="w-[18px] h-[18px]" />
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="ks-co-card">
                  <h2 className="ks-co-card-title">
                    <CreditCard className="w-5 h-5 text-orange-500" />
                    Payment Method
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
                            <p className="ks-co-radio-title">{m.name}</p>
                            <p className="ks-co-radio-desc">{m.desc}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="ks-co-section">
                      <h3 className="ks-co-section-title">
                        <Lock className="w-[18px] h-[18px] text-emerald-500" />
                        Card Details
                      </h3>
                      <div className="ks-co-form-grid">
                        <div className="ks-co-field-full">
                          <label className="ks-co-label">Card Number</label>
                          <input type="text" name="number" value={cardInfo.number} onChange={handleCard} placeholder="1234 5678 9012 3456" className="ks-co-input" />
                        </div>
                        <div className="ks-co-field-full">
                          <label className="ks-co-label">Cardholder Name</label>
                          <input type="text" name="name" value={cardInfo.name} onChange={handleCard} placeholder="John Doe" className="ks-co-input" />
                        </div>
                        <div className="ks-co-field-half">
                          <label className="ks-co-label">Expiry Date</label>
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
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!isPaymentValid}
                      className="ks-co-next-btn"
                      style={{ opacity: isPaymentValid ? 1 : 0.5, cursor: isPaymentValid ? "pointer" : "not-allowed" }}
                    >
                      Review Order <ArrowRight className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="ks-co-card">
                  <h2 className="ks-co-card-title">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    Review Your Order
                  </h2>

                  {/* Shipping review */}
                  <div className="ks-co-review-block">
                    <div className="ks-co-review-header">
                      <h3 className="ks-co-review-label">Shipping Address</h3>
                      <button onClick={() => setStep(1)} className="ks-co-edit-btn">Edit</button>
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
                      <h3 className="ks-co-review-label">Shipping Method</h3>
                      <button onClick={() => setStep(1)} className="ks-co-edit-btn">Edit</button>
                    </div>
                    <p className="ks-co-review-text">
                      {shippingMethod.title} &middot; {shippingMethod.desc}{" "}
                      &mdash; {shippingMethod.price === 0 ? "FREE" : formatPrice(shippingMethod.price)}
                    </p>
                  </div>

                  {/* Payment review */}
                  <div className="ks-co-review-block">
                    <div className="ks-co-review-header">
                      <h3 className="ks-co-review-label">Payment Method</h3>
                      <button onClick={() => setStep(2)} className="ks-co-edit-btn">Edit</button>
                    </div>
                    <p className="ks-co-review-text">
                      {paymentMethod === "card"
                        ? `Card ending in ${cardInfo.number.replace(/\s/g, "").slice(-4) || "****"}`
                        : paymentMethod === "paypal"
                        ? "PayPal"
                        : "Cash on Delivery"}
                    </p>
                  </div>

                  {/* Items review */}
                  <div className="ks-co-review-items">
                    <h3 className="ks-co-review-label" style={{ marginBottom: 14 }}>Order Items</h3>
                    {cartItems.map((item) => (
                      <div key={item._id} className="ks-co-review-item">
                        <div className="ks-co-review-item-img">
                          <ProductImage src={item.image || PLACEHOLDER} alt={item.name} className="object-cover" />
                        </div>
                        <div className="ks-co-review-item-info">
                          <p className="ks-co-review-item-name">{item.name}</p>
                          <p className="ks-co-review-item-variant">
                            {item.variantLabel ? `${item.variantLabel} · ` : ""}Qty: {item.quantity}
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
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={placeOrder}
                      disabled={placing}
                      className="ks-co-place-btn"
                      style={{ opacity: placing ? 0.6 : 1, cursor: placing ? "wait" : "pointer" }}
                    >
                      <Lock className="w-4 h-4" />
                      {placing ? "Placing..." : <>Place Order &mdash; {formatPrice(total)}</>}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <div className="ks-co-summary-col">
              <div className="ks-co-summary-card">
                <h2 className="ks-co-summary-title">Order Summary</h2>

                <div className="ks-co-summary-items">
                  {cartItems.map((item) => (
                    <div key={item._id} className="ks-co-summary-item">
                      <div className="ks-co-summary-item-img">
                        <ProductImage src={item.image || PLACEHOLDER} alt={item.name} className="object-cover" />
                        <span className="ks-co-summary-item-qty">{item.quantity}</span>
                      </div>
                      <div className="ks-co-summary-item-info">
                        <p className="ks-co-summary-item-name">{item.name}</p>
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
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="ks-co-summary-row-val">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="ks-co-summary-row">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "ks-co-summary-free" : "ks-co-summary-row-val"}>
                      {shipping === 0 ? "FREE" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="ks-co-summary-row">
                    <span>Tax (8%)</span>
                    <span className="ks-co-summary-row-val">{formatPrice(tax)}</span>
                  </div>
                  <div className="ks-co-summary-total">
                    <span>Total</span>
                    <span className="ks-co-summary-total-val">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="ks-co-trust">
                  <ShieldCheck className="ks-co-trust-icon" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
