"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { SUPPORTED_LOCALES, useLanguage } from "@/lib/i18n";

type Accent = "blue" | "orange";

const accentActive: Record<Accent, string> = {
  blue: "text-blue-600 font-medium",
  orange: "text-orange-500 font-medium",
};

export function LanguageSwitcher({
  compact = false,
  accent = "orange",
  className = "",
}: {
  compact?: boolean;
  accent?: Accent;
  className?: string;
}) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current =
    SUPPORTED_LOCALES.find((l) => l.code === locale) ?? SUPPORTED_LOCALES[0];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
        title={t("header.language")}
      >
        {compact ? (
          <Globe className="w-3 h-3" />
        ) : (
          <>
            <Globe className="w-3 h-3" />
            <span className="leading-none">
              {current.flag} {current.label}
            </span>
          </>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-[80] border border-gray-200 overflow-hidden"
        >
          <div className="px-3 py-2 text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
            {t("header.language")}
          </div>
          {SUPPORTED_LOCALES.map((opt) => {
            const active = opt.code === locale;
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => {
                  setLocale(opt.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 ${
                  active ? accentActive[accent] : "text-gray-700"
                }`}
                role="menuitemradio"
                aria-checked={active}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{opt.flag}</span>
                  {opt.code === "en" ? "English" : "Italiano"}
                </span>
                {active && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
