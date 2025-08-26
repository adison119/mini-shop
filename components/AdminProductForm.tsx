"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/types/product";
import { slugify } from "@/lib/slug";

const CATS: Product["category"][] = ["coin", "skin", "giftcard", "other"];

export type AdminProductFormValues = Omit<Product, "id"> & { id?: string };

export default function AdminProductForm({
  initial,
  onSubmit,
  submitText = "Save",
}: {
  initial?: Partial<AdminProductFormValues>;
  onSubmit: (values: AdminProductFormValues) => void;
  submitText?: string;
}) {
  const [values, setValues] = useState<AdminProductFormValues>({
    id: initial?.id,
    slug: initial?.slug ?? "",
    name: initial?.name ?? "",
    price: initial?.price ?? 0,
    category: (initial?.category) ?? "other",
    description: initial?.description ?? "",
    image: initial?.image ?? "/product.svg",
    imageAlt: initial?.imageAlt ?? initial?.name ?? "",
  });

  const valid = useMemo(
    () => values.name.trim().length >= 2 && values.slug.trim().length >= 1 && values.price >= 0,
    [values]
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        onSubmit({ ...values, slug: slugify(values.slug || values.name) });
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            value={values.slug}
            onChange={(e) => setValues((v) => ({ ...v, slug: e.target.value }))}
            placeholder="auto from name if empty"
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium">Price (THB)</label>
          <input
            type="number"
            value={values.price}
            onChange={(e) => setValues((v) => ({ ...v, price: Number(e.target.value) }))}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            min={0}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">Category</label>
          <select
            value={values.category}
            onChange={(e) => setValues((v) => ({ ...v, category: e.target.value as Product["category"] }))}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          >
            {CATS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          rows={3}
          value={values.description}
          onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
          className="mt-1 w-full rounded-xl border px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Image URL / Path</label>
          <input
            value={values.image}
            onChange={(e) => setValues((v) => ({ ...v, image: e.target.value }))}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image Alt</label>
          <input
            value={values.imageAlt}
            onChange={(e) => setValues((v) => ({ ...v, imageAlt: e.target.value }))}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!valid}
          className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
