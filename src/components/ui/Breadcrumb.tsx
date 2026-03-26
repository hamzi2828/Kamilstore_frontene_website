import Link from "next/link";
import { Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="site-container h-[44px] flex items-center">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-gray-500 hover:text-orange-500 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <>
                <li key={`sep-${i}`} className="text-gray-300">/</li>
                <li key={`item-${i}`}>
                  {isLast || !item.href ? (
                    <span className="text-gray-900 font-medium">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-500 hover:text-orange-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              </>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
