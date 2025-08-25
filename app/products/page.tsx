"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ProductsPage() {
  const [q, setQ] = useState("");

  // คำนวณรายการหลังค้นหา (ไม่เปลี่ยนต้นฉบับ)
  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(keyword) ||
        p.slug.toLowerCase().includes(keyword)
    );
  }, [q]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Products</h1>

      {/* กล่องค้นหา */}
      <div className="mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ค้นหาชื่อสินค้า…"
          className="w-full rounded-xl border px-3 py-2"
        />
        <div className="mt-2 text-sm text-gray-500">
          พบ {filtered.length} รายการ
        </div>
      </div>

      {/* Grid สินค้า */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
