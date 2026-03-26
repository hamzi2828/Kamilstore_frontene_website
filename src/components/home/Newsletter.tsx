"use client";

import { useState, useRef } from "react";
import "@/styling/Newsletter.css";
import { Send, Check, Mail, Zap, Tag, Star } from "lucide-react";

export default function Newsletter() {
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

  const perks = [
    { icon: Tag, label: "Exclusive deals" },
    { icon: Zap, label: "Flash sale alerts" },
    { icon: Star, label: "Insider-only offers" },
  ];

  return (
    <>
      <section className="ks-nl" style={{ maxWidth: 1380, margin: "0 auto", padding: "0 20px" }}>
        <div className="ks-nl-wrap">
          <div className="ks-nl-blob1" />
          <div className="ks-nl-blob2" />
          <div className="ks-nl-dots" />

          <div className="ks-nl-inner">
            {/* Left */}
            <div className="ks-nl-left">
              <div className="ks-nl-eyebrow">
                <Mail style={{ width: 11, height: 11 }} />
                Newsletter
              </div>
              <h2 className="ks-nl-heading">
                Get the best deals<br />
                <span>before anyone else</span>
              </h2>
              <p className="ks-nl-sub">
                Join 40,000+ smart shoppers. We send only what's worth your attention — never spam.
              </p>
              <div className="ks-nl-perks">
                {perks.map(({ icon: Icon, label }) => (
                  <div key={label} className="ks-nl-perk">
                    <Icon style={{ width: 12, height: 12, color: "#FB923C" }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="ks-nl-divider" />

            {/* Right */}
            <div className="ks-nl-right">
              {submitted ? (
                <div className="ks-nl-success">
                  <div className="ks-nl-success-icon">
                    <Check style={{ width: 22, height: 22, color: "#34D399" }} />
                  </div>
                  <p className="ks-nl-success-title">You're in! 🎉</p>
                  <p className="ks-nl-success-sub">
                    Welcome to the inner circle. Check your inbox for a welcome gift.
                  </p>
                </div>
              ) : (
                <>
                  <div className="ks-nl-label">Your email address</div>
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
                      Subscribe for free
                      <Send style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                  <div className="ks-nl-trust">
                    No spam, ever. Unsubscribe in one click.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}