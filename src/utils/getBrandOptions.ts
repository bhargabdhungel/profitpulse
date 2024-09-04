import { type Sale } from "@/app/types";

export const getOptions = (sales: Sale[] | undefined) => {
  if (!sales) return [];
  const uniqueOptions = [...new Set(sales.map((sale) => sale.brand))].map(
    (brand) => ({
      value: brand,
      label: brand,
    }),
  );
  return [{ value: "all", label: "all" }, ...uniqueOptions];
};
