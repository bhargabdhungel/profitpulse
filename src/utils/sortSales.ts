import { type Sale, SortBy, SortOrder } from "@/app/types";

export function sortSales(sales: Sale[], sortBy: SortBy, sortOrder: SortOrder) {
  return [...sales].sort((a, b) => {
    const modifier = sortOrder === SortOrder.ASCENDING ? 1 : -1;
    switch (sortBy) {
      case SortBy.DATE:
        return (
          modifier *
          (new Date(b.purchase_date).getTime() -
            new Date(a.purchase_date).getTime())
        );
      case SortBy.REWARDS:
        return modifier * (b.reward_points - a.reward_points);
      case SortBy.SALES:
        return modifier * (b.sale_amount - a.sale_amount);
      case SortBy.BRAND:
        return modifier * a.brand.localeCompare(b.brand);
      default:
        return 0;
    }
  });
}
