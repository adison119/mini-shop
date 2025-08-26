"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatBaht } from "@/utils/format";
import type { Product } from "@/types/product";


export default function AdminProductsPage() {
const [items, setItems] = useState<Product[]>([]);


const load = async () => {
const res = await fetch("/api/products", { cache: "no-store" });
setItems(await res.json());
};
useEffect(() => { load(); }, []);


const remove = async (id: string) => {
if (!confirm("Delete this product?")) return;
await fetch(`/api/products/${id}`, { method: "DELETE" });
await load();
};


const reset = async () => {
await fetch("/api/dev/reset", { method: "POST" });
await load();
};


return (
<div className="space-y-4">
<div className="flex items-center justify-between">
<h2 className="text-xl font-semibold">Products ({items.length})</h2>
<div className="flex gap-2">
<Link href="/admin/products/new" className="rounded-xl bg-black px-3 py-2 text-white">+ New</Link>
<button onClick={reset} className="rounded-xl border px-3 py-2">Reset</button>
</div>
</div>


<table className="w-full text-sm">
<thead className="bg-gray-50">
<tr className="text-left">
<th className="px-4 py-3">Name</th>
<th className="px-4 py-3">Slug</th>
<th className="px-4 py-3">Category</th>
<th className="px-4 py-3">Price</th>
<th className="px-4 py-3">Actions</th>
</tr>
</thead>
<tbody>
{items.map((p) => (
<tr key={p.id} className="border-t">
<td className="px-4 py-3">{p.name}</td>
<td className="px-4 py-3 text-gray-600">{p.slug}</td>
<td className="px-4 py-3">{p.category}</td>
<td className="px-4 py-3">{formatBaht(p.price)}</td>
<td className="px-4 py-3">
<div className="flex gap-2">
<Link href={`/admin/products/${p.id}`} className="rounded-lg border px-2 py-1">Edit</Link>
<button onClick={() => remove(p.id)} className="rounded-lg border px-2 py-1">Delete</button>
</div>
</td>
</tr>
))}
</tbody>
</table>
</div>
);
}