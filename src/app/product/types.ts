export interface ProductCategoryRef {
  _id: string;
  name: string;
  slug: string;
}

export interface VariantAttributeValue {
  _id?: string;
  name?: string;
  slug?: string;
}

export interface ProductVariantAttribute {
  attribute: {
    _id: string;
    name: string;
    slug: string;
    values?: VariantAttributeValue[];
  } | null;
  values: string[];
}

export interface ProductVariantPricing {
  _id?: string;
  sku: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  discountType?: string;
  discountValue?: number;
  minStockLevel?: number;
  isActive: boolean;
  image?: string;
  combination: Array<{
    attribute: string;
    attributeName: string;
    value: string;
    valueName: string;
  }>;
}

export interface ProductDetail {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description?: string;
  category?: ProductCategoryRef | null;
  subCategory?: ProductCategoryRef | null;
  images?: string[];
  thumbnailImage?: string;
  galleryImages?: string[];
  hasVariants?: boolean;
  variantAttributes?: ProductVariantAttribute[];
  variantPricing?: ProductVariantPricing[];
  sellingType?: string;
  minOrderQuantity?: number;
  taxType?: string;
  isActive: boolean;
  createdAt?: string;
}

export interface ProductVendor {
  _id: string;
  userId: string;
  name: string;
  title?: string;
  logo: string | null;
  address?: string;
  description?: string;
  owner: { name: string; email: string; phone?: string } | null;
  productCount: number;
}

export interface RelatedProduct {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  sellingPrice: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  vendor?: { name: string; slug: string };
}

export interface ProductDetailResponse {
  product: ProductDetail;
  vendor: ProductVendor | null;
  related: RelatedProduct[];
}
