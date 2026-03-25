"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export default function ProductImage({
  src,
  alt,
  fill = true,
  className = "",
  priority = false,
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center gap-2 ${className}`}>
        <svg
          className="w-10 h-10 text-gray-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M6 2h12l2 3H4l2-3z" />
          <path d="M4 5h16v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z" />
          <path d="M9 5V3.5a3 3 0 0 1 6 0V5" />
        </svg>
        <span className="text-[11px] text-gray-300 font-medium">No Image</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
