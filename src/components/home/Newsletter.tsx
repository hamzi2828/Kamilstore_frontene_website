"use client";

import { useState } from "react";
import { Send, Check, Mail } from "lucide-react";

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
    <section className="site-container">
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          {/* Left: icon + text */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="p-2.5 bg-orange-100 rounded-xl flex-shrink-0 mt-0.5">
              <Mail className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#333]">
                Stay in the Loop
              </h2>
              <p className="text-sm text-[#777] leading-relaxed mt-0.5">
                Exclusive deals, new arrivals & insider discounts — straight to your inbox.
              </p>
            </div>
          </div>

          {/* Right: form or success */}
          <div className="flex-1 min-w-0 md:max-w-sm">
            {submitted ? (
              <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl py-3 px-4">
                <div className="p-1 bg-emerald-100 rounded-full flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-emerald-700">You&apos;re subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 min-w-0 px-4 py-2.5 bg-white border border-orange-200 rounded-xl text-sm text-[#333] placeholder:text-[#bbb] focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-orange-500 text-white rounded-xl font-semibold text-sm hover:bg-orange-600 transition-colors flex items-center gap-1.5 flex-shrink-0"
                >
                  Subscribe
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
