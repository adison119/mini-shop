"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutInput } from "@/lib/checkoutSchema";
import { useCart, useCartTotals } from "@/stores/cart";
import { formatBaht } from "@/utils/format";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const { totalPrice, totalCount } = useCartTotals();
  const [submitted, setSubmitted] = useState<CheckoutInput | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      district: "",
      province: "",
      postalCode: "",
      phone: "",
      notes: "",
      termsAccepted: false,
    },
  });

  const accepted = watch("termsAccepted"); // ⬅ ใช้ปิดปุ่มถ้ายังไม่ติ๊ก

  if (items.length === 0 && !submitted) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
        <p className="text-gray-600">ตะกร้าว่างอยู่ กรุณาเลือกสินค้าก่อน</p>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-xl border px-4 py-2"
        >
          ไปเลือกสินค้า
        </Link>
      </div>
    );
  }

  const onSubmit = (data: CheckoutInput) => {
    setSubmitted(data);
    clear(); // จำลองออเดอร์สำเร็จแล้วล้างตะกร้า
  };

  // หน้าหลังส่งฟอร์มสำเร็จ
  if (submitted) {
    const orderId = "ORD-" + Date.now().toString().slice(-6);
    return (
      <div className="max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold">ยืนยันคำสั่งซื้อสำเร็จ</h1>
        <p className="mb-6 text-gray-600">
          หมายเลขคำสั่งซื้อ: <span className="font-semibold">{orderId}</span>
        </p>

        <div className="mb-6 rounded-2xl border bg-gray-950 p-4">
          <h2 className="mb-3 font-semibold">ที่อยู่จัดส่ง</h2>
          <div className="text-sm text-gray-700">
            <div>{submitted.fullName}</div>
            <div>{submitted.address}</div>
            <div>
              {submitted.district}, {submitted.province} {submitted.postalCode}
            </div>
            {submitted.phone && <div>โทร: {submitted.phone}</div>}
            <div>อีเมล: {submitted.email}</div>
            {submitted.notes && (
              <div className="mt-2">หมายเหตุ: {submitted.notes}</div>
            )}
          </div>
        </div>

        <Link href="/products" className="rounded-xl border px-4 py-2">
          กลับไปเลือกสินค้า
        </Link>
      </div>
    );
  }

  // ฟอร์มเช็คเอาท์ + สรุปรายการ
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {/* ฟอร์ม */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:col-span-2 space-y-4"
      >
        <h1 className="text-2xl font-bold">Checkout</h1>

        <div>
          <label className="block text-sm font-medium">ชื่อ-นามสกุล</label>
          <input
            {...register("fullName")}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">อีเมล</label>
          <input
            {...register("email")}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">ที่อยู่</label>
          <textarea
            {...register("address")}
            rows={3}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium">อำเภอ/เขต</label>
            <input
              {...register("district")}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            />
            {errors.district && (
              <p className="mt-1 text-sm text-red-600">
                {errors.district.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">จังหวัด</label>
            <input
              {...register("province")}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            />
            {errors.province && (
              <p className="mt-1 text-sm text-red-600">
                {errors.province.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">รหัสไปรษณีย์</label>
            <input
              {...register("postalCode")}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            />
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">
            เบอร์โทร (ไม่บังคับ)
          </label>
          <input
            {...register("phone")}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">หมายเหตุ</label>
          <textarea
            {...register("notes")}
            rows={2}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
          {errors.notes && (
            <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
          )}
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              {...register("termsAccepted")}
              className="mt-1 h-4 w-4 rounded border"
            />
            <span>
              ฉันยอมรับเงื่อนไขการสั่งซื้อ และนโยบายการคืนเงิน (ตัวอย่าง)
            </span>
          </label>
          {errors.termsAccepted && (
            <p className="mt-1 text-sm text-red-600">
              {errors.termsAccepted.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !accepted}
          className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {isSubmitting ? "กำลังยืนยัน..." : "ยืนยันคำสั่งซื้อ"}
        </button>
      </form>

      {/* สรุปออเดอร์ */}
      <aside className="md:col-span-1">
        <div className="rounded-2xl border bg-black p-4">
          <h2 className="mb-3 font-semibold">สรุปรายการ</h2>
          <ul className="space-y-2 text-sm">
            {items.map((it) => (
              <li key={it.id} className="flex justify-between">
                <span>
                  {it.name} × {it.qty}
                </span>
                <span>{formatBaht(it.qty * it.price)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t pt-3 text-right">
            <div className="text-sm text-gray-600">รวม {totalCount} ชิ้น</div>
            <div className="text-lg font-semibold">
              {formatBaht(totalPrice)}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
