import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrderRecord } from "@/lib/types";

/* ── UI overlay state (not persisted) ── */
interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  notifOpen: boolean;
  mobileMenuOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setNotifOpen: (v: boolean) => void;
  setMobileMenuOpen: (v: boolean) => void;
  toggleCart: () => void;
  toggleSearch: () => void;
  toggleNotif: () => void;
  toggleMobileMenu: () => void;
}

export const useUI = create<UIState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  notifOpen: false,
  mobileMenuOpen: false,
  setCartOpen: (v) => set({ cartOpen: v, searchOpen: false, notifOpen: false }),
  setSearchOpen: (v) => set({ searchOpen: v, cartOpen: false, notifOpen: false }),
  setNotifOpen: (v) => set({ notifOpen: v, cartOpen: false, searchOpen: false }),
  setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),
  toggleCart: () => set((s) => ({ cartOpen: !s.cartOpen, searchOpen: false, notifOpen: false })),
  toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen, cartOpen: false, notifOpen: false })),
  toggleNotif: () => set((s) => ({ notifOpen: !s.notifOpen, cartOpen: false, searchOpen: false })),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
}));

/* ── Recently viewed (persisted) ── */
interface RecentlyViewedState {
  ids: string[];
  push: (id: string) => void;
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      ids: [],
      push: (id) =>
        set((state) => ({ ids: [id, ...state.ids.filter((i) => i !== id)].slice(0, 8) })),
    }),
    { name: "nandini-recent-v1" }
  )
);

/* ── Mock auth + orders + addresses (persisted) ── */
export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface MockUser {
  name: string;
  email: string;
  phone: string;
  loggedIn: boolean;
}

interface UserState {
  user: MockUser;
  addresses: Address[];
  orders: OrderRecord[];
  recentSearches: string[];
  login: (name: string, email: string) => void;
  logout: () => void;
  addAddress: (a: Omit<Address, "id" | "isDefault">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (o: OrderRecord) => void;
  pushRecentSearch: (q: string) => void;
  clearRecentSearches: () => void;
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: "addr1", label: "Home", fullName: "Ananya Deshpande", phone: "+91 98200 12345",
    line1: "402, Sagar Residency, 12th Road, Khar West", city: "Mumbai", state: "Maharashtra",
    pincode: "400052", isDefault: true,
  },
  {
    id: "addr2", label: "Office", fullName: "Ananya Deshpande", phone: "+91 98200 12345",
    line1: "7th Floor, Trade Crest, Bandra Kurla Complex", city: "Mumbai", state: "Maharashtra",
    pincode: "400051", isDefault: false,
  },
];

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: { name: "Ananya", email: "ananya@example.com", phone: "+91 98200 12345", loggedIn: true },
      addresses: DEFAULT_ADDRESSES,
      orders: [],
      recentSearches: [],
      login: (name, email) => set({ user: { name, email, phone: "+91 98200 12345", loggedIn: true } }),
      logout: () => set({ user: { name: "", email: "", phone: "", loggedIn: false } }),
      addAddress: (a) =>
        set((state) => ({
          addresses: [...state.addresses, { ...a, id: `addr${Date.now()}`, isDefault: false }],
        })),
      removeAddress: (id) => set((state) => ({ addresses: state.addresses.filter((a) => a.id !== id) })),
      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
        })),
      addOrder: (o) => set((state) => ({ orders: [o, ...state.orders] })),
      pushRecentSearch: (q) =>
        set((state) => ({
          recentSearches: [q, ...state.recentSearches.filter((s) => s.toLowerCase() !== q.toLowerCase())].slice(0, 6),
        })),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    { name: "nandini-user-v1" }
  )
);
