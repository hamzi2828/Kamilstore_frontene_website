export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  images: string[];
  category: Category;
  vendor: Vendor;
  costPrice: number;
  sellingPrice: number;
  discountPrice?: number;
  quantity: number;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  parentCategory?: Category;
  productCount: number;
}

export interface Vendor {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage?: string;
  description: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  isVerified: boolean;
  joinedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}

export interface ProductVariant {
  _id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  attributes: Record<string, string>;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
}

export interface Address {
  _id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  shippingAddress: Address;
  createdAt: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  variant?: ProductVariant;
}

export interface Review {
  _id: string;
  user: User;
  product: Product;
  rating: number;
  comment: string;
  createdAt: string;
}
