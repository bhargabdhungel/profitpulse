import { type Sale, type SelectOption } from "@/app/types";
import { type DateRange } from "react-day-picker";

export function filterSales(
  sales: Sale[],
  searchTerm: string,
  dateRange: DateRange | undefined,
  selectedOption: SelectOption | undefined,
  groupByBrand: boolean,
) {
  const filteredSales = sales.filter((sale) => {
    const searchTermMatch = searchTerm
      ? sale.brand.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const selectedOptionMatch = selectedOption
      ? selectedOption.value === "all"
        ? true
        : sale.brand.toLowerCase().includes(selectedOption.value.toLowerCase())
      : true;

    const dateRangeMatch =
      dateRange?.from && dateRange?.to
        ? new Date(sale.purchaseDate) >= dateRange.from &&
          new Date(sale.purchaseDate) <= dateRange.to
        : true;

    return searchTermMatch && selectedOptionMatch && dateRangeMatch;
  });

  if (groupByBrand) {
    return filteredSales.reduce((acc: Sale[], sale) => {
      const existingGroup = acc.find((group) => group.brand === sale.brand);
      if (existingGroup) {
        existingGroup.totalSales += sale.totalSales;
        existingGroup.rewardPoints += sale.rewardPoints;
        if (!existingGroup.startDate)
          existingGroup.startDate = sale.purchaseDate;
        if (!existingGroup.endDate) existingGroup.endDate = sale.purchaseDate;
        if (new Date(existingGroup.startDate) > new Date(sale.purchaseDate))
          existingGroup.startDate = sale.purchaseDate;
        if (new Date(existingGroup.endDate) < new Date(sale.purchaseDate))
          existingGroup.endDate = sale.purchaseDate;
      } else {
        acc.push({
          ...sale,
          totalSales: sale.totalSales,
          rewardPoints: sale.rewardPoints,
          startDate: sale.purchaseDate,
          endDate: sale.purchaseDate,
        });
      }
      return acc;
    }, []);
  }
  return filteredSales;
}
