const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ReviewUser {
  _id: string;
  name: string;
}

export interface ProductReview {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: ReviewUser | null;
}

export interface ReviewsSummary {
  total: number;
  average: number;
  breakdown: Record<string, number>;
  reviews: ProductReview[];
}

interface ListResponse {
  success: boolean;
  data?: ReviewsSummary;
}

interface MineResponse {
  success: boolean;
  data: ProductReview | null;
}

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("ks_token");
};

export const reviewsApi = {
  listBySlug: async (slug: string): Promise<ReviewsSummary> => {
    try {
      const res = await fetch(
        `${API}/api/public/products/${encodeURIComponent(slug)}/reviews`,
        { cache: "no-store" }
      );
      if (!res.ok) return { total: 0, average: 0, breakdown: {}, reviews: [] };
      const json = (await res.json()) as ListResponse;
      return json.data ?? { total: 0, average: 0, breakdown: {}, reviews: [] };
    } catch {
      return { total: 0, average: 0, breakdown: {}, reviews: [] };
    }
  },

  getMine: async (productId: string): Promise<ProductReview | null> => {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(
      `${API}/api/reviews/mine?productId=${encodeURIComponent(productId)}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as MineResponse;
    return json.data || null;
  },

  upsert: async (
    productId: string,
    rating: number,
    comment: string
  ): Promise<ProductReview> => {
    const token = getToken();
    if (!token) throw new Error("You must be logged in to review");
    const res = await fetch(`${API}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, rating, comment }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || "Failed to save review");
    }
    return json.data as ProductReview;
  },

  remove: async (id: string): Promise<void> => {
    const token = getToken();
    if (!token) throw new Error("You must be logged in");
    const res = await fetch(`${API}/api/reviews/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.message || "Failed to delete review");
    }
  },
};
