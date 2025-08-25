"use client";

import Link from "next/link";
import { useAdminProducts } from "@/stores/adminProducts";
import { formatBaht } from "@/utils/format";

export default function AdminProductsPage() {
  const { items, remove, reset } = useAdminProducts();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products ({items.length})</h2>
        <div className="flex gap-2">
          <Link href="/admin/products/new" className="rounded-xl bg-black px-3 py-2 text-white">
            + New
          </Link>
          <button
            onClick={() => {
              if (confirm("Reset to default seed data?")) reset();
            }}
            className="rounded-xl border px-3 py-2"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border bg-white">
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
                    <Link href={`/admin/products/${p.id}`} className="underline-offset-4 hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${p.name}" ?`)) remove(p.id);
                      }}
                      className="text-red-600 underline-offset-4 hover:underline"
                    >
                      Delete
                    </button>
                    <Link
                      href={`/products/${p.slug}`}
                      className="text-gray-600 underline-offset-4 hover:underline"
                      target="_blank"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-600" colSpan={5}>
                  No products.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
