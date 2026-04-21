const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface NavSubCategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface NavCategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  subCategories: NavSubCategory[];
}

interface CategoriesResponse {
  success: boolean;
  data: NavCategory[];
}

export const categoriesApi = {
  getCategories: async (): Promise<NavCategory[]> => {
    try {
      const res = await fetch(`${API}/api/public/categories`, {
        cache: "no-store",
      });
      if (!res.ok) return [];
      const json = (await res.json()) as CategoriesResponse;
      return json.success && Array.isArray(json.data) ? json.data : [];
    } catch {
      return [];
    }
  },
};
