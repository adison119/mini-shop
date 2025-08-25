// lib/useProducts.ts
"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { products as defaultProducts } from "@/data/products";

const LS_KEY = "mini-shop-admin-products";

export function useProducts(): Product[] {
  const [items, setItems] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { state?: { items?: Product[] } } | Product[];
      // รองรับทั้งรูป persist object และ array ตรงๆ
      const arr = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.state?.items)
        ? (parsed.state!.items as Product[])
        : null;
      if (arr && arr.length) setItems(arr);
    } catch {
      setItems(defaultProducts);
    }
  }, []);

  return items;
}
