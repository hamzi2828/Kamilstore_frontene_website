const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Vendor {
  _id: string;
  shopName: string;
  shopTitle: string;
  logo: string | null;
  address: string;
  description: string;
  owner: {
    name: string;
    email: string;
    phone?: string;
  } | null;
  createdAt: string;
}

export interface VendorsPagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface VendorsResponse {
  success: boolean;
  data: Vendor[];
  pagination: VendorsPagination;
}

export async function getVendors(params?: {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<VendorsResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.sort) query.set("sort", params.sort);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  const res = await fetch(`${API}/api/public/vendors?${query.toString()}`);
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Failed to load vendors");
  return json;
}

export async function getVendorById(id: string): Promise<{ success: boolean; data: Vendor }> {
  const res = await fetch(`${API}/api/public/vendors/${id}`);
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Vendor not found");
  return json;
}
