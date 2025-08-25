"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/stores/cart";
import { useUI } from "@/stores/ui";

export default function AddToCartButton({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const { addToast } = useUI();
  const [adding, setAdding] = useState(false);

  return (
    <button
      onClick={() => {
        setAdding(true);
        add(product, 1);
        addToast(`เพิ่ม ${product.name} x1 ลงตะกร้าแล้ว`);
        setTimeout(() => setAdding(false), 500);
      }}
      className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
      disabled={adding}
    >
      {adding ? "Added!" : "Add to cart"}
    </button>
  );
}

