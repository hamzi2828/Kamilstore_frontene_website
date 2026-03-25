"use client";

import { useState, useRef } from "react";
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .ks-nl * { font-family: 'Plus Jakarta Sans', sans-serif; }

        .ks-nl-wrap {
          position: relative;
          background: #1A1A2E;
          border-radius: 20px;
          overflow: hidden;
          padding: 48px 40px;
        }

        /* Decorative blobs */
        .ks-nl-blob1 {
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(234,107,14,0.22) 0%, transparent 70%);
          top: -80px; right: -60px;
          pointer-events: none;
        }
        .ks-nl-blob2 {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%);
          bottom: -40px; left: 10%;
          pointer-events: none;
        }
        /* Dot grid texture */
        .ks-nl-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }

        .ks-nl-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 48px;
        }

        /* Left column */
        .ks-nl-left { flex: 1; min-width: 0; }
        .ks-nl-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: rgba(234,107,14,0.15);
          border: 1px solid rgba(234,107,14,0.3);
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          color: #FB923C;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 14px;
        }
        .ks-nl-heading {
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 8px;
        }
        .ks-nl-heading span { color: #FB923C; }
        .ks-nl-sub {
          font-size: 14px;
          color: #9CA3AF;
          line-height: 1.6;
          margin: 0 0 20px;
        }
        .ks-nl-perks {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ks-nl-perk {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #D1D5DB;
        }

        /* Divider */
        .ks-nl-divider {
          width: 1px;
          height: 100px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
          flex-shrink: 0;
        }

        /* Right column */
        .ks-nl-right { flex: 1; min-width: 0; max-width: 380px; }

        .ks-nl-label {
          font-size: 12px;
          font-weight: 700;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 10px;
        }

        .ks-nl-input-wrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ks-nl-field {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 6px 6px 16px;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .ks-nl-field.focused {
          border-color: #EA6B0E;
          background: rgba(234,107,14,0.06);
          box-shadow: 0 0 0 3px rgba(234,107,14,0.12);
        }
        .ks-nl-field input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: none;
          outline: none;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          font-family: inherit;
        }
        .ks-nl-field input::placeholder { color: #4B5563; }

        .ks-nl-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 20px;
          background: #EA6B0E;
          color: #fff;
          border: none;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          flex-shrink: 0;
          white-space: nowrap;
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
          font-family: inherit;
          width: 100%;
        }
        .ks-nl-btn:hover {
          background: #D45D00;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(234,107,14,0.35);
        }
        .ks-nl-btn:active { transform: translateY(0); }

        .ks-nl-trust {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          font-size: 11.5px;
          color: #6B7280;
          font-weight: 500;
        }
        .ks-nl-trust::before {
          content: '🔒';
          font-size: 12px;
        }

        /* Success state */
        .ks-nl-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        .ks-nl-success-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(52,211,153,0.15);
          border: 1.5px solid rgba(52,211,153,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ks-nl-success-title {
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          margin: 0;
        }
        .ks-nl-success-sub {
          font-size: 13px;
          color: #9CA3AF;
          margin: 0;
          line-height: 1.5;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .ks-nl-wrap { padding: 32px 24px; }
          .ks-nl-inner { flex-direction: column; gap: 28px; }
          .ks-nl-divider { display: none; }
          .ks-nl-right { max-width: 100%; width: 100%; }
        }
      `}</style>

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