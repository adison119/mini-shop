import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MiniCartDrawer from "@/components/MiniCartDrawer";
import Toasts from "@/components/Toasts";

export const metadata: Metadata = {
  // ใช้ URL โปรดักชันถ้ามี (เช่นจาก .env) ไม่งั้น fallback เป็น localhost
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Mini Shop", template: "%s | Mini Shop" },
  description: "Small store built with Next.js",
  openGraph: { siteName: "Mini Shop", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const logoUrl = new URL("/product.svg", base).toString();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mini Shop",
    url: base,
    logo: logoUrl,
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mini Shop",
    url: base,
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="th" suppressHydrationWarning>
      <body className="min-h-dvh bg-gray-50 text-gray-900">
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <Footer />
          <MiniCartDrawer />
          <Toasts />
        {/* JSON-LD site-wide */}
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      </body>
    </html>
  );
}