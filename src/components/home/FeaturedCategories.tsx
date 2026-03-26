import Link from "next/link";
import {
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  Sparkles,
  Gamepad2,
  Watch,
  Car,
  ChevronRight,
} from "lucide-react";

const categories = [
  { name: "Electronics", slug: "electronics", icon: Smartphone, count: "2.4k+", color: "#3B82F6", bg: "#EFF6FF", hoverBg: "#DBEAFE" },
  { name: "Fashion", slug: "fashion", icon: Shirt, count: "3.1k+", color: "#EC4899", bg: "#FDF2F8", hoverBg: "#FCE7F3" },
  { name: "Home & Garden", slug: "home-garden", icon: Home, count: "1.8k+", color: "#10B981", bg: "#ECFDF5", hoverBg: "#D1FAE5" },
  { name: "Sports", slug: "sports", icon: Dumbbell, count: "950+", color: "#F59E0B", bg: "#FFFBEB", hoverBg: "#FEF3C7" },
  { name: "Beauty", slug: "beauty", icon: Sparkles, count: "1.2k+", color: "#A855F7", bg: "#FAF5FF", hoverBg: "#F3E8FF" },
  { name: "Gaming", slug: "gaming", icon: Gamepad2, count: "780+", color: "#EF4444", bg: "#FEF2F2", hoverBg: "#FEE2E2" },
  { name: "Watches", slug: "watches", icon: Watch, count: "540+", color: "#0EA5E9", bg: "#F0F9FF", hoverBg: "#E0F2FE" },
  { name: "Automotive", slug: "automotive", icon: Car, count: "420+", color: "#64748B", bg: "#F8FAFC", hoverBg: "#F1F5F9" },
];

export default function FeaturedCategories() {
  return (
    <section className="site-container">
      <div className="bg-white rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-[#333]">Categories</h2>
          <Link href="/categories" className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-0.5 transition-colors">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex flex-col items-center gap-2.5 group"
              >
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-md"
                  style={{
                    backgroundColor: cat.bg,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <Icon
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:scale-110"
                    style={{ color: cat.color }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-[#333] group-hover:text-[#111] transition-colors leading-tight">
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-[#bbb] mt-0.5 font-medium">{cat.count} items</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
