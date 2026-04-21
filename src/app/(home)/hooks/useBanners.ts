"use client";

import { useEffect, useState } from "react";
import { bannersApi } from "../service/bannersApi";
import type { Banner, BannerType } from "../types";

export const useBanners = (type?: BannerType) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    bannersApi
      .getBanners(type)
      .then((data) => {
        if (!active) return;
        setBanners(data);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [type]);

  return { banners, isLoading };
};
