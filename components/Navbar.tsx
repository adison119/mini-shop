"use client";

import Link from "next/link";
import { useCartTotals } from "@/stores/cart";
import { useUI } from "@/stores/ui";

export default function Navbar() {
  const { totalCount } = useCartTotals();
  const { openCart } = useUI();

  return (
    <header className="border-b bg-black">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">Mini Shop</Link>
        <ul className="flex items-center gap-6 text-sm">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li>
            <button onClick={openCart} className="relative inline-flex items-center ">
              Cart
              {totalCount > 0 && (
                <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[10px] font-semibold text-white">
                  {totalCount}
                </span>
              )}
            </button>
            
          </li>
        </ul>
      </nav>
    </header>
  );
}
