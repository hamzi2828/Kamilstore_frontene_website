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

export interface CartItemVendor {
  _id: string;
  name: string;
}

export interface CartItem {
  /** Client-side cart line id — stable for identical product+variant */
  _id: string;
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  sellingPrice: number;
  unitPrice: number;
  stock: number;
  quantity: number;
  variantSku?: string;
  variantLabel?: string;
  vendor?: CartItemVendor;
}

export interface AddToCartInput {
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  sellingPrice: number;
  unitPrice: number;
  stock: number;
  quantity?: number;
  variantSku?: string;
  variantLabel?: string;
  vendor?: CartItemVendor;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isReady: boolean;
  isAuthenticated: boolean;
  addItem: (item: AddToCartInput) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  refresh: () => Promise<void>;
}

const STORAGE_KEY = "ks:cart:v1";
const TOKEN_KEY = "ks_token";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CartContext = createContext<CartContextValue | undefined>(undefined);

const lineIdFor = (productId: string, variantSku?: string) =>
  variantSku ? `${productId}::${variantSku}` : productId;

const readLocalStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
};

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
};

interface ServerCartItem extends Omit<CartItem, "_id"> {
  lineId: string;
}

interface ServerCartResponse {
  success: boolean;
  data: { items?: ServerCartItem[] };
}

const toClient = (items: ServerCartItem[] | undefined): CartItem[] =>
  (items || []).map((i) => ({
    _id: i.lineId,
    productId: i.productId,
    slug: i.slug,
    name: i.name,
    image: i.image ?? null,
    sellingPrice: i.sellingPrice,
    unitPrice: i.unitPrice,
    stock: i.stock,
    quantity: i.quantity,
    variantSku: i.variantSku,
    variantLabel: i.variantLabel,
    vendor: i.vendor,
  }));

const toServerPayload = (item: CartItem) => ({
  lineId: item._id,
  productId: item.productId,
  slug: item.slug,
  name: item.name,
  image: item.image,
  sellingPrice: item.sellingPrice,
  unitPrice: item.unitPrice,
  stock: item.stock,
  quantity: item.quantity,
  variantSku: item.variantSku,
  variantLabel: item.variantLabel,
  vendor: item.vendor,
});

async function fetchServerCart(token: string): Promise<CartItem[]> {
  const res = await fetch(`${API}/api/cart`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = (await res.json()) as ServerCartResponse;
  return toClient(json?.data?.items);
}

async function postAddItem(token: string, item: CartItem): Promise<CartItem[]> {
  const res = await fetch(`${API}/api/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(toServerPayload(item)),
  });
  if (!res.ok) return [];
  const json = (await res.json()) as ServerCartResponse;
  return toClient(json?.data?.items);
}

async function putQuantity(token: string, lineId: string, quantity: number) {
  await fetch(`${API}/api/cart/items/${encodeURIComponent(lineId)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });
}

async function deleteLine(token: string, lineId: string) {
  await fetch(`${API}/api/cart/items/${encodeURIComponent(lineId)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function deleteCart(token: string) {
  await fetch(`${API}/api/cart`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function mergeCartToServer(token: string, items: CartItem[]): Promise<CartItem[]> {
  const res = await fetch(`${API}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ merge: true, items: items.map(toServerPayload) }),
  });
  if (!res.ok) return items;
  const json = (await res.json()) as ServerCartResponse;
  return toClient(json?.data?.items);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const tokenRef = useRef<string | null>(null);

  // Initial load: merge localStorage + server cart if logged in
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
          const merged = await mergeCartToServer(token, local);
          if (!active) return;
          setItems(merged);
          // Clear local stash now that server owns the truth
          try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
        } else {
          const server = await fetchServerCart(token);
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

  // React to login/logout by watching the token key across tabs + local changes
  useEffect(() => {
    const syncAuth = async () => {
      const token = getToken();
      if (token === tokenRef.current) return;
      tokenRef.current = token;
      setIsAuthenticated(!!token);

      if (!token) {
        // Logged out → keep whatever's in state, fall back to local
        setItems(readLocalStorage());
        return;
      }

      // Logged in → merge current state (likely from local) into server
      setItems((prev) => {
        // Kick off async merge; return current state synchronously
        (async () => {
          try {
            const merged = await mergeCartToServer(token, prev);
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

    // Poll same-tab for token changes (auth context mutates localStorage without firing storage events)
    const interval = window.setInterval(syncAuth, 1000);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(interval);
    };
  }, []);

  // Persist locally when logged out
  useEffect(() => {
    if (!isReady) return;
    if (tokenRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isReady]);

  const addItem = useCallback((input: AddToCartInput) => {
    const qtyToAdd = Math.max(1, input.quantity ?? 1);
    const lineId = lineIdFor(input.productId, input.variantSku);

    const newLine: CartItem = {
      _id: lineId,
      productId: input.productId,
      slug: input.slug,
      name: input.name,
      image: input.image,
      sellingPrice: input.sellingPrice,
      unitPrice: input.unitPrice,
      stock: input.stock || Number.MAX_SAFE_INTEGER,
      quantity: qtyToAdd,
      variantSku: input.variantSku,
      variantLabel: input.variantLabel,
      vendor: input.vendor,
    };

    // Optimistic local update
    setItems((prev) => {
      const existing = prev.find((i) => i._id === lineId);
      if (existing) {
        const stockCap = existing.stock || Number.MAX_SAFE_INTEGER;
        const nextQty = Math.min(stockCap, existing.quantity + qtyToAdd);
        return prev.map((i) => (i._id === lineId ? { ...existing, quantity: nextQty } : i));
      }
      return [...prev, { ...newLine, quantity: Math.min(newLine.stock, qtyToAdd) }];
    });

    const token = tokenRef.current;
    if (token) {
      postAddItem(token, newLine).then((serverItems) => {
        if (serverItems.length > 0) setItems(serverItems);
      }).catch(() => { /* optimistic state already reflects */ });
    }
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    let updatedQty = quantity;
    setItems((prev) =>
      prev.map((i) => {
        if (i._id !== lineId) return i;
        const capped = Math.max(1, Math.min(i.stock || Number.MAX_SAFE_INTEGER, quantity));
        updatedQty = capped;
        return { ...i, quantity: capped };
      })
    );
    const token = tokenRef.current;
    if (token) putQuantity(token, lineId, updatedQty).catch(() => {});
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((i) => i._id !== lineId));
    const token = tokenRef.current;
    if (token) deleteLine(token, lineId).catch(() => {});
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    const token = tokenRef.current;
    if (token) deleteCart(token).catch(() => {});
  }, []);

  const refresh = useCallback(async () => {
    const token = tokenRef.current;
    if (!token) return;
    try {
      const server = await fetchServerCart(token);
      setItems(server);
    } catch {
      // ignore — keep current state
    }
  }, []);

  const { totalItems, subtotal } = useMemo(() => {
    let ti = 0;
    let sub = 0;
    for (const i of items) {
      ti += i.quantity;
      sub += i.unitPrice * i.quantity;
    }
    return { totalItems: ti, subtotal: sub };
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems,
      subtotal,
      isReady,
      isAuthenticated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      refresh,
    }),
    [items, totalItems, subtotal, isReady, isAuthenticated, addItem, updateQuantity, removeItem, clearCart, refresh]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
