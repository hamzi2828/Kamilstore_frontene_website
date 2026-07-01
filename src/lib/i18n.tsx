"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { core } from "./i18n-sections/core";
import { home } from "./i18n-sections/home";
import { catalog as catalogSection } from "./i18n-sections/catalog";
import { product } from "./i18n-sections/product";
import { vendor } from "./i18n-sections/vendor";
import { cart } from "./i18n-sections/cart";
import { account } from "./i18n-sections/account";
import { auth } from "./i18n-sections/auth";

export type Locale = "en" | "it";

const LOCALE_STORAGE_KEY = "ks.web.locale";
const LOCALE_COOKIE_KEY = "ks_web_locale";
const DEFAULT_LOCALE: Locale = "en";

type Messages = Record<string, string>;

// Merge order: core first (shared chrome), then per-area section catalogs append
// and fill gaps. Keys are flat, dotted strings (e.g. "common.addToCart").
const sections = [
  core,
  home,
  catalogSection,
  product,
  vendor,
  cart,
  account,
  auth,
];

const buildCatalog = (locale: Locale): Messages => {
  const merged: Messages = {};
  for (const sec of sections) {
    Object.assign(merged, sec[locale] ?? {});
  }
  return merged;
};

const en: Messages = buildCatalog("en");
const it: Messages = buildCatalog("it");

const catalogs: Record<Locale, Messages> = { en, it };

export const SUPPORTED_LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "it", label: "IT", flag: "🇮🇹" },
];

type LanguageContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const readInitialLocale = (): Locale => {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const fromStorage = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (fromStorage === "en" || fromStorage === "it") return fromStorage;
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${LOCALE_COOKIE_KEY}=([^;]+)`),
    );
    if (match && (match[1] === "en" || match[1] === "it")) {
      return match[1] as Locale;
    }
  } catch {
    // ignore
  }
  return DEFAULT_LOCALE;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from cookie/localStorage after mount to keep SSR markup deterministic.
  useEffect(() => {
    const detected = readInitialLocale();
    if (detected !== locale) setLocaleState(detected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the document language in sync for accessibility / SEO.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      document.cookie = `${LOCALE_COOKIE_KEY}=${next}; path=/; max-age=${
        60 * 60 * 24 * 365
      }; samesite=lax`;
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const catalog = catalogs[locale];
      const raw = catalog[key] ?? catalogs.en[key] ?? key;
      if (!vars) return raw;
      return raw.replace(/\{(\w+)\}/g, (_, name) =>
        vars[name] != null ? String(vars[name]) : `{${name}}`,
      );
    },
    [locale],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (key, vars) => {
        const raw = en[key] ?? key;
        if (!vars) return raw;
        return raw.replace(/\{(\w+)\}/g, (_, name) =>
          vars[name] != null ? String(vars[name]) : `{${name}}`,
        );
      },
    };
  }
  return ctx;
};
