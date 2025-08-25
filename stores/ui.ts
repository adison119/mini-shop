"use client";
import { create } from "zustand";

type Toast = { id: string; text: string };

type UIState = {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  toasts: Toast[];
  addToast: (text: string, timeoutMs?: number) => void;
  removeToast: (id: string) => void;
};

export const useUI = create<UIState>((set, get) => ({
  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set((s) => ({ cartOpen: !s.cartOpen })),

  toasts: [],
  addToast: (text, timeoutMs = 1800) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    set({ toasts: [...get().toasts, { id, text }] });
    // auto-dismiss
    setTimeout(() => get().removeToast(id), timeoutMs);
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
