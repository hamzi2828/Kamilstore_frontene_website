"use client";

import { Truck, RotateCcw, ShieldCheck, BadgeCheck } from "@/components/icons";
import { useLanguage } from "@/lib/i18n";

const badges = [
  { icon: BadgeCheck, titleKey: "footer.verifiedSellers", descKey: "home.trust.verifiedDesc" },
  { icon: ShieldCheck, titleKey: "footer.buyerProtection", descKey: "home.trust.protectionDesc" },
  { icon: Truck, titleKey: "home.trust.freeDelivery", descKey: "home.trust.freeDeliveryDesc" },
  { icon: RotateCcw, titleKey: "home.trust.returns", descKey: "home.trust.returnsDesc" },
];

export default function TrustBadges() {
  const { t } = useLanguage();
  return (
    <section className="site-container">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.titleKey}
                className="flex items-center gap-2.5 sm:gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:px-5 min-w-0"
              >
                <Icon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-[#333] text-[13px] sm:text-sm leading-tight truncate">
                    {t(b.titleKey)}
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#999] leading-snug mt-0.5 line-clamp-2">
                    {t(b.descKey)}
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
