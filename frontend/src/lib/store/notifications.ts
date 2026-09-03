import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppNotification } from "@/lib/types";
import { INITIAL_NOTIFICATIONS } from "@/lib/data/content";

interface NotificationState {
  notifications: AppNotification[];
  push: (n: Omit<AppNotification, "id" | "timestamp" | "read">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
  unreadCount: () => number;
}

export const useNotifications = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: INITIAL_NOTIFICATIONS,
      push: (n) =>
        set((state) => ({
          notifications: [
            { ...n, id: `n${Date.now()}`, timestamp: "Just now", read: false },
            ...state.notifications,
          ],
        })),
      markRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      clearAll: () => set({ notifications: [] }),
      unreadCount: () => get().notifications.filter((n) => !n.read).length,
    }),
    { name: "nandini-notifications-v1" }
  )
);
