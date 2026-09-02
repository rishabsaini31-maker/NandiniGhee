"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** Returns false during SSR/hydration, true after mount — without setState-in-effect. */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
