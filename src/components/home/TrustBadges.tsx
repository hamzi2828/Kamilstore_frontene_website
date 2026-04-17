import { Truck, RotateCcw, ShieldCheck, BadgeCheck } from "lucide-react";

const badges = [
  { icon: BadgeCheck, title: "Verified Sellers", desc: "All vendors vetted & approved" },
  { icon: ShieldCheck, title: "Buyer Protection", desc: "100% purchase protection" },
  { icon: Truck, title: "Free Delivery", desc: "On orders over $50" },
  { icon: RotateCcw, title: "30-Day Returns", desc: "Money-back guarantee" },
];

export default function TrustBadges() {
  return (
    <section className="site-container">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="flex items-center gap-2.5 sm:gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:px-5 min-w-0"
              >
                <Icon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-[#333] text-[13px] sm:text-sm leading-tight truncate">
                    {b.title}
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#999] leading-snug mt-0.5 line-clamp-2">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
