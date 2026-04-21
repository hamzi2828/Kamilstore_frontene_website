"use client";

import { useEffect, useState } from "react";
import { vendorApi } from "../service/vendorApi";
import type { VendorDetail } from "../types";

export const useVendor = (slug: string | undefined) => {
  const [vendor, setVendor] = useState<VendorDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setIsLoading(true);
    setError("");
    vendorApi
      .getVendor(slug)
      .then((data) => {
        if (active) setVendor(data);
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  return { vendor, isLoading, error };
};
