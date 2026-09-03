export function formatINR(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

export function discountPercent(mrp: number, price: number): number {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
