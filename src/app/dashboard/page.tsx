"use client";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { api } from "@/trpc/react";
import { salesAtom } from "@/store";
import { DashboardHeader } from "./header";
import { StatCards } from "./stats";
import { SalesTable } from "./sales-table";
import { LoadingState } from "@/utils/components/Loading";
import { NoDataState } from "@/utils/components/NoData";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function EnhancedDashboard() {
  const setSales = useSetRecoilState(salesAtom);

  const { data: sales, isLoading } = api.info.get.useQuery(undefined, {
    staleTime: Infinity,
  });

  useEffect(() => {
    if (sales) setSales(sales);
  }, [sales, setSales]);

  if (isLoading) return <LoadingState />;
  if (!sales) return <NoDataState />;

  return (
    <ScrollArea className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 text-gray-100">
      <DashboardHeader />
      <StatCards />
      <SalesTable />
    </ScrollArea>
  );
}
