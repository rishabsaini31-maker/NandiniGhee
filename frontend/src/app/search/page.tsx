import type { Metadata } from "next";
import { SearchView } from "@/components/search/SearchView";

export const metadata: Metadata = {
  title: "Search",
  description: "Search NANDINI GHEE products — ghee, almonds, cashews, hampers and more.",
  robots: { index: false },
};

export default function SearchPage() {
  return <SearchView />;
}
