"use client";

import Link from "next/link";
import { useCart, useCartTotals } from "@/stores/cart";
import { formatBaht } from "@/utils/format";

export default function CartPage() {
    const { items, inc, dec, remove, clear } = useCart();
    const { totalCount, totalPrice } = useCartTotals();

    if (items.length === 0) {
        return (
            <div>
                <h1 className="mb-4 text-2xl font-bold">Cart</h1>
                <p className="text-gray-600">ตะกร้ายังว่างอยู่</p>
                <Link href="/products" className="mt-4 inline-block rounded-xl border px-4 py-2">
                    ไปเลือกสินค้า
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">Cart</h1>

            <div className="overflow-x-auto rounded-2xl border bg-gray-600">
                <table className="w-full text-sm">
                    <thead className="bg-black">
                        <tr className="text-left">
                            <th className="px-4 py-3">สินค้า</th>
                            <th className="px-4 py-3">ราคา</th>
                            <th className="px-4 py-3">จำนวน</th>
                            <th className="px-4 py-3">รวม</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((it) => (
                            <tr key={it.id} className="border-t">
                                <td className="px-4 py-3 font-medium">{it.name}</td>
                                <td className="px-4 py-3">{formatBaht(it.price)}</td>
                                <td className="px-4 py-3">
                                    <div className="inline-flex items-center gap-2">
                                        <button
                                            onClick={() => dec(it.id)}
                                            className="h-8 w-8 rounded-lg border"
                                            aria-label="decrement"
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center">{it.qty}</span>
                                        <button
                                            onClick={() => inc(it.id)}
                                            className="h-8 w-8 rounded-lg border"
                                            aria-label="increment"
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{formatBaht(it.qty * it.price)}</td>
                                <td className="px-4 py-3">
                                    <button onClick={() => remove(it.id)} className="text-red-600 hover:underline">
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex flex-col items-end gap-3">
                <div className="text-right">
                    <div>จำนวนทั้งหมด: <span className="font-semibold">{totalCount}</span> ชิ้น</div>
                    <div>ยอดรวม: <span className="text-lg font-semibold">{formatBaht(totalPrice)}</span></div>
                </div>
                <div className="flex gap-3">
                    <button onClick={clear} className="rounded-xl border px-4 py-2">ล้างตะกร้า</button>
                    <Link href="/checkout" className="rounded-xl bg-black px-4 py-2 text-white">
                        Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}
