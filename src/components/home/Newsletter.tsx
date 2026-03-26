"use client";

import { useState, useRef } from "react";
import "@/styling/Newsletter.css";
import { Send, Check, Mail, Zap, Tag, Star, Shield } from "lucide-react";

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



  return (
    <section className="ks-nl " style={{ maxWidth: 1380, margin: "0 auto", padding: "0 20px" }}>
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
                <strong>40,000+</strong> subscribers already joined
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
                <p className="ks-nl-success-title">You're in!</p>
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
                  <Shield style={{ width: 12, height: 12, color: "#34D399", flexShrink: 0 }} />
                  No spam, ever. Unsubscribe in one click.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
