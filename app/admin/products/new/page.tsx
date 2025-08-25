"use client";

import { useRouter } from "next/navigation";
import AdminProductForm from "@/components/AdminProductForm";
import { useAdminProducts } from "@/stores/adminProducts";

export default function NewProductPage() {
  const router = useRouter();
  const { create } = useAdminProducts();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">New Product</h2>
      <AdminProductForm
        onSubmit={(v) => {
          create(v);
          router.push("/admin/products");
        }}
        submitText="Create"
      />
    </div>
  );
}
