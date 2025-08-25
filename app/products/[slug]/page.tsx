import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { formatBaht } from "@/utils/format";
import AddToCartButton from "@/components/AddToCartButton";
type Props = { params: { slug: string } };

export default function ProductDetailPage({ params }: Props) {
  const p = products.find((x) => x.slug === params.slug);
  if (!p) notFound();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* รูปตัวอย่าง (เดี๋ยวค่อยใส่รูปจริง) */}
      <div className="aspect-square rounded-2xl bg-gray-400" />

      <div>
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/products" className="hover:underline">Products</Link> / <span>{p.name}</span>
        </nav>

        <h1 className="text-2xl font-bold">{p.name}</h1>
        <p className="mt-2 text-gray-600">{p.description}</p>

        <div className="mt-6 flex items-center gap-4">
          <span className="text-xl font-semibold">{formatBaht(p.price)}</span>
          <button className="rounded-xl border px-4 py-2 opacity-50" >
            <AddToCartButton product={p} />
          </button>
        </div>
      </div>
    </div>
  );
}
