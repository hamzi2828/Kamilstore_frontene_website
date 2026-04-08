"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings, User, Lock, Bell, Globe, Eye, EyeOff,
  Save, ShieldCheck, Smartphone, Mail, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useAuth } from "@/lib/auth-context";
import { updateProfile, updatePassword as updatePw } from "@/app/account/services/accountApi";
import "@/styling/SettingsPage.css";

export default function SettingsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [notifications, setNotifications] = useState({
    orderUpdates: true, promotions: true, newsletter: false, sms: false,
  });

  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Populate form when user loads
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <div style={{ fontSize: 14, color: "#9CA3AF" }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications((p) => ({ ...p, [key]: !p[key] }));
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      await updateProfile(user._id, {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });
      setProfileMsg({ type: "success", text: "Profile updated successfully" });
      window.location.reload();
    } catch (err: unknown) {
      setProfileMsg({ type: "error", text: err instanceof Error ? err.message : "Update failed" });
    } finally {
      setProfileSaving(false);
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (passwords.newPass !== passwords.confirm) {
      setPasswordMsg({ type: "error", text: "New passwords do not match" });
      return;
    }
    if (passwords.newPass.length < 6) {
      setPasswordMsg({ type: "error", text: "New password must be at least 6 characters" });
      return;
    }

    setPasswordSaving(true);
    try {
      await updatePw(passwords.current, passwords.newPass);
      setPasswords({ current: "", newPass: "", confirm: "" });
      setPasswordMsg({ type: "success", text: "Password updated successfully" });
    } catch (err: unknown) {
      setPasswordMsg({ type: "error", text: err instanceof Error ? err.message : "Update failed" });
    } finally {
      setPasswordSaving(false);
    }
  };

  const MsgBanner = ({ msg }: { msg: { type: "success" | "error"; text: string } }) => (
    <div style={{
      padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 500,
      display: "flex", alignItems: "center", gap: 8, marginBottom: 4,
      background: msg.type === "success" ? "#ECFDF5" : "#FEF2F2",
      border: `1px solid ${msg.type === "success" ? "#A7F3D0" : "#FECACA"}`,
      color: msg.type === "success" ? "#059669" : "#DC2626",
    }}>
      {msg.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {msg.text}
    </div>
  );

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
          <form onSubmit={saveProfile}>
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

              {profileMsg && <div style={{ padding: "0 24px" }}><MsgBanner msg={profileMsg} /></div>}

              <div className="ks-set-form-grid">
                <div className="ks-set-field" style={{ gridColumn: "1 / -1" }}>
                  <label className="ks-set-label">Full Name</label>
                  <input type="text" name="name" value={profile.name} onChange={handleProfile} className="ks-set-input" required disabled={profileSaving} />
                </div>
                <div className="ks-set-field">
                  <label className="ks-set-label">Email Address</label>
                  <div className="ks-set-input-icon-wrap">
                    <Mail className="ks-set-input-pre-icon" />
                    <input type="email" name="email" value={profile.email} onChange={handleProfile} className="ks-set-input ks-set-input-with-icon" required disabled={profileSaving} />
                  </div>
                </div>
                <div className="ks-set-field">
                  <label className="ks-set-label">Phone Number</label>
                  <div className="ks-set-input-icon-wrap">
                    <Smartphone className="ks-set-input-pre-icon" />
                    <input type="tel" name="phone" value={profile.phone} onChange={handleProfile} className="ks-set-input ks-set-input-with-icon" disabled={profileSaving} />
                  </div>
                </div>
              </div>

              <div className="ks-set-card-footer">
                <button type="submit" className="ks-set-save-btn" disabled={profileSaving}>
                  {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {profileSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* ── Password Section ── */}
        <section className="site-container">
          <form onSubmit={savePassword}>
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

              {passwordMsg && <div style={{ padding: "0 24px" }}><MsgBanner msg={passwordMsg} /></div>}

              <div className="ks-set-form-grid ks-set-form-single">
                <div className="ks-set-field">
                  <label className="ks-set-label">Current Password</label>
                  <div className="ks-set-input-icon-wrap">
                    <input type={showPassword ? "text" : "password"} name="current" value={passwords.current} onChange={handlePassword} className="ks-set-input" placeholder="Enter current password" required disabled={passwordSaving} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="ks-set-input-post-icon">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="ks-set-field">
                  <label className="ks-set-label">New Password</label>
                  <input type={showPassword ? "text" : "password"} name="newPass" value={passwords.newPass} onChange={handlePassword} className="ks-set-input" placeholder="Enter new password" required minLength={6} disabled={passwordSaving} />
                </div>
                <div className="ks-set-field">
                  <label className="ks-set-label">Confirm New Password</label>
                  <input type={showPassword ? "text" : "password"} name="confirm" value={passwords.confirm} onChange={handlePassword} className="ks-set-input" placeholder="Confirm new password" required disabled={passwordSaving} />
                </div>
              </div>

              <div className="ks-set-card-footer">
                <button type="submit" className="ks-set-save-btn" disabled={passwordSaving}>
                  {passwordSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  {passwordSaving ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          </form>
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
