import {
  type Sale,
  type SelectOption,
  type User,
  type Session,
} from "@/app/types";

export function getUserData(
  session: Session,
  sales: Sale[],
  selectedOption: SelectOption | undefined,
) {
  if (selectedOption && selectedOption?.value !== "all") {
    sales = sales.filter((sale) => sale.brand === selectedOption?.value);
  }
  const totalSales = sales.reduce((acc, sale) => acc + sale.totalSales, 0);
  const totalRewards = sales.reduce((acc, sale) => acc + sale.rewardPoints, 0);

  const user: User = {
    image: session.user_data.image,
    name: session.user_data.name,
    totalSales: totalSales,
    totalRewards: totalRewards,
  };
  const salesCount = sales.length;

  return { user, salesCount };
}
