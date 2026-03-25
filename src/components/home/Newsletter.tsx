"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-500 via-orange-600 to-rose-600 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="site-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Stay in the Loop
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Get exclusive deals, new arrival alerts, and insider-only discounts
            delivered straight to your inbox.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-white bg-white/20 backdrop-blur-sm rounded-full py-4 px-6 max-w-md mx-auto">
              <Check className="w-5 h-5" />
              <span className="font-medium">
                Thanks for subscribing! Check your inbox.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-white text-orange-600 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/10"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="mt-4 text-white/50 text-xs">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
