"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, Store, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import "@/styling/AuthPages.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to account
  if (user) {
    router.replace("/account");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/account");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
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

          {error && (
            <div style={{
              padding: "12px 16px",
              borderRadius: 10,
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              color: "#DC2626",
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 4,
            }}>
              {error}
            </div>
          )}

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
                  disabled={submitting}
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
                  disabled={submitting}
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

            <button type="submit" className="ks-auth-submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="w-[18px] h-[18px] animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-[18px] h-[18px]" />
                </>
              )}
            </button>
          </form>

          <p className="ks-auth-switch">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="ks-auth-switch-link">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
