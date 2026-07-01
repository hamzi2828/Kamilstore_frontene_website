"use client";

import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function VendorsEmpty() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center py-16 text-center">
      <Search className="w-10 h-10 text-[#ddd] mb-4" />
      <p className="text-base font-semibold text-[#555] mb-1">{t("vendor.noVendorsFound")}</p>
      <p className="text-sm text-[#999]">{t("vendor.tryDifferentSearch")}</p>
    </div>
  );
}
