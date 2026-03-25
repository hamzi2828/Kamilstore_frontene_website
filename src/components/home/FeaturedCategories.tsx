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
  { name: "Electronics", slug: "electronics", icon: Smartphone, count: "2.4k+" },
  { name: "Fashion", slug: "fashion", icon: Shirt, count: "3.1k+" },
  { name: "Home & Garden", slug: "home-garden", icon: Home, count: "1.8k+" },
  { name: "Sports", slug: "sports", icon: Dumbbell, count: "950+" },
  { name: "Beauty", slug: "beauty", icon: Sparkles, count: "1.2k+" },
  { name: "Gaming", slug: "gaming", icon: Gamepad2, count: "780+" },
  { name: "Watches", slug: "watches", icon: Watch, count: "540+" },
  { name: "Automotive", slug: "automotive", icon: Car, count: "420+" },
];

export default function FeaturedCategories() {
  return (
    <section className="site-container">
      <div className="bg-white rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-[#333]">Categories</h2>
          <Link href="/categories" className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-0.5">
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
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#666] group-hover:text-orange-500 transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-[#333] group-hover:text-orange-500 transition-colors leading-tight">
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-[#999] mt-0.5">{cat.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
