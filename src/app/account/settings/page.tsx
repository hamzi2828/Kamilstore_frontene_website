"use client";

import { useState } from "react";
import {
  Settings, User, Lock, Bell, Globe, Eye, EyeOff,
  Save, ShieldCheck, Smartphone, Mail,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/SettingsPage.css";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: "John", lastName: "Doe",
    email: "john.doe@example.com", phone: "+1 (555) 123-4567",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [notifications, setNotifications] = useState({
    orderUpdates: true, promotions: true, newsletter: false, sms: false,
  });

  const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications((p) => ({ ...p, [key]: !p[key] }));
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Account", href: "/account" }, { label: "Settings" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-400" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3.5">
                <div className="ks-set-icon-box">
                  <Settings className="w-[22px] h-[22px] text-purple-500" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                    Account Settings
                  </h1>
                  <p className="text-sm text-[#999] font-medium mt-1.5">
                    Manage your profile, security, and preferences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Profile Section ── */}
        <section className="site-container">
          <div className="ks-set-card">
            <div className="ks-set-card-header">
              <div className="ks-set-section-icon" style={{ background: "#FFF7ED", color: "#EA6B0E" }}>
                <User className="w-[18px] h-[18px]" />
              </div>
              <div>
                <h2 className="ks-set-card-title">Personal Information</h2>
                <p className="ks-set-card-sub">Update your name, email, and contact details</p>
              </div>
            </div>

            <div className="ks-set-form-grid">
              <div className="ks-set-field">
                <label className="ks-set-label">First Name</label>
                <input type="text" name="firstName" value={profile.firstName} onChange={handleProfile} className="ks-set-input" />
              </div>
              <div className="ks-set-field">
                <label className="ks-set-label">Last Name</label>
                <input type="text" name="lastName" value={profile.lastName} onChange={handleProfile} className="ks-set-input" />
              </div>
              <div className="ks-set-field">
                <label className="ks-set-label">Email Address</label>
                <div className="ks-set-input-icon-wrap">
                  <Mail className="ks-set-input-pre-icon" />
                  <input type="email" name="email" value={profile.email} onChange={handleProfile} className="ks-set-input ks-set-input-with-icon" />
                </div>
              </div>
              <div className="ks-set-field">
                <label className="ks-set-label">Phone Number</label>
                <div className="ks-set-input-icon-wrap">
                  <Smartphone className="ks-set-input-pre-icon" />
                  <input type="tel" name="phone" value={profile.phone} onChange={handleProfile} className="ks-set-input ks-set-input-with-icon" />
                </div>
              </div>
            </div>

            <div className="ks-set-card-footer">
              <button className="ks-set-save-btn"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
          </div>
        </section>

        {/* ── Password Section ── */}
        <section className="site-container">
          <div className="ks-set-card">
            <div className="ks-set-card-header">
              <div className="ks-set-section-icon" style={{ background: "#FEF2F2", color: "#EF4444" }}>
                <Lock className="w-[18px] h-[18px]" />
              </div>
              <div>
                <h2 className="ks-set-card-title">Change Password</h2>
                <p className="ks-set-card-sub">Update your password to keep your account secure</p>
              </div>
            </div>

            <div className="ks-set-form-grid ks-set-form-single">
              <div className="ks-set-field">
                <label className="ks-set-label">Current Password</label>
                <div className="ks-set-input-icon-wrap">
                  <input type={showPassword ? "text" : "password"} name="current" value={passwords.current} onChange={handlePassword} className="ks-set-input" placeholder="Enter current password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="ks-set-input-post-icon">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="ks-set-field">
                <label className="ks-set-label">New Password</label>
                <input type={showPassword ? "text" : "password"} name="newPass" value={passwords.newPass} onChange={handlePassword} className="ks-set-input" placeholder="Enter new password" />
              </div>
              <div className="ks-set-field">
                <label className="ks-set-label">Confirm New Password</label>
                <input type={showPassword ? "text" : "password"} name="confirm" value={passwords.confirm} onChange={handlePassword} className="ks-set-input" placeholder="Confirm new password" />
              </div>
            </div>

            <div className="ks-set-card-footer">
              <button className="ks-set-save-btn"><Lock className="w-4 h-4" /> Update Password</button>
            </div>
          </div>
        </section>

        {/* ── Notifications ── */}
        <section className="site-container">
          <div className="ks-set-card">
            <div className="ks-set-card-header">
              <div className="ks-set-section-icon" style={{ background: "#EFF6FF", color: "#3B82F6" }}>
                <Bell className="w-[18px] h-[18px]" />
              </div>
              <div>
                <h2 className="ks-set-card-title">Notification Preferences</h2>
                <p className="ks-set-card-sub">Choose what updates you&apos;d like to receive</p>
              </div>
            </div>

            <div className="ks-set-toggle-list">
              {([
                { key: "orderUpdates" as const, title: "Order Updates", desc: "Get notified about order status changes", icon: ShieldCheck },
                { key: "promotions" as const, title: "Promotions & Deals", desc: "Receive flash sale alerts and exclusive offers", icon: Globe },
                { key: "newsletter" as const, title: "Newsletter", desc: "Weekly newsletter with curated products", icon: Mail },
                { key: "sms" as const, title: "SMS Notifications", desc: "Receive text messages for important updates", icon: Smartphone },
              ]).map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="ks-set-toggle-row">
                    <div className="ks-set-toggle-info">
                      <Icon className="w-[18px] h-[18px] text-[#bbb]" />
                      <div>
                        <span className="ks-set-toggle-title">{item.title}</span>
                        <span className="ks-set-toggle-desc">{item.desc}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleNotif(item.key)}
                      className={`ks-set-toggle ${notifications[item.key] ? "ks-set-toggle-on" : ""}`}
                    >
                      <span className="ks-set-toggle-knob" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Danger Zone ── */}
        <section className="site-container">
          <div className="ks-set-danger-card">
            <div>
              <h3 className="ks-set-danger-title">Delete Account</h3>
              <p className="ks-set-danger-sub">Permanently delete your account and all associated data. This action cannot be undone.</p>
            </div>
            <button className="ks-set-danger-btn">Delete Account</button>
          </div>
        </section>
      </div>
    </>
  );
}
