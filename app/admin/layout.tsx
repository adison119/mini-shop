import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin/products" className="underline-offset-4 hover:underline">
            Products
          </Link>
          <Link href="/products" className="underline-offset-4 hover:underline">
            Storefront
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
