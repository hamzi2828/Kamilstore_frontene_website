"use client";

import { useEffect, useState } from "react";
import { productApi } from "../service/productApi";
import type { ProductDetailResponse } from "../types";

export const useProduct = (slug: string | undefined) => {
  const [data, setData] = useState<ProductDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setIsLoading(true);
    setError("");
    productApi
      .getProduct(slug)
      .then((resp) => {
        if (active) setData(resp);
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

  return { data, isLoading, error };
};
