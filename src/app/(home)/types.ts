export type BannerType = "hero" | "promo";

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  badge?: string;
  image: string;
  link?: string;
  type: BannerType;
  position: number;
  isActive: boolean;
}
