"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, Store } from "lucide-react";
import "@/styling/AuthPages.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="ks-auth-page">
      {/* Left: Branding panel */}
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

          <h2 className="ks-auth-brand-title">Welcome back to<br />your marketplace</h2>
          <p className="ks-auth-brand-sub">
            Shop from 1,200+ verified sellers with buyer protection on every order.
          </p>

          <div className="ks-auth-brand-features">
            <div className="ks-auth-brand-feature">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Buyer Protection</span>
            </div>
            <div className="ks-auth-brand-feature">
              <Store className="w-5 h-5 text-blue-400" />
              <span>1,200+ Verified Sellers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="ks-auth-form-side">
        <div className="ks-auth-form-wrap">
          {/* Mobile logo */}
          <Link href="/" className="ks-auth-mobile-logo">
            <span className="ks-auth-logo-k">Kamil</span>
            <span className="ks-auth-logo-s">Store</span>
            <span className="ks-auth-logo-dot" />
          </Link>

          <div className="ks-auth-form-header">
            <h1 className="ks-auth-form-title">Sign In</h1>
            <p className="ks-auth-form-sub">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="ks-auth-form">
            <div className="ks-auth-field">
              <label className="ks-auth-label">Email Address</label>
              <div className="ks-auth-input-wrap">
                <Mail className="ks-auth-input-icon" />
                <input
                  type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="ks-auth-input" required
                />
              </div>
            </div>

            <div className="ks-auth-field">
              <label className="ks-auth-label">Password</label>
              <div className="ks-auth-input-wrap">
                <Lock className="ks-auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="ks-auth-input ks-auth-input-password" required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="ks-auth-eye-btn">
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            <div className="ks-auth-options">
              <label className="ks-auth-checkbox-wrap">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="ks-auth-checkbox" />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="ks-auth-link">Forgot password?</Link>
            </div>

            <button type="submit" className="ks-auth-submit">
              Sign In <ArrowRight className="w-[18px] h-[18px]" />
            </button>
          </form>

          {/* Divider */}
          <div className="ks-auth-divider">
            <span>Or continue with</span>
          </div>

          {/* Social */}
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
            Don&apos;t have an account?{" "}
            <Link href="/register" className="ks-auth-switch-link">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
