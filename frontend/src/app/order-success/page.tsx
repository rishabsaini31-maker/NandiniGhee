import type { Metadata } from "next";
import { OrderSuccessView } from "@/components/checkout/OrderSuccessView";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Thank you for choosing NANDINI. Your order is confirmed.",
  robots: { index: false },
};

export default function OrderSuccessPage() {
  return <OrderSuccessView />;
}
