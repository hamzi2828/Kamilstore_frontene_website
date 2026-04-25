"use client";

import { useCallback, useEffect, useState } from "react";
import { reviewsApi, type ProductReview, type ReviewsSummary } from "../service/reviewsApi";

const emptySummary: ReviewsSummary = {
  total: 0,
  average: 0,
  breakdown: {},
  reviews: [],
};

export const useReviews = (slug: string | undefined, productId: string | undefined) => {
  const [summary, setSummary] = useState<ReviewsSummary>(emptySummary);
  const [mine, setMine] = useState<ProductReview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!slug) return;
    setIsLoading(true);
    try {
      const [s, m] = await Promise.all([
        reviewsApi.listBySlug(slug),
        productId ? reviewsApi.getMine(productId) : Promise.resolve(null),
      ]);
      setSummary(s);
      setMine(m);
    } finally {
      setIsLoading(false);
    }
  }, [slug, productId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const submit = useCallback(
    async (rating: number, comment: string) => {
      if (!productId) return;
      setError("");
      setIsSaving(true);
      try {
        await reviewsApi.upsert(productId, rating, comment);
        await refresh();
      } catch (err) {
        setError((err as Error).message);
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [productId, refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      setError("");
      try {
        await reviewsApi.remove(id);
        await refresh();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [refresh]
  );

  return { summary, mine, isLoading, isSaving, error, submit, remove, refresh };
};
