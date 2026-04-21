"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useVendor } from "../hooks/useVendor";
import { VendorProfile, VendorProducts, VendorNotFound } from "../components";
import "@/styling/VendorPage.css";

export default function VendorPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { vendor, isLoading, error } = useVendor(slug);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <div style={{ fontSize: 14, color: "#9CA3AF" }}>Loading...</div>
      </div>
    );
  }

  if (error || !vendor) {
    return <VendorNotFound />;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Vendors", href: "/vendors" },
          { label: vendor.shopName },
        ]}
      />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        <section className="site-container">
          <VendorProfile vendor={vendor} />
        </section>

        <section className="site-container">
          <VendorProducts vendorId={vendor._id} />
        </section>
      </div>
    </>
  );
}
