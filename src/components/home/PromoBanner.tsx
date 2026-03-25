import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="site-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Electronics */}
        <Link href="/category/electronics" className="group">
          <div className="relative h-44 md:h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center z-10">
              <span className="text-blue-200 text-xs font-medium mb-1">Electronics</span>
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">Latest Gadgets</h3>
              <p className="text-blue-200/70 text-sm mb-4">Up to 40% off from verified sellers</p>
              <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium group-hover:gap-2 transition-all">
                Shop Now <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          </div>
        </Link>

        {/* Fashion */}
        <Link href="/category/fashion" className="group">
          <div className="relative h-44 md:h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-rose-500 to-pink-600">
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center z-10">
              <span className="text-pink-200 text-xs font-medium mb-1">Fashion</span>
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">Spring Collection</h3>
              <p className="text-pink-200/70 text-sm mb-4">New arrivals from top fashion vendors</p>
              <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium group-hover:gap-2 transition-all">
                Shop Now <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          </div>
        </Link>
      </div>
    </section>
  );
}
