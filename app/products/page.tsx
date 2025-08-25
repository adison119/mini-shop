"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

type CategoryFilter = "all" | (typeof products)[number]["category"];
const CATEGORIES: CategoryFilter[] = ["all", "coin", "skin", "giftcard", "other"];

export default function ProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoryFilter>("all");

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    return products.filter((p) => {
      const matchText =
        !keyword ||
        p.name.toLowerCase().includes(keyword) ||
        p.slug.toLowerCase().includes(keyword);
      const matchCat = cat === "all" || p.category === cat;
      return matchText && matchCat;
    });
  }, [q, cat]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Products</h1>

      {/* ค้นหา */}
      <div className="mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ค้นหาชื่อสินค้า…"
          className="w-full rounded-xl border px-3 py-2"
        />
        <div className="mt-2 text-sm text-gray-500">พบ {filtered.length} รายการ</div>
      </div>

      {/* หมวดหมู่ */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={
                "rounded-full border px-3 py-1 text-sm " +
                (active ? "bg-black text-white" : "bg-gray-900 hover:bg-gray-50 hover:text-black")
              }
            >
              {c === "all" ? "ทั้งหมด" : c}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
