"use client";

import { useState } from "react";
import Image from "next/image";

interface VendorAvatarProps {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10 text-sm",
  md: "w-14 h-14 text-base",
  lg: "w-16 h-16 text-lg",
};

const bgColors = [
  "from-orange-400 to-rose-400",
  "from-blue-400 to-indigo-400",
  "from-emerald-400 to-teal-400",
  "from-violet-400 to-purple-400",
  "from-amber-400 to-orange-400",
  "from-cyan-400 to-blue-400",
];

function getColorFromName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return bgColors[Math.abs(hash) % bgColors.length];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function VendorAvatar({
  src,
  name,
  size = "lg",
  className = "",
}: VendorAvatarProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br ${getColorFromName(name)} flex items-center justify-center text-white font-bold shadow-sm ${className}`}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClasses[size].split(" ").slice(0, 2).join(" ")} rounded-xl overflow-hidden bg-gray-100 ${className}`}>
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}
