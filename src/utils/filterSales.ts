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
        ? new Date(sale.purchase_date) >= dateRange.from &&
          new Date(sale.purchase_date) <= dateRange.to
        : true;

    return searchTermMatch && selectedOptionMatch && dateRangeMatch;
  });

  if (groupByBrand) {
    return filteredSales.reduce((acc: Sale[], sale) => {
      const existingGroup = acc.find((group) => group.brand === sale.brand);
      if (existingGroup) {
        existingGroup.sale_amount += sale.sale_amount;
        existingGroup.reward_points += sale.reward_points;
        if (!existingGroup.startDate)
          existingGroup.startDate = sale.purchase_date;
        if (!existingGroup.endDate) existingGroup.endDate = sale.purchase_date;
        if (new Date(existingGroup.startDate) > new Date(sale.purchase_date))
          existingGroup.startDate = sale.purchase_date;
        if (new Date(existingGroup.endDate) < new Date(sale.purchase_date))
          existingGroup.endDate = sale.purchase_date;
      } else {
        acc.push({
          ...sale,
          sale_amount: sale.sale_amount,
          reward_points: sale.reward_points,
          startDate: sale.purchase_date,
          endDate: sale.purchase_date,
        });
      }
      return acc;
    }, []);
  }
  return filteredSales;
}
