import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatBaht } from "@/utils/format";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params; // ← สำคัญ
  const p = await db.product.findUnique({ where: { slug } });
  if (!p) return { title: "Product not found" };
  return {
    title: `${p.name} – Mini Shop`,
    description: p.description ?? undefined,
    openGraph: { images: [p.image] },
  };
}

export default async function ProductPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; // ← สำคัญ
  const p = await db.product.findUnique({ where: { slug } });
  if (!p) notFound();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border">
        <Image src={p.image} alt={p.imageAlt} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{p.name}</h1>
        <div className="text-xl">{formatBaht(p.price)}</div>
        <p className="text-gray-600 whitespace-pre-line">{p.description}</p>
        <AddToCartButton product={p as any} />
      </div>
    </div>
  );
}
