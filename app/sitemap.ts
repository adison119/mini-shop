import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: new URL("/", base).toString(),        lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: new URL("/products", base).toString(),lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: new URL("/cart", base).toString(),    lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: new URL("/checkout", base).toString(),lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: new URL(`/products/${p.slug}`, base).toString(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
