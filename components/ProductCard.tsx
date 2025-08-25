import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatBaht } from "@/utils/format";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className="rounded-2xl border bg-gray-900 p-4 shadow-sm hover:shadow-md transition">
      <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={p.image}
          alt={p.imageAlt ?? p.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="mb-3 text-xs text-gray-500">
        <span className="rounded-full border px-2 py-0.5">{p.category}</span>
      </div>
      <h3 className="text-lg font-semibold">{p.name}</h3>
      <p className="mt-1 text-sm text-gray-600 line-clamp-2">{p.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-bold">{formatBaht(p.price)}</span>
        <Link
          href={`/products/${p.slug}`}
          className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50 hover:text-black"
        >
          View
        </Link>
      </div>
    </div>
  );
}
