// stores/adminProducts.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types/product";
import { products as defaultProducts } from "@/data/products";
import { slugify } from "@/lib/slug";

const LS_KEY = "mini-shop-admin-products";

type AdminProductsState = {
  items: Product[];
  create: (p: Omit<Product, "id"> & { id?: string }) => void;
  update: (id: string, patch: Partial<Product>) => void;
  remove: (id: string) => void;
  reset: () => void;
};

export const useAdminProducts = create<AdminProductsState>()(
  persist(
    (set, get) => ({
      items: defaultProducts,
      create: (p) =>
        set((s) => {
          const id = p.id ?? `p${Date.now()}`;
          const slug = p.slug ? slugify(p.slug) : slugify(p.name);
          return { items: [...s.items, { ...p, id, slug }] as Product[] };
        }),
      update: (id, patch) =>
        set((s) => ({
          items: s.items.map((it) =>
            it.id === id
              ? ({ ...it, ...patch, slug: patch.slug ? slugify(patch.slug) : it.slug } as Product)
              : it
          ),
        })),
      remove: (id) => set((s) => ({ items: s.items.filter((it) => it.id !== id) })),
      reset: () => set({ items: defaultProducts }),
    }),
    {
      name: LS_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    }
  )
);
