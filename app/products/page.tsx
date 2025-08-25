"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/lib/useProducts";

type CategoryFilter = "all" | "coin" | "skin" | "giftcard" | "other";
type SortKey = "relevance" | "price-asc" | "price-desc" | "name-asc";

const CATEGORIES: CategoryFilter[] = ["all", "coin", "skin", "giftcard", "other"];
const SORTS: SortKey[] = ["relevance", "price-asc", "price-desc", "name-asc"];

function isCategory(v: string | null): v is CategoryFilter {
  return !!v && (CATEGORIES as string[]).includes(v);
}
function isSort(v: string | null): v is SortKey {
  return !!v && (SORTS as string[]).includes(v);
}

export default function ProductsPage() {
  const source = useProducts();

  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [q, setQ] = useState<string>(search.get("q") ?? "");
  const [cat, setCat] = useState<CategoryFilter>(isCategory(search.get("cat")) ? (search.get("cat") as CategoryFilter) : "all");
  const [sort, setSort] = useState<SortKey>(isSort(search.get("sort")) ? (search.get("sort") as SortKey) : "relevance");


  useEffect(() => {
    const urlQ = search.get("q") ?? "";
    const urlCat = isCategory(search.get("cat")) ? (search.get("cat") as CategoryFilter) : "all";
    const urlSort = isSort(search.get("sort")) ? (search.get("sort") as SortKey) : "relevance";


    if (urlQ !== q) setQ(urlQ);
    if (urlCat !== cat) setCat(urlCat);
    if (urlSort !== sort) setSort(urlSort);
  }, [search]);


  const writeParam = (key: string, value: string | null, { removeIfDefault = false } = {}) => {
    const params = new URLSearchParams(search.toString());
    const shouldRemove =
      value === null ||
      value === "" ||
      (removeIfDefault && ((key === "cat" && value === "all") || (key === "sort" && value === "relevance")));

    if (shouldRemove) {
      params.delete(key);
    } else {
      params.set(key, value!);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  // ---- update URL when cat/sort change (ทันที)
  useEffect(() => {
    writeParam("cat", cat, { removeIfDefault: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat]);
  useEffect(() => {
    writeParam("sort", sort, { removeIfDefault: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  // ---- update URL when q changes (debounce 300ms)
  useEffect(() => {
    const t = setTimeout(() => {
      // เขียนเฉพาะเมื่อค่าจริงใน URL ไม่เท่ากับ state ปัจจุบัน
      const current = search.get("q") ?? "";
      if (current !== q) writeParam("q", q);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  // ---- filter + sort ตามเดิม
  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    return source.filter((p) => {
      const matchText =
        !keyword ||
        p.name.toLowerCase().includes(keyword) ||
        p.slug.toLowerCase().includes(keyword);
      const matchCat = cat === "all" || p.category === cat;
      return matchText && matchCat;
    });
  }, [q, cat,source]);

  const finalList = useMemo(() => {
    const arr = filtered.slice();
    switch (sort) {
      case "price-asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        arr.sort((a, b) => a.name.localeCompare(b.name, "th"));
        break;
      case "relevance":
      default:
        break;
    }
    return arr;
  }, [filtered, sort]);

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
            className="w-full rounded-xl border border-foreground/20 bg-background px-3 py-2 text-foreground placeholder:text-foreground/60"
          />
        </div>
        <div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="w-full rounded-xl border border-foreground/20 bg-background px-3 py-2 text-foreground"
          >
            <option value="relevance">เรียงตามความเกี่ยวข้อง</option>
            <option value="price-asc">ราคาน้อย → มาก</option>
            <option value="price-desc">ราคามาก → น้อย</option>
            <option value="name-asc">ชื่อ A → Z</option>
          </select>
        </div>
      </div>

      <div className="mb-2 text-sm text-foreground/60">พบ {finalList.length} รายการ</div>

      {/* หมวดหมู่ */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={
                "rounded-full border border-foreground/20 px-3 py-1 text-sm " +
                (active
                  ? "bg-foreground text-background"
                  : "bg-background hover:bg-foreground/10")
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
