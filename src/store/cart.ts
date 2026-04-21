import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  remove: (id: string, size?: string) => void;
  setQty: (id: string, size: string | undefined, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

const sameLine = (a: CartItem, id: string, size?: string) =>
  a.id === id && (a.size ?? "") === (size ?? "");

export const useCart = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  add: (item) =>
    set((s) => {
      const existing = s.items.find((i) => sameLine(i, item.id, item.size));
      if (existing) {
        return {
          items: s.items.map((i) =>
            sameLine(i, item.id, item.size) ? { ...i, qty: i.qty + (item.qty ?? 1) } : i
          ),
          isOpen: true,
        };
      }
      return { items: [...s.items, { ...item, qty: item.qty ?? 1 }], isOpen: true };
    }),
  remove: (id, size) =>
    set((s) => ({ items: s.items.filter((i) => !sameLine(i, id, size)) })),
  setQty: (id, size, qty) =>
    set((s) => ({
      items: s.items
        .map((i) => (sameLine(i, id, size) ? { ...i, qty } : i))
        .filter((i) => i.qty > 0),
    })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
  count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
}));
