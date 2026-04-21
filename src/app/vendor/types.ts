export interface VendorOwner {
  name: string;
  email: string;
  phone?: string;
}

export interface VendorDetail {
  _id: string;
  shopName: string;
  shopTitle: string;
  logo: string | null;
  address: string;
  description: string;
  owner: VendorOwner | null;
  createdAt: string;
}

export interface VendorCategory {
  _id: string;
  name: string;
  slug: string;
  count: number;
}

export interface VendorProductCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface VendorProduct {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  images: string[];
  sellingPrice: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  variantCount: number;
  category: VendorProductCategory | null;
}

export type VendorProductSort =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "name-asc"
  | "name-desc";
