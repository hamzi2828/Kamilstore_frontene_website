import type { ProductDetailResponse } from "../types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: ProductDetailResponse;
}

export const productApi = {
  getProduct: async (slug: string): Promise<ProductDetailResponse> => {
    const res = await fetch(`${API}/api/public/products/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    const json = (await res.json()) as ApiResponse;
    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.message || "Product not found");
    }
    return json.data;
  },

  getImageUrl: (src: string | null | undefined): string | null => {
    if (!src) return null;
    return src.startsWith("http") ? src : `${API}${src}`;
  },
};
