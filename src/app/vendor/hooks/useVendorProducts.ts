"use client";

import { useEffect, useState } from "react";
import { vendorApi } from "../service/vendorApi";
import type {
  VendorCategory,
  VendorProduct,
  VendorProductSort,
} from "../types";

interface UseVendorProductsArgs {
  vendorId: string | undefined;
  category?: string;
  sort?: VendorProductSort;
}

export const useVendorProducts = ({
  vendorId,
  category,
  sort = "featured",
}: UseVendorProductsArgs) => {
  const [products, setProducts] = useState<VendorProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!vendorId) return;
    let active = true;
    setIsLoading(true);
    vendorApi
      .getVendorProducts(vendorId, {
        category: category && category !== "all" ? category : undefined,
        sort,
        limit: 48,
      })
      .then(({ products, total }) => {
        if (!active) return;
        setProducts(products);
        setTotal(total);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [vendorId, category, sort]);

  return { products, total, isLoading };
};

export const useVendorCategories = (vendorId: string | undefined) => {
  const [categories, setCategories] = useState<VendorCategory[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!vendorId) return;
    let active = true;
    setIsLoading(true);
    vendorApi
      .getVendorCategories(vendorId)
      .then(({ categories, total }) => {
        if (!active) return;
        setCategories(categories);
        setTotal(total);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [vendorId]);

  return { categories, total, isLoading };
};
