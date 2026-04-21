import type { Banner, BannerType } from "../types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface BannersResponse {
  success: boolean;
  data: Banner[];
}

export const bannersApi = {
  getBanners: async (type?: BannerType): Promise<Banner[]> => {
    const query = type ? `?type=${type}` : "";
    try {
      const res = await fetch(`${API}/api/public/banners${query}`, {
        cache: "no-store",
      });
      if (!res.ok) return [];
      const json = (await res.json()) as BannersResponse;
      return json.success && Array.isArray(json.data) ? json.data : [];
    } catch {
      return [];
    }
  },
};
