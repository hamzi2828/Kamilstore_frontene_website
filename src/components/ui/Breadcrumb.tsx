import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-white border-b border-gray-100">
      <nav className="site-container flex items-center gap-1.5 py-3 overflow-x-auto">
        <Link
          href="/"
          className="flex items-center gap-1 text-[13px] text-[#999] hover:text-orange-500 transition-colors font-medium flex-shrink-0"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i} className="flex items-center gap-1.5 flex-shrink-0">
              <ChevronRight className="w-3 h-3 text-[#ddd]" />
              {isLast || !item.href ? (
                <span className="text-[13px] font-semibold text-[#333]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[13px] text-[#999] hover:text-orange-500 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
