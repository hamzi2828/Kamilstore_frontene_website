"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard, MapPin, Truck, ShieldCheck, CheckCircle,
  Lock, ArrowRight, ArrowLeft, Wallet,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/CheckoutPage.css";

const cartItems = [
  {
    _id: "1",
    name: "Apple MacBook Pro 14-inch M3 Pro",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    price: 1849.99,
    quantity: 1,
    variant: "512GB / Space Gray",
  },
  {
    _id: "2",
    name: "Sony WH-1000XM5 Wireless Headphones",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    price: 349.99,
    quantity: 1,
    variant: "Black",
  },
];

const paymentMethods = [
  { id: "card", name: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, AMEX" },
  { id: "paypal", name: "PayPal", icon: Wallet, desc: "Pay with your PayPal account" },
];

const steps = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: CheckCircle },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zipCode: "", country: "United States",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState({ number: "", name: "", expiry: "", cvv: "" });

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShipping = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardInfo((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

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
                      <label className="ks-co-radio-card ks-co-radio-card-active">
                        <input type="radio" name="shipping" defaultChecked className="ks-co-radio" />
                        <div>
                          <p className="ks-co-radio-title">Free Standard Shipping</p>
                          <p className="ks-co-radio-desc">5-7 business days</p>
                        </div>
                        <span className="ks-co-radio-price ks-co-radio-price-free">FREE</span>
                      </label>
                      <label className="ks-co-radio-card">
                        <input type="radio" name="shipping" className="ks-co-radio" />
                        <div>
                          <p className="ks-co-radio-title">Express Shipping</p>
                          <p className="ks-co-radio-desc">2-3 business days</p>
                        </div>
                        <span className="ks-co-radio-price">$14.99</span>
                      </label>
                    </div>
                  </div>

                  <button onClick={() => setStep(2)} className="ks-co-next-btn">
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
                    <button onClick={() => setStep(3)} className="ks-co-next-btn">
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
                      {shippingInfo.country}
                    </p>
                  </div>

                  {/* Payment review */}
                  <div className="ks-co-review-block">
                    <div className="ks-co-review-header">
                      <h3 className="ks-co-review-label">Payment Method</h3>
                      <button onClick={() => setStep(2)} className="ks-co-edit-btn">Edit</button>
                    </div>
                    <p className="ks-co-review-text">
                      {paymentMethod === "card" ? `Card ending in ${cardInfo.number.slice(-4) || "****"}` : "PayPal"}
                    </p>
                  </div>

                  {/* Items review */}
                  <div className="ks-co-review-items">
                    <h3 className="ks-co-review-label" style={{ marginBottom: 14 }}>Order Items</h3>
                    {cartItems.map((item) => (
                      <div key={item._id} className="ks-co-review-item">
                        <div className="ks-co-review-item-img">
                          <ProductImage src={item.image} alt={item.name} className="object-cover" />
                        </div>
                        <div className="ks-co-review-item-info">
                          <p className="ks-co-review-item-name">{item.name}</p>
                          <p className="ks-co-review-item-variant">{item.variant} &middot; Qty: {item.quantity}</p>
                        </div>
                        <span className="ks-co-review-item-price">{formatPrice(item.price)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ks-co-btn-row">
                    <button onClick={() => setStep(2)} className="ks-co-back-btn">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button className="ks-co-place-btn">
                      <Lock className="w-4 h-4" />
                      Place Order &mdash; {formatPrice(total)}
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
                        <ProductImage src={item.image} alt={item.name} className="object-cover" />
                        <span className="ks-co-summary-item-qty">{item.quantity}</span>
                      </div>
                      <div className="ks-co-summary-item-info">
                        <p className="ks-co-summary-item-name">{item.name}</p>
                        <p className="ks-co-summary-item-variant">{item.variant}</p>
                      </div>
                      <span className="ks-co-summary-item-price">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="ks-co-summary-rows">
                  <div className="ks-co-summary-row">
                    <span>Subtotal</span>
                    <span className="ks-co-summary-row-val">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="ks-co-summary-row">
                    <span>Shipping</span>
                    <span className="ks-co-summary-free">FREE</span>
                  </div>
                  <div className="ks-co-summary-row">
                    <span>Tax</span>
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
