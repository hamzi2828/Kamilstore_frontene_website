"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface WishlistVendor {
  _id: string;
  name: string;
}

export interface WishlistItem {
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  sellingPrice: number;
  unitPrice: number;
  inStock: boolean;
  vendor?: WishlistVendor;
  addedAt: string;
}

export interface AddToWishlistInput {
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  sellingPrice: number;
  unitPrice: number;
  inStock?: boolean;
  vendor?: WishlistVendor;
}

interface WishlistContextValue {
  items: WishlistItem[];
  totalItems: number;
  isReady: boolean;
  isAuthenticated: boolean;
  isWishlisted: (productId: string) => boolean;
  addItem: (item: AddToWishlistInput) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: AddToWishlistInput) => boolean;
  clearWishlist: () => void;
  refresh: () => Promise<void>;
}

const STORAGE_KEY = "ks:wishlist:v1";
const TOKEN_KEY = "ks_token";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const readLocalStorage = (): WishlistItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as WishlistItem[]) : [];
  } catch {
    return [];
  }
};

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
};

interface ServerWishlistResponse {
  success: boolean;
  data: { items?: Array<Omit<WishlistItem, "addedAt"> & { addedAt?: string | Date }> };
}

const toClient = (items: ServerWishlistResponse["data"]["items"] | undefined): WishlistItem[] =>
  (items || []).map((i) => ({
    productId: i.productId,
    slug: i.slug,
    name: i.name,
    image: i.image ?? null,
    sellingPrice: i.sellingPrice,
    unitPrice: i.unitPrice,
    inStock: i.inStock !== false,
    vendor: i.vendor,
    addedAt: i.addedAt ? new Date(i.addedAt).toISOString() : new Date().toISOString(),
  }));

async function fetchServer(token: string): Promise<WishlistItem[]> {
  const res = await fetch(`${API}/api/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = (await res.json()) as ServerWishlistResponse;
  return toClient(json?.data?.items);
}

async function mergeToServer(token: string, items: WishlistItem[]): Promise<WishlistItem[]> {
  const res = await fetch(`${API}/api/wishlist`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ merge: true, items }),
  });
  if (!res.ok) return items;
  const json = (await res.json()) as ServerWishlistResponse;
  return toClient(json?.data?.items);
}

async function postAdd(token: string, item: WishlistItem) {
  await fetch(`${API}/api/wishlist/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

async function deleteItem(token: string, productId: string) {
  await fetch(`${API}/api/wishlist/items/${encodeURIComponent(productId)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function deleteAll(token: string) {
  await fetch(`${API}/api/wishlist`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    let active = true;
    const local = readLocalStorage();
    const token = getToken();
    tokenRef.current = token;
    setIsAuthenticated(!!token);

    if (!token) {
      setItems(local);
      setIsReady(true);
      return;
    }

    (async () => {
      try {
        if (local.length > 0) {
          const merged = await mergeToServer(token, local);
          if (!active) return;
          setItems(merged);
          try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
        } else {
          const server = await fetchServer(token);
          if (!active) return;
          setItems(server);
        }
      } finally {
        if (active) setIsReady(true);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const syncAuth = async () => {
      const token = getToken();
      if (token === tokenRef.current) return;
      tokenRef.current = token;
      setIsAuthenticated(!!token);

      if (!token) {
        setItems(readLocalStorage());
        return;
      }

      setItems((prev) => {
        (async () => {
          try {
            const merged = await mergeToServer(token, prev);
            setItems(merged);
            try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
          } catch {
            // ignore
          }
        })();
        return prev;
      });
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === TOKEN_KEY) syncAuth();
      if (e.key === STORAGE_KEY && !tokenRef.current) setItems(readLocalStorage());
    };
    window.addEventListener("storage", onStorage);

    const interval = window.setInterval(syncAuth, 1000);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (tokenRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isReady]);

  const isWishlisted = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  );

  const addItem = useCallback((input: AddToWishlistInput) => {
    const item: WishlistItem = {
      productId: input.productId,
      slug: input.slug,
      name: input.name,
      image: input.image,
      sellingPrice: input.sellingPrice,
      unitPrice: input.unitPrice,
      inStock: input.inStock !== false,
      vendor: input.vendor,
      addedAt: new Date().toISOString(),
    };

    setItems((prev) => {
      if (prev.some((i) => i.productId === item.productId)) return prev;
      return [...prev, item];
    });

    const token = tokenRef.current;
    if (token) postAdd(token, item).catch(() => {});
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    const token = tokenRef.current;
    if (token) deleteItem(token, productId).catch(() => {});
  }, []);

  const toggleItem = useCallback(
    (input: AddToWishlistInput): boolean => {
      let nowActive = false;
      setItems((prev) => {
        const existingIdx = prev.findIndex((i) => i.productId === input.productId);
        if (existingIdx >= 0) {
          nowActive = false;
          const token = tokenRef.current;
          if (token) deleteItem(token, input.productId).catch(() => {});
          return prev.filter((i) => i.productId !== input.productId);
        }
        const newItem: WishlistItem = {
          productId: input.productId,
          slug: input.slug,
          name: input.name,
          image: input.image,
          sellingPrice: input.sellingPrice,
          unitPrice: input.unitPrice,
          inStock: input.inStock !== false,
          vendor: input.vendor,
          addedAt: new Date().toISOString(),
        };
        const token = tokenRef.current;
        if (token) postAdd(token, newItem).catch(() => {});
        nowActive = true;
        return [...prev, newItem];
      });
      return nowActive;
    },
    []
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
    const token = tokenRef.current;
    if (token) deleteAll(token).catch(() => {});
  }, []);

  const refresh = useCallback(async () => {
    const token = tokenRef.current;
    if (!token) return;
    try {
      const server = await fetchServer(token);
      setItems(server);
    } catch {
      // ignore — keep current state
    }
  }, []);

  const totalItems = items.length;

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      totalItems,
      isReady,
      isAuthenticated,
      isWishlisted,
      addItem,
      removeItem,
      toggleItem,
      clearWishlist,
      refresh,
    }),
    [items, totalItems, isReady, isAuthenticated, isWishlisted, addItem, removeItem, toggleItem, clearWishlist, refresh]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
