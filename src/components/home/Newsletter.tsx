"use client";

import { useState, useRef } from "react";
import "@/styling/Newsletter.css";
import { Send, Check, Mail, Zap, Tag, Star, Shield } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };



  return (
    <section className="ks-nl site-container">
      <div className="ks-nl-wrap">
        <div className="ks-nl-blob1" />
        <div className="ks-nl-blob2" />
        <div className="ks-nl-dots" />

        <div className="ks-nl-inner">
          {/* Left */}
          <div className="ks-nl-left">
            <div className="ks-nl-eyebrow">
              <Mail style={{ width: 11, height: 11 }} />
              {t("home.newsletter.eyebrow")}
            </div>
            <h2 className="ks-nl-heading">
              {t("home.newsletter.headingLine1")}<br />
              <span>{t("home.newsletter.headingLine2")}</span>
            </h2>
            <p className="ks-nl-sub">
              {t("home.newsletter.subtitle")}
            </p>


            {/* Subscriber count */}
            <div className="ks-nl-count">
              <div className="ks-nl-count-avatars">
                {["#EA6B0E", "#3B82F6", "#10B981", "#A855F7"].map((color, i) => (
                  <div key={i} className="ks-nl-count-avatar" style={{ background: color, color: "#fff" }}>
                    {["A", "M", "S", "K"][i]}
                  </div>
                ))}
              </div>
              <span className="ks-nl-count-text">
                <strong>40,000+</strong> {t("home.newsletter.subscribersJoined")}
              </span>
            </div>
          </div>

          <div className="ks-nl-divider" />

          {/* Right */}
          <div className="ks-nl-right">
            {submitted ? (
              <div className="ks-nl-success">
                <div className="ks-nl-success-icon">
                  <Check style={{ width: 24, height: 24, color: "#34D399" }} />
                </div>
                <p className="ks-nl-success-title">{t("home.newsletter.successTitle")}</p>
                <p className="ks-nl-success-sub">
                  {t("home.newsletter.successSub")}
                </p>
              </div>
            ) : (
              <>
                <div className="ks-nl-label">{t("home.newsletter.emailLabel")}</div>
                <div className="ks-nl-input-wrap">
                  <div className={`ks-nl-field ${focused ? "focused" : ""}`}
                    onClick={() => inputRef.current?.focus()}>
                    <Mail style={{ width: 16, height: 16, color: focused ? "#FB923C" : "#4B5563", flexShrink: 0, transition: "color 0.2s" }} />
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      onKeyDown={e => e.key === "Enter" && handleSubmit(e as any)}
                      placeholder="you@example.com"
                    />
                  </div>
                  <button className="ks-nl-btn" onClick={handleSubmit}>
                    {t("home.newsletter.subscribeBtn")}
                    <Send style={{ width: 14, height: 14 }} />
                  </button>
                </div>
                <div className="ks-nl-trust">
                  <Shield style={{ width: 12, height: 12, color: "#34D399", flexShrink: 0 }} />
                  {t("home.newsletter.trust")}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
