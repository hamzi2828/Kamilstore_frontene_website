import type {
  VendorCategory,
  VendorDetail,
  VendorProduct,
  VendorProductSort,
} from "../types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ProductsResponse {
  success: boolean;
  data: VendorProduct[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

interface CategoriesResponse {
  success: boolean;
  data: VendorCategory[];
  total: number;
}

export interface VendorProductsQuery {
  category?: string;
  sort?: VendorProductSort;
  page?: number;
  limit?: number;
  search?: string;
}

export const vendorApi = {
  getVendor: async (id: string): Promise<VendorDetail> => {
    const res = await fetch(`${API}/api/public/vendors/${id}`);
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || "Vendor not found");
    }
    return json.data as VendorDetail;
  },

  getVendorProducts: async (
    id: string,
    params: VendorProductsQuery = {}
  ): Promise<{ products: VendorProduct[]; total: number }> => {
    const search = new URLSearchParams();
    if (params.category) search.append("category", params.category);
    if (params.sort) search.append("sort", params.sort);
    if (params.page) search.append("page", String(params.page));
    if (params.limit) search.append("limit", String(params.limit));
    if (params.search) search.append("search", params.search);

    try {
      const res = await fetch(
        `${API}/api/public/vendors/${id}/products?${search.toString()}`,
        { cache: "no-store" }
      );
      if (!res.ok) return { products: [], total: 0 };
      const json = (await res.json()) as ProductsResponse;
      if (!json.success) return { products: [], total: 0 };
      return {
        products: json.data || [],
        total: json.pagination?.total ?? json.data?.length ?? 0,
      };
    } catch {
      return { products: [], total: 0 };
    }
  },

  getVendorCategories: async (
    id: string
  ): Promise<{ categories: VendorCategory[]; total: number }> => {
    try {
      const res = await fetch(`${API}/api/public/vendors/${id}/categories`, {
        cache: "no-store",
      });
      if (!res.ok) return { categories: [], total: 0 };
      const json = (await res.json()) as CategoriesResponse;
      if (!json.success) return { categories: [], total: 0 };
      return { categories: json.data || [], total: json.total || 0 };
    } catch {
      return { categories: [], total: 0 };
    }
  },

  getLogoUrl: (logo: string | null): string | null => {
    if (!logo) return null;
    return logo.startsWith("http") ? logo : `${API}${logo}`;
  },
};
