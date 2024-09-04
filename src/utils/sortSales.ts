import { type Sale, SortBy, SortOrder } from "@/app/types";

export function sortSales(sales: Sale[], sortBy: SortBy, sortOrder: SortOrder) {
  return [...sales].sort((a, b) => {
    const modifier = sortOrder === SortOrder.ASCENDING ? 1 : -1;
    switch (sortBy) {
      case SortBy.DATE:
        return (
          modifier *
          (new Date(b.purchaseDate).getTime() -
            new Date(a.purchaseDate).getTime())
        );
      case SortBy.REWARDS:
        return modifier * (b.rewardPoints - a.rewardPoints);
      case SortBy.SALES:
        return modifier * (b.totalSales - a.totalSales);
      case SortBy.BRAND:
        return modifier * a.brand.localeCompare(b.brand);
      default:
        return 0;
    }
  });
}
