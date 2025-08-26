"use client";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";


export function useProducts(): Product[] {
const [items, setItems] = useState<Product[]>([]);
useEffect(() => {
let active = true;
(async () => {
try {
const res = await fetch("/api/products", { cache: "no-store" });
if (!res.ok) throw new Error("fail");
const data = (await res.json()) as Product[];
if (active) setItems(data);
} catch {}
})();
return () => {
active = false;
};
}, []);
return items;
}