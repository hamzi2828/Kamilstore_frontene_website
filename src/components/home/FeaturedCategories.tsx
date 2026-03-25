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
} from "lucide-react";

const categories = [
  { name: "Electronics", slug: "electronics", icon: Smartphone, color: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white", count: "2.4k+" },
  { name: "Fashion", slug: "fashion", icon: Shirt, color: "bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white", count: "3.1k+" },
  { name: "Home & Garden", slug: "home-garden", icon: Home, color: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white", count: "1.8k+" },
  { name: "Sports", slug: "sports", icon: Dumbbell, color: "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white", count: "950+" },
  { name: "Beauty", slug: "beauty", icon: Sparkles, color: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white", count: "1.2k+" },
  { name: "Gaming", slug: "gaming", icon: Gamepad2, color: "bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white", count: "780+" },
  { name: "Watches", slug: "watches", icon: Watch, color: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white", count: "540+" },
  { name: "Automotive", slug: "automotive", icon: Car, color: "bg-slate-50 text-slate-600 group-hover:bg-slate-600 group-hover:text-white", count: "420+" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-14 bg-gray-50/80">
      <div className="site-container">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-500 mt-1.5">
              Browse our most popular categories
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            View All
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group"
              >
                <div className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${category.color} flex items-center justify-center transition-all duration-300`}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <span className="mt-3 text-sm font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors">
                    {category.name}
                  </span>
                  <span className="mt-0.5 text-xs text-gray-400">
                    {category.count} items
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1 text-orange-500 font-medium"
          >
            View All Categories &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
