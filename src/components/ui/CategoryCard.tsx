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
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="aspect-square relative bg-gray-100">
          <Image
            src={category.image || "/placeholder-category.jpg"}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <p className="text-sm opacity-80">{category.productCount} Products</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
