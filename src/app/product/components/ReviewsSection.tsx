"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Star, Trash2 } from "lucide-react";
import VendorAvatar from "@/components/ui/VendorAvatar";
import { useAuth } from "@/lib/auth-context";
import { useReviews } from "../hooks/useReviews";

import type { ReviewsSummary } from "../service/reviewsApi";

interface ReviewsSectionProps {
  slug: string;
  productId: string;
  onSummaryChange?: (summary: ReviewsSummary) => void;
}

const StarRow = ({ value, size = 14 }: { value: number; size?: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`fill-current ${
          i < Math.round(value) ? "text-amber-400" : "text-gray-200"
        }`}
        style={{ width: size, height: size }}
      />
    ))}
  </div>
);

export default function ReviewsSection({ slug, productId, onSummaryChange }: ReviewsSectionProps) {
  const { user } = useAuth();
  const { summary, mine, isLoading, isSaving, error, submit, remove } = useReviews(
    slug,
    productId
  );

  useEffect(() => {
    onSummaryChange?.(summary);
  }, [summary, onSummaryChange]);

  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (mine) {
      setRating(mine.rating);
      setComment(mine.comment || "");
    } else {
      setRating(0);
      setComment("");
    }
  }, [mine]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) return;
    try {
      await submit(rating, comment.trim());
    } catch {
      // error state handled in hook
    }
  };

  return (
    <div>
      <div className="ks-pd-rating-summary">
        <div className="ks-pd-rating-big">
          <span className="ks-pd-rating-big-num">
            {summary.total > 0 ? summary.average.toFixed(1) : "0.0"}
          </span>
          <div className="flex gap-0.5 mt-2">
            <StarRow value={summary.average} size={20} />
          </div>
          <span className="ks-pd-rating-big-count">
            {summary.total} {summary.total === 1 ? "review" : "reviews"}
          </span>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = summary.breakdown?.[star] || 0;
            const pct = summary.total ? (count / summary.total) * 100 : 0;
            return (
              <div key={star} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                <span style={{ width: 14, textAlign: "right", color: "#6B7280" }}>{star}</span>
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <div style={{ flex: 1, height: 6, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "#F59E0B" }} />
                </div>
                <span style={{ width: 24, textAlign: "right", color: "#9CA3AF", fontVariantNumeric: "tabular-nums" }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write a review */}
      {user ? (
        <form onSubmit={handleSubmit} style={{ marginTop: 24, padding: 16, border: "1px solid #F1F5F9", borderRadius: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 8 }}>
            {mine ? "Update your review" : "Write a review"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            {[1, 2, 3, 4, 5].map((n) => {
              const active = (hoverRating || rating) >= n;
              return (
                <button
                  type="button"
                  key={n}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(n)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  style={{ background: "transparent", border: "none", cursor: "pointer", padding: 2 }}
                >
                  <Star
                    className={`fill-current ${active ? "text-amber-400" : "text-gray-200"}`}
                    style={{ width: 24, height: 24 }}
                  />
                </button>
              );
            })}
            {rating > 0 && (
              <span style={{ fontSize: 12, color: "#6B7280", marginLeft: 6 }}>
                {rating} star{rating > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={3}
            maxLength={2000}
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid #E5E7EB",
              borderRadius: 8,
              fontSize: 14,
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
            }}
          />

          {error && (
            <div style={{ marginTop: 8, fontSize: 13, color: "#DC2626" }}>{error}</div>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
            <button
              type="submit"
              disabled={isSaving || rating < 1}
              style={{
                padding: "8px 16px",
                background: rating < 1 || isSaving ? "#E5E7EB" : "#EA6B0E",
                color: rating < 1 || isSaving ? "#9CA3AF" : "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
                cursor: rating < 1 || isSaving ? "not-allowed" : "pointer",
              }}
            >
              {isSaving ? "Saving..." : mine ? "Update review" : "Submit review"}
            </button>
            {mine && (
              <button
                type="button"
                onClick={() => remove(mine._id)}
                style={{
                  padding: "8px 12px",
                  background: "#FEF2F2",
                  color: "#DC2626",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            )}
          </div>
        </form>
      ) : (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            background: "#FFF7ED",
            border: "1px solid #FED7AA",
            borderRadius: 12,
            fontSize: 14,
            color: "#9A3412",
          }}
        >
          <Link href="/login" style={{ fontWeight: 700, color: "#EA6B0E", textDecoration: "underline" }}>
            Sign in
          </Link>{" "}
          to leave a review.
        </div>
      )}

      {/* Reviews list */}
      <div className="ks-pd-reviews-list" style={{ marginTop: 24 }}>
        {isLoading ? (
          <div style={{ fontSize: 13, color: "#9CA3AF", padding: 12 }}>Loading reviews...</div>
        ) : summary.reviews.length === 0 ? (
          <div style={{ fontSize: 13, color: "#6B7280", padding: 12 }}>
            No reviews yet. Be the first to review this product.
          </div>
        ) : (
          summary.reviews.map((review) => (
            <div key={review._id} className="ks-pd-review">
              <VendorAvatar
                src=""
                name={review.user?.name || "User"}
                size="sm"
                className="!rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <div className="ks-pd-review-header">
                  <span className="ks-pd-review-name">
                    {review.user?.name || "Anonymous"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 mt-1">
                  <StarRow value={review.rating} size={14} />
                  <span className="text-[12px] text-[#bbb] font-medium">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {review.comment && (
                  <p className="ks-pd-review-text">{review.comment}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
