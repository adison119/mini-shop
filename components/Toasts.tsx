"use client";

import { useUI } from "@/stores/ui";

export default function Toasts() {
  const { toasts, removeToast } = useUI();
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[60] space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => removeToast(t.id)}
          className="pointer-events-auto w-72 cursor-pointer rounded-xl border bg-black px-4 py-3 text-sm shadow-md transition hover:shadow-lg"
          role="status"
          aria-live="polite"
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
