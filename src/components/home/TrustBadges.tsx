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
      <div className="bg-white rounded-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className={`flex items-center gap-3 px-5 py-4 ${
                  i < badges.length - 1 ? "lg:border-r border-gray-100" : ""
                }`}
              >
                <Icon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#333] text-sm">{b.title}</p>
                  <p className="text-xs text-[#999]">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
