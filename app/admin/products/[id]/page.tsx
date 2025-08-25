"use client";

import { notFound, useRouter } from "next/navigation";
import AdminProductForm from "@/components/AdminProductForm";
import { useAdminProducts } from "@/stores/adminProducts";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { items, update } = useAdminProducts();
  const p = items.find((x) => x.id === params.id);
  if (!p) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Edit: {p!.name}</h2>
      <AdminProductForm
        initial={p!}
        onSubmit={(v) => {
          update(p!.id, v);
          router.push("/admin/products");
        }}
        submitText="Update"
      />
    </div>
  );
}
