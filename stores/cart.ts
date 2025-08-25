"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types/product";

type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p, qty = 1) =>
        set((state) => {
          const i = state.items.findIndex((it) => it.id === p.id);
          if (i >= 0) {
            const items = state.items.slice();
            items[i] = { ...items[i], qty: items[i].qty + qty };
            return { items };
          }
          return {
            items: [
              ...state.items,
              { id: p.id, slug: p.slug, name: p.name, price: p.price, qty },
            ],
          };
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((it) => it.id !== id) })),
      inc: (id) =>
        set((state) => ({
          items: state.items.map((it) =>
            it.id === id ? { ...it, qty: it.qty + 1 } : it
          ),
        })),
      dec: (id) =>
        set((state) => ({
          items: state.items.flatMap((it) => {
            if (it.id !== id) return [it];
            const q = it.qty - 1;
            return q <= 0 ? [] : [{ ...it, qty: q }];
          }),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "mini-shop-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// hook เล็กๆ ไว้คำนวณยอดรวม/จำนวนรวม
export const useCartTotals = () => {
  const items = useCart((s) => s.items);
  const totalCount = items.reduce((sum, it) => sum + it.qty, 0);
  const totalPrice = items.reduce((sum, it) => sum + it.qty * it.price, 0);
  return { totalCount, totalPrice };
};
