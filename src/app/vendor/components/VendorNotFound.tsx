"use client";

import Link from "next/link";
import { Store } from "@/components/icons";
import { useLanguage } from "@/lib/i18n";

export default function VendorNotFound() {
  const { t } = useLanguage();

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "50vh", gap: 12 }}>
      <Store style={{ width: 40, height: 40, color: "#ddd" }} />
      <p style={{ fontSize: 16, fontWeight: 600, color: "#555" }}>{t("vendor.notFound")}</p>
      <Link href="/vendors" style={{ fontSize: 13, color: "#EA6B0E", textDecoration: "none", fontWeight: 600 }}>
        {t("vendor.browseAllVendors")}
      </Link>
    </div>
  );
}
