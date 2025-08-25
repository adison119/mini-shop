"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

type CategoryFilter = "all" | (typeof products)[number]["category"];
type SortKey = "relevance" | "price-asc" | "price-desc" | "name-asc";

const CATEGORIES: CategoryFilter[] = ["all", "coin", "skin", "giftcard", "other"];

export default function ProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoryFilter>("all");
  const [sort,setSort] = useState<SortKey>("relevance");

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

  const finalList = useMemo(()=>{
    const arr = filtered.slice();
    switch (sort) {
      case "price-asc":
        arr.sort((a,b)=> a.price - b.price);
      break;
      case "price-desc":
        arr.sort((a,b)=> b.price - a.price);
      break;
      case "name-asc":
        arr.sort((a,b)=> a.name.localeCompare(b.name, "th"));
      break;
      case "relevance":
      default:
        // ไม่ต้อง sort - คงลำดับเดิมใน data
        break;
    }
    return arr;
  },[filtered,sort])

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Products</h1>

      {/* แถวควบคุม: ค้นหา + Sort */}
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ค้นหาชื่อสินค้า…"
            className="w-full rounded-xl border px-3 py-2"
          />
        </div>
        <div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="w-full rounded-xl border px-3 py-2 bg-neutral-800"
          >
            <option value="relevance">เรียงตามความเกี่ยวข้อง</option>
            <option value="price-asc">ราคาน้อย → มาก</option>
            <option value="price-desc">ราคามาก → น้อย</option>
            <option value="name-asc">ชื่อ A → Z</option>
          </select>
        </div>
      </div>

      <div className="mb-6 text-sm text-gray-500">พบ {finalList.length} รายการ</div>

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
        {finalList.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}