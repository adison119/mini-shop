export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-gray-500">
        © {new Date().getFullYear()} Mini Shop — All rights reserved.
      </div>
    </footer>
  );
}
