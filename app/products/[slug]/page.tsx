import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { formatBaht } from "@/utils/format";
import AddToCartButton from "@/components/AddToCartButton";

type Props = { params: { slug: string } };

// สร้างเส้นทางล่วงหน้า (ดีต่อ SEO + ความเร็ว)
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// ใส่เมทาดาทาต่อหน้าสินค้า (title/desc/OG/Twitter/Canonical)
export function generateMetadata({ params }: Props): Metadata {
  const p = products.find((x) => x.slug === params.slug);
  if (!p) return { title: "Product not found" };

  const title = p.name;
  const description = p.description ?? `${p.name} ราคา ${formatBaht(p.price)}`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title,
      description,
      images: [
        { url: p.image, width: 1200, height: 630, alt: p.imageAlt ?? p.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [p.image],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const p = products.find((x) => x.slug === params.slug);
  if (!p) notFound();
  
  // --- สร้าง URL แบบ absolute สำหรับรูป/ลิงก์ (ใช้ตอน dev ได้ด้วย)
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const imageUrl = new URL(p.image, base).toString();
  const productUrl = new URL(`/products/${p.slug}`, base).toString();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: [imageUrl],
    description: p.description,
    sku: p.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "THB",
      price: p.price,
      availability: "https://schema.org/InStock",
      url: productUrl,
    },
  };
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* รูปตัวอย่าง (เดี๋ยวค่อยใส่รูปจริง) */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={p.image}
          alt={p.imageAlt ?? p.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
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
    
  );
}
