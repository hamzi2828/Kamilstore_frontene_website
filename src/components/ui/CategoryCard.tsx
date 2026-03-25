"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    productCount: number;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/category/${category.slug}`}>
      <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200">
          {category.image && !imgError ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-orange-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <p className="text-sm opacity-80">
              {category.productCount} Products
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
