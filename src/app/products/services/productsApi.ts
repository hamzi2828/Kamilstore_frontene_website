const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ProductListItem {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  sellingPrice: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  category: { _id: string; name: string; slug: string } | null;
  vendor?: { name: string; slug: string };
}

export interface ProductsPagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ProductsResponse {
  success: boolean;
  data: ProductListItem[];
  pagination: ProductsPagination;
}

export interface GetProductsParams {
  search?: string;
  category?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function getProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category && params.category !== "all") query.set("category", params.category);
  if (params.subCategory && params.subCategory !== "all") query.set("subCategory", params.subCategory);
  if (params.minPrice != null && Number.isFinite(params.minPrice)) query.set("minPrice", String(params.minPrice));
  if (params.maxPrice != null && Number.isFinite(params.maxPrice)) query.set("maxPrice", String(params.maxPrice));
  if (params.sort) query.set("sort", params.sort);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  const res = await fetch(`${API}/api/public/products?${query.toString()}`, {
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Failed to load products");
  return json;
}
