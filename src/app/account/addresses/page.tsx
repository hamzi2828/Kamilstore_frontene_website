"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin, Plus, Edit2, Trash2, CheckCircle, Home,
  Building2, Phone, User, X,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useLanguage } from "@/lib/i18n";
import "@/styling/AddressesPage.css";

interface Address {
  _id: string;
  label: string;
  type: "home" | "office";
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    _id: "a1",
    label: "Home",
    type: "home",
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    _id: "a2",
    label: "Office",
    type: "office",
    name: "John Doe",
    phone: "+1 (555) 987-6543",
    address: "456 Business Ave, Floor 12",
    city: "New York",
    state: "NY",
    zipCode: "10018",
    country: "United States",
    isDefault: false,
  },
];

export default function AddressesPage() {
  const { t } = useLanguage();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    label: "", type: "home" as "home" | "office",
    name: "", phone: "", address: "", city: "", state: "", zipCode: "", country: "United States",
  });

  const resetForm = () => {
    setForm({ label: "", type: "home", name: "", phone: "", address: "", city: "", state: "", zipCode: "", country: "United States" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (addr: Address) => {
    setForm({
      label: addr.label, type: addr.type, name: addr.name, phone: addr.phone,
      address: addr.address, city: addr.city, state: addr.state, zipCode: addr.zipCode, country: addr.country,
    });
    setEditingId(addr._id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a._id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a._id === id })));
  };

  const handleSave = () => {
    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => a._id === editingId ? { ...a, ...form } : a)
      );
    } else {
      const newAddr: Address = {
        _id: `a${Date.now()}`, ...form, isDefault: addresses.length === 0,
      };
      setAddresses((prev) => [...prev, newAddr]);
    }
    resetForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Breadcrumb items={[{ label: t("common.account"), href: "/account" }, { label: t("account.nav.addresses") }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3.5">
                  <div className="ks-addr-icon-box">
                    <MapPin className="w-[22px] h-[22px] text-blue-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                      {t("account.addresses.title")}
                    </h1>
                    <p className="text-sm text-[#999] font-medium mt-1.5">
                      {addresses.length} {addresses.length !== 1 ? t("account.addresses.savedPlural") : t("account.addresses.savedSingular")}
                    </p>
                  </div>
                </div>
                <button onClick={() => { resetForm(); setShowForm(true); }} className="ks-addr-add-btn">
                  <Plus className="w-[18px] h-[18px]" />
                  {t("account.addresses.addAddress")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Address Cards ── */}
        <section className="site-container">
          <div className="ks-addr-grid">
            {addresses.map((addr) => {
              const TypeIcon = addr.type === "home" ? Home : Building2;
              return (
                <div key={addr._id} className={`ks-addr-card ${addr.isDefault ? "ks-addr-card-default" : ""}`}>
                  {/* Top row */}
                  <div className="ks-addr-card-top">
                    <div className="ks-addr-type-badge">
                      <TypeIcon className="w-3.5 h-3.5" />
                      {addr.label}
                    </div>
                    {addr.isDefault && (
                      <span className="ks-addr-default-badge">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {t("account.default")}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="ks-addr-card-body">
                    <div className="ks-addr-info-row">
                      <User className="ks-addr-info-icon" />
                      <span className="ks-addr-info-name">{addr.name}</span>
                    </div>
                    <div className="ks-addr-info-row">
                      <Phone className="ks-addr-info-icon" />
                      <span className="ks-addr-info-text">{addr.phone}</span>
                    </div>
                    <div className="ks-addr-info-row">
                      <MapPin className="ks-addr-info-icon" />
                      <span className="ks-addr-info-text">
                        {addr.address}<br />
                        {addr.city}, {addr.state} {addr.zipCode}<br />
                        {addr.country}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ks-addr-card-actions">
                    {!addr.isDefault && (
                      <button onClick={() => handleSetDefault(addr._id)} className="ks-addr-action-link ks-addr-action-default">
                        <CheckCircle className="w-3.5 h-3.5" /> {t("account.setDefault")}
                      </button>
                    )}
                    <button onClick={() => handleEdit(addr)} className="ks-addr-action-link ks-addr-action-edit">
                      <Edit2 className="w-3.5 h-3.5" /> {t("common.edit")}
                    </button>
                    <button onClick={() => handleDelete(addr._id)} className="ks-addr-action-link ks-addr-action-delete">
                      <Trash2 className="w-3.5 h-3.5" /> {t("common.delete")}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Add new card */}
            {!showForm && (
              <button onClick={() => { resetForm(); setShowForm(true); }} className="ks-addr-add-card">
                <div className="ks-addr-add-card-icon">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="ks-addr-add-card-text">{t("account.addresses.addNew")}</span>
              </button>
            )}
          </div>

          {/* Empty */}
          {addresses.length === 0 && !showForm && (
            <div className="ks-addr-empty">
              <div className="ks-addr-empty-icon"><MapPin className="w-10 h-10 text-[#ddd]" /></div>
              <h3 className="ks-addr-empty-title">{t("account.addresses.noneSaved")}</h3>
              <p className="ks-addr-empty-sub">{t("account.addresses.noneSavedSub")}</p>
              <button onClick={() => setShowForm(true)} className="ks-addr-empty-btn">
                <Plus className="w-[18px] h-[18px]" /> {t("account.addresses.addAddress")}
              </button>
            </div>
          )}
        </section>

        {/* ── Form Modal ── */}
        {showForm && (
          <div className="ks-addr-modal-overlay" onClick={resetForm}>
            <div className="ks-addr-modal" onClick={(e) => e.stopPropagation()}>
              <div className="ks-addr-modal-header">
                <h2 className="ks-addr-modal-title">
                  {editingId ? t("account.addresses.editAddress") : t("account.addresses.addNew")}
                </h2>
                <button onClick={resetForm} className="ks-addr-modal-close">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="ks-addr-modal-body">
                {/* Type selector */}
                <div className="ks-addr-type-row">
                  <button
                    onClick={() => setForm((p) => ({ ...p, type: "home", label: "Home" }))}
                    className={`ks-addr-type-btn ${form.type === "home" ? "ks-addr-type-btn-active" : ""}`}
                  >
                    <Home className="w-4 h-4" /> {t("account.addresses.home")}
                  </button>
                  <button
                    onClick={() => setForm((p) => ({ ...p, type: "office", label: "Office" }))}
                    className={`ks-addr-type-btn ${form.type === "office" ? "ks-addr-type-btn-active" : ""}`}
                  >
                    <Building2 className="w-4 h-4" /> {t("account.addresses.office")}
                  </button>
                </div>

                <div className="ks-addr-form-grid">
                  <div className="ks-addr-field-half">
                    <label className="ks-addr-label">{t("account.fields.fullName")}</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="ks-addr-input" placeholder="John Doe" />
                  </div>
                  <div className="ks-addr-field-half">
                    <label className="ks-addr-label">{t("account.addresses.phone")}</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="ks-addr-input" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="ks-addr-field-full">
                    <label className="ks-addr-label">{t("account.addresses.streetAddress")}</label>
                    <input type="text" name="address" value={form.address} onChange={handleChange} className="ks-addr-input" placeholder="123 Main Street" />
                  </div>
                  <div className="ks-addr-field-half">
                    <label className="ks-addr-label">{t("account.addresses.city")}</label>
                    <input type="text" name="city" value={form.city} onChange={handleChange} className="ks-addr-input" placeholder="New York" />
                  </div>
                  <div className="ks-addr-field-half">
                    <label className="ks-addr-label">{t("account.addresses.state")}</label>
                    <input type="text" name="state" value={form.state} onChange={handleChange} className="ks-addr-input" placeholder="NY" />
                  </div>
                  <div className="ks-addr-field-half">
                    <label className="ks-addr-label">{t("account.addresses.zipCode")}</label>
                    <input type="text" name="zipCode" value={form.zipCode} onChange={handleChange} className="ks-addr-input" placeholder="10001" />
                  </div>
                  <div className="ks-addr-field-half">
                    <label className="ks-addr-label">{t("account.addresses.country")}</label>
                    <select name="country" value={form.country} onChange={handleChange} className="ks-addr-input">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="ks-addr-modal-footer">
                <button onClick={resetForm} className="ks-addr-cancel-btn">{t("common.cancel")}</button>
                <button onClick={handleSave} className="ks-addr-save-btn">
                  {editingId ? t("common.saveChanges") : t("account.addresses.addAddress")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
