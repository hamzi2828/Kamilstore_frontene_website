"use client";

import { useEffect, useState } from "react";
import { categoriesApi, type NavCategory } from "../service/categoriesApi";

export const useNavCategories = () => {
  const [categories, setCategories] = useState<NavCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    categoriesApi
      .getCategories()
      .then((data) => {
        if (!active) return;
        setCategories(data);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { categories, isLoading };
};
