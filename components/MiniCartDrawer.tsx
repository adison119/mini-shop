"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useUI } from "@/stores/ui";
import { useCart, useCartTotals } from "@/stores/cart";
import { formatBaht } from "@/utils/format";

export default function MiniCartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { items, inc, dec, remove, clear } = useCart();
  const { totalCount, totalPrice } = useCartTotals();

  // ปิดด้วยปุ่ม Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  if (!cartOpen) return null;

  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* drawer */}
      <aside
        className="fixed right-0 top-0 z-50 h-full w-80 max-w-[90vw] bg-black shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <h2 className="font-semibold">ตะกร้า</h2>
          <button onClick={closeCart} aria-label="Close" className="text-gray-500 hover:text-black">✕</button>
        </div>

        <div className="flex h-[calc(100%-56px-88px)] flex-col overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-sm text-gray-600">ยังไม่มีสินค้าในตะกร้า</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="rounded-xl border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{it.name}</div>
                      <div className="text-sm text-gray-600">{formatBaht(it.price)}</div>
                    </div>
                    <button
                      onClick={() => remove(it.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      ลบ
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => dec(it.id)} className="h-8 w-8 rounded-lg border">−</button>
                    <span className="w-8 text-center">{it.qty}</span>
                    <button onClick={() => inc(it.id)} className="h-8 w-8 rounded-lg border">+</button>
                    <div className="ml-auto font-semibold">{formatBaht(it.qty * it.price)}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t bg-black p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>จำนวนทั้งหมด</span>
            <span className="font-medium">{totalCount} ชิ้น</span>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm">ยอดรวม</span>
            <span className="text-lg font-semibold">{formatBaht(totalPrice)}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={clear} className="flex-1 rounded-xl border px-3 py-2">ล้าง</button>
            <Link href="/cart" onClick={closeCart} className="flex-1 rounded-xl border px-3 py-2 text-center">
              ดูตะกร้า
            </Link>
            <Link href="/checkout" onClick={closeCart} className="flex-1 rounded-xl bg-black px-3 py-2 text-center text-white">
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
