import Link from "next/link";
import { ArrowRight, Cpu, Shirt } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-8">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Banner 1 — Electronics */}
          <Link href="/category/electronics" className="group">
            <div className="relative h-52 md:h-60 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
              <div className="absolute inset-0 p-7 flex flex-col justify-center relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-blue-100 text-xs font-medium w-fit mb-3">
                  <Cpu className="w-3.5 h-3.5" />
                  Electronics
                </div>
                <h3 className="text-white text-2xl sm:text-3xl font-bold leading-tight">
                  Latest Gadgets
                  <br />
                  <span className="text-blue-200 font-normal text-xl sm:text-2xl">
                    Up to 40% off
                  </span>
                </h3>
                <span className="inline-flex items-center gap-1.5 mt-4 text-white font-medium group-hover:gap-2.5 transition-all">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              {/* Decorative */}
              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute right-12 top-8 w-24 h-24 rounded-full bg-blue-400/20 blur-xl" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
          </Link>

          {/* Banner 2 — Fashion */}
          <Link href="/category/fashion" className="group">
            <div className="relative h-52 md:h-60 rounded-2xl overflow-hidden bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-700">
              <div className="absolute inset-0 p-7 flex flex-col justify-center relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-pink-100 text-xs font-medium w-fit mb-3">
                  <Shirt className="w-3.5 h-3.5" />
                  Fashion
                </div>
                <h3 className="text-white text-2xl sm:text-3xl font-bold leading-tight">
                  Spring Collection
                  <br />
                  <span className="text-pink-200 font-normal text-xl sm:text-2xl">
                    New arrivals weekly
                  </span>
                </h3>
                <span className="inline-flex items-center gap-1.5 mt-4 text-white font-medium group-hover:gap-2.5 transition-all">
                  Explore Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              {/* Decorative */}
              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute right-12 top-8 w-24 h-24 rounded-full bg-pink-400/20 blur-xl" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
