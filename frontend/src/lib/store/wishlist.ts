import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter((i) => i !== id) : [id, ...state.ids],
        })),
      add: (id) => set((state) => ({ ids: state.ids.includes(id) ? state.ids : [id, ...state.ids] })),
      remove: (id) => set((state) => ({ ids: state.ids.filter((i) => i !== id) })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "nandini-wishlist-v1" }
  )
);
