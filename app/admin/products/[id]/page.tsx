"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminProductForm from "@/components/AdminProductForm";
import type { Product } from "@/types/product";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>(); // ⬅️ เอา id จาก hook
  const router = useRouter();
  const [p, setP] = useState<Product | null | undefined>(null); // null=loading, undefined=not found

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
      if (res.status === 404) return setP(undefined);
      setP(await res.json());
    })();
  }, [id]);

  if (p === null) return <div>Loading...</div>;
  if (p === undefined) return <div>ไม่พบสินค้า</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Edit: {p.name}</h2>
      <AdminProductForm
        initial={p}
        onSubmit={async (v) => {
          await fetch(`/api/products/${p.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(v),
          });
          router.push("/admin/products");
        }}
        submitText="Update"
      />
    </div>
  );
}
