import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "256-bit SSL encrypted",
    color: "text-purple-600 bg-purple-50",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated help center",
    color: "text-orange-600 bg-orange-50",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-10 border-b border-gray-100">
      <div className="site-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex items-center gap-4 p-4 rounded-xl"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl ${badge.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {badge.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {badge.description}
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
