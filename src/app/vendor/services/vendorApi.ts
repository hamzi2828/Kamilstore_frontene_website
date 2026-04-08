const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface VendorDetail {
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

export async function getVendorDetail(id: string): Promise<VendorDetail> {
  const res = await fetch(`${API}/api/public/vendors/${id}`);
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Vendor not found");
  return json.data;
}

export function getLogoUrl(logo: string | null): string | null {
  if (!logo) return null;
  return logo.startsWith("http") ? logo : `${API}${logo}`;
}
