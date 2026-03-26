"use client";

import { useState } from "react";
import {
  CreditCard, Plus, Edit2, Trash2, CheckCircle, X,
  ShieldCheck, Lock,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/PaymentsPage.css";

interface PaymentMethod {
  _id: string;
  type: "visa" | "mastercard" | "amex";
  last4: string;
  name: string;
  expiry: string;
  isDefault: boolean;
}

const initialMethods: PaymentMethod[] = [
  {
    _id: "pm1",
    type: "visa",
    last4: "4242",
    name: "John Doe",
    expiry: "12/26",
    isDefault: true,
  },
  {
    _id: "pm2",
    type: "mastercard",
    last4: "8888",
    name: "John Doe",
    expiry: "08/25",
    isDefault: false,
  },
];

const brandColors: Record<string, { bg: string; color: string; border: string; label: string }> = {
  visa: { bg: "#EFF6FF", color: "#1E40AF", border: "#BFDBFE", label: "Visa" },
  mastercard: { bg: "#FEF2F2", color: "#B91C1C", border: "#FECACA", label: "Mastercard" },
  amex: { bg: "#F0F9FF", color: "#0369A1", border: "#BAE6FD", label: "Amex" },
};

export default function PaymentsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: "visa" as "visa" | "mastercard" | "amex",
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const resetForm = () => {
    setForm({ type: "visa", number: "", name: "", expiry: "", cvv: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (pm: PaymentMethod) => {
    setForm({
      type: pm.type,
      number: `**** **** **** ${pm.last4}`,
      name: pm.name,
      expiry: pm.expiry,
      cvv: "",
    });
    setEditingId(pm._id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setMethods((prev) => prev.filter((m) => m._id !== id));
  };

  const handleSetDefault = (id: string) => {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m._id === id })));
  };

  const handleSave = () => {
    if (editingId) {
      setMethods((prev) =>
        prev.map((m) =>
          m._id === editingId
            ? { ...m, type: form.type, name: form.name, expiry: form.expiry }
            : m
        )
      );
    } else {
      const last4 = form.number.replace(/\s/g, "").slice(-4) || "0000";
      const newMethod: PaymentMethod = {
        _id: `pm${Date.now()}`,
        type: form.type,
        last4,
        name: form.name,
        expiry: form.expiry,
        isDefault: methods.length === 0,
      };
      setMethods((prev) => [...prev, newMethod]);
    }
    resetForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Account", href: "/account" }, { label: "Payment Methods" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3.5">
                  <div className="ks-pay-icon-box">
                    <CreditCard className="w-[22px] h-[22px] text-emerald-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                      Payment Methods
                    </h1>
                    <p className="text-sm text-[#999] font-medium mt-1.5">
                      {methods.length} saved card{methods.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <button onClick={() => { resetForm(); setShowForm(true); }} className="ks-pay-add-btn">
                  <Plus className="w-[18px] h-[18px]" />
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cards Grid ── */}
        <section className="site-container">
          <div className="ks-pay-grid">
            {methods.map((pm) => {
              const brand = brandColors[pm.type];
              return (
                <div key={pm._id} className={`ks-pay-card ${pm.isDefault ? "ks-pay-card-default" : ""}`}>
                  {/* Card visual */}
                  <div className="ks-pay-card-visual" style={{ background: `linear-gradient(135deg, ${brand.color}11, ${brand.color}08)` }}>
                    <div className="ks-pay-card-visual-top">
                      <span className="ks-pay-brand-badge" style={{ background: brand.bg, color: brand.color, borderColor: brand.border }}>
                        {brand.label}
                      </span>
                      {pm.isDefault && (
                        <span className="ks-pay-default-badge">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Default
                        </span>
                      )}
                    </div>

                    <div className="ks-pay-card-number">
                      <span className="ks-pay-dots">
                        <span /><span /><span /><span />
                      </span>
                      <span className="ks-pay-dots">
                        <span /><span /><span /><span />
                      </span>
                      <span className="ks-pay-dots">
                        <span /><span /><span /><span />
                      </span>
                      <span className="ks-pay-last4">{pm.last4}</span>
                    </div>

                    <div className="ks-pay-card-bottom">
                      <div>
                        <span className="ks-pay-card-label">Card Holder</span>
                        <span className="ks-pay-card-value">{pm.name}</span>
                      </div>
                      <div>
                        <span className="ks-pay-card-label">Expires</span>
                        <span className="ks-pay-card-value">{pm.expiry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ks-pay-card-actions">
                    {!pm.isDefault && (
                      <button onClick={() => handleSetDefault(pm._id)} className="ks-pay-action ks-pay-action-default">
                        <CheckCircle className="w-3.5 h-3.5" /> Set Default
                      </button>
                    )}
                    <button onClick={() => handleEdit(pm)} className="ks-pay-action ks-pay-action-edit">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => handleDelete(pm._id)} className="ks-pay-action ks-pay-action-delete">
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Add placeholder card */}
            {!showForm && (
              <button onClick={() => { resetForm(); setShowForm(true); }} className="ks-pay-add-card">
                <div className="ks-pay-add-card-icon">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="ks-pay-add-card-text">Add New Card</span>
              </button>
            )}
          </div>

          {/* Empty */}
          {methods.length === 0 && !showForm && (
            <div className="ks-pay-empty">
              <div className="ks-pay-empty-icon"><CreditCard className="w-10 h-10 text-[#ddd]" /></div>
              <h3 className="ks-pay-empty-title">No payment methods</h3>
              <p className="ks-pay-empty-sub">Add a card to make checkout faster and easier.</p>
              <button onClick={() => setShowForm(true)} className="ks-pay-empty-btn">
                <Plus className="w-[18px] h-[18px]" /> Add Card
              </button>
            </div>
          )}

          {/* Security note */}
          {methods.length > 0 && (
            <div className="ks-pay-security">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Your payment information is encrypted and securely stored. We never share your card details.</span>
            </div>
          )}
        </section>

        {/* ── Modal ── */}
        {showForm && (
          <div className="ks-pay-modal-overlay" onClick={resetForm}>
            <div className="ks-pay-modal" onClick={(e) => e.stopPropagation()}>
              <div className="ks-pay-modal-header">
                <h2 className="ks-pay-modal-title">
                  {editingId ? "Edit Card" : "Add New Card"}
                </h2>
                <button onClick={resetForm} className="ks-pay-modal-close">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="ks-pay-modal-body">
                {/* Card type */}
                <div className="ks-pay-type-row">
                  {(["visa", "mastercard", "amex"] as const).map((t) => {
                    const b = brandColors[t];
                    return (
                      <button
                        key={t}
                        onClick={() => setForm((p) => ({ ...p, type: t }))}
                        className={`ks-pay-type-btn ${form.type === t ? "ks-pay-type-btn-active" : ""}`}
                        style={form.type === t ? { borderColor: b.color, background: b.bg, color: b.color } : {}}
                      >
                        <CreditCard className="w-4 h-4" />
                        {b.label}
                      </button>
                    );
                  })}
                </div>

                <div className="ks-pay-form-grid">
                  <div className="ks-pay-field-full">
                    <label className="ks-pay-label">Card Number</label>
                    <input type="text" name="number" value={form.number} onChange={handleChange} placeholder="1234 5678 9012 3456" className="ks-pay-input" />
                  </div>
                  <div className="ks-pay-field-full">
                    <label className="ks-pay-label">Cardholder Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="ks-pay-input" />
                  </div>
                  <div className="ks-pay-field-half">
                    <label className="ks-pay-label">Expiry Date</label>
                    <input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" className="ks-pay-input" />
                  </div>
                  <div className="ks-pay-field-half">
                    <label className="ks-pay-label">CVV</label>
                    <input type="text" name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" className="ks-pay-input" />
                  </div>
                </div>

                <div className="ks-pay-modal-trust">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-bit SSL encrypted. Your card data is safe.</span>
                </div>
              </div>

              <div className="ks-pay-modal-footer">
                <button onClick={resetForm} className="ks-pay-cancel-btn">Cancel</button>
                <button onClick={handleSave} className="ks-pay-save-btn">
                  {editingId ? "Save Changes" : "Add Card"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
