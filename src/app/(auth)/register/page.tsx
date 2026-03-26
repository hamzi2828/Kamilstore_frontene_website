"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, ShieldCheck, Store } from "lucide-react";
import "@/styling/AuthPages.css";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "", agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="ks-auth-page">
      {/* Left: Branding */}
      <div className="ks-auth-brand">
        <div className="ks-auth-brand-bg" />
        <div className="ks-auth-brand-dots" />
        <div className="ks-auth-brand-glow-1" />
        <div className="ks-auth-brand-glow-2" />

        <div className="ks-auth-brand-content">
          <Link href="/" className="ks-auth-logo">
            <span className="ks-auth-logo-k">Kamil</span>
            <span className="ks-auth-logo-s">Store</span>
            <span className="ks-auth-logo-dot" />
          </Link>

          <h2 className="ks-auth-brand-title">Join the largest<br />multi-vendor marketplace</h2>
          <p className="ks-auth-brand-sub">
            Create your free account and start discovering amazing products from trusted sellers.
          </p>

          <div className="ks-auth-brand-features">
            <div className="ks-auth-brand-feature">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>100% Buyer Protection</span>
            </div>
            <div className="ks-auth-brand-feature">
              <Store className="w-5 h-5 text-blue-400" />
              <span>50,000+ Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="ks-auth-form-side">
        <div className="ks-auth-form-wrap">
          <Link href="/" className="ks-auth-mobile-logo">
            <span className="ks-auth-logo-k">Kamil</span>
            <span className="ks-auth-logo-s">Store</span>
            <span className="ks-auth-logo-dot" />
          </Link>

          <div className="ks-auth-form-header">
            <h1 className="ks-auth-form-title">Create Account</h1>
            <p className="ks-auth-form-sub">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="ks-auth-form">
            <div className="ks-auth-field">
              <label className="ks-auth-label">Full Name</label>
              <div className="ks-auth-input-wrap">
                <User className="ks-auth-input-icon" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="ks-auth-input" required />
              </div>
            </div>

            <div className="ks-auth-field">
              <label className="ks-auth-label">Email Address</label>
              <div className="ks-auth-input-wrap">
                <Mail className="ks-auth-input-icon" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="ks-auth-input" required />
              </div>
            </div>

            <div className="ks-auth-field">
              <label className="ks-auth-label">Phone Number</label>
              <div className="ks-auth-input-wrap">
                <Phone className="ks-auth-input-icon" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" className="ks-auth-input" />
              </div>
            </div>

            <div className="ks-auth-field">
              <label className="ks-auth-label">Password</label>
              <div className="ks-auth-input-wrap">
                <Lock className="ks-auth-input-icon" />
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Min 8 characters" className="ks-auth-input ks-auth-input-password" required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="ks-auth-eye-btn">
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            <div className="ks-auth-field">
              <label className="ks-auth-label">Confirm Password</label>
              <div className="ks-auth-input-wrap">
                <Lock className="ks-auth-input-icon" />
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" className="ks-auth-input" required />
              </div>
            </div>

            <label className="ks-auth-checkbox-wrap" style={{ marginBottom: 4 }}>
              <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="ks-auth-checkbox" required />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="ks-auth-link">Terms of Service</Link>{" "}and{" "}
                <Link href="/privacy" className="ks-auth-link">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" className="ks-auth-submit">
              Create Account <ArrowRight className="w-[18px] h-[18px]" />
            </button>
          </form>

          <div className="ks-auth-divider"><span>Or sign up with</span></div>

          <div className="ks-auth-social-row">
            <button className="ks-auth-social-btn">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="ks-auth-social-btn">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <p className="ks-auth-switch">
            Already have an account?{" "}
            <Link href="/login" className="ks-auth-switch-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
