import React from "react";
import { groupByBrandAtom } from "@/store";
import { useRecoilState } from "recoil";
import { cn } from "@/lib/utils";

export default function CustomToggle() {
  const [isGrouped, setIsGrouped] = useRecoilState(groupByBrandAtom);

  return (
    <button
      onClick={() => setIsGrouped(!isGrouped)}
      className={cn(
        "w-[180px] rounded-full border border-gray-600 bg-gray-700 p-2 text-sm text-white transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500",
        isGrouped ? "bg-purple-500" : "hover:bg-gray-600",
      )}
    >
      {isGrouped ? "Grouped by Brand" : "Group by Brand"}
    </button>
  );
}
