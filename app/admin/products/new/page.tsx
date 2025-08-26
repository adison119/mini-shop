"use client";
import { useRouter } from "next/navigation";
import AdminProductForm from "@/components/AdminProductForm";


export default function NewProductPage() {
const router = useRouter();
return (
<div className="space-y-4">
<h2 className="text-xl font-semibold">New Product</h2>
<AdminProductForm
onSubmit={async (v) => {
await fetch("/api/products", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(v),
});
router.push("/admin/products");
}}
submitText="Create"
/>
</div>
);
}