"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SortBy, SortOrder } from "../types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DatePickerWithRange } from "../_components/date-range";
import { CustomSelect } from "../_components/selector";
import CustomSwitch from "../_components/switch";
import {
  filteredAndSortedSalesAtom,
  groupByBrandAtom,
  searchTermAtom,
  selectedSaleAtom,
  sortByAtom,
  sortOrderAtom,
} from "@/store";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);
  return (
    <div className="relative max-w-sm flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      <Input
        className="w-full rounded-full border-gray-600 bg-gray-700 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
        placeholder="Search brands..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

function SortSelect() {
  const [sortBy, setSortBy] = useRecoilState(sortByAtom);
  const groupByBrand = useRecoilValue(groupByBrandAtom);
  return (
    <Select
      onValueChange={(value) => setSortBy(value as SortBy)}
      value={sortBy}
    >
      <SelectTrigger className="w-[180px] rounded-full border-gray-600 bg-gray-700 text-sm text-white focus:ring-2 focus:ring-purple-500">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="border-gray-700 bg-gray-800 text-white">
        {!groupByBrand && <SelectItem value="date">Sort by Date</SelectItem>}
        <SelectItem value="rewards">Sort by Rewards</SelectItem>
        <SelectItem value="sales">Sort by Sales</SelectItem>
        <SelectItem value="brand">Sort by Brand</SelectItem>
      </SelectContent>
    </Select>
  );
}

function TableHeader() {
  const [sortBy, setSortBy] = useRecoilState(sortByAtom);
  const [sortOrder, setSortOrder] = useRecoilState(sortOrderAtom);

  const handleSort = (column: SortBy) => {
    if (sortBy === column) {
      setSortOrder(
        sortOrder === SortOrder.ASCENDING
          ? SortOrder.DESCENDING
          : SortOrder.ASCENDING,
      );
    } else {
      setSortBy(column);
      setSortOrder(SortOrder.DESCENDING);
    }
  };

  const headers = [
    { key: SortBy.BRAND, label: "Brand" },
    { key: SortBy.SALES, label: "Sales Value" },
    { key: SortBy.DATE, label: "Purchase Date" },
    { key: SortBy.REWARDS, label: "Reward Points" },
  ];

  return (
    <thead className="bg-gray-750">
      <tr>
        {headers.map(({ key, label }) => (
          <th
            key={key}
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
          >
            <button
              className="flex items-center"
              onClick={() => handleSort(key)}
            >
              {label}
              {sortBy === key &&
                (sortOrder === SortOrder.ASCENDING ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                ))}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody({
  startIndex,
  endIndex,
}: {
  startIndex: number;
  endIndex: number;
}) {
  const groupByBrand = useRecoilValue(groupByBrandAtom);
  const sales = useRecoilValue(filteredAndSortedSalesAtom);
  const setSelectedSale = useSetRecoilState(selectedSaleAtom);
  const router = useRouter();
  return (
    <tbody className="divide-y divide-gray-700">
      {sales.slice(startIndex, endIndex).map((sale) => (
        <tr
          key={sale.id}
          className="cursor-pointer transition-colors duration-200 hover:bg-gray-700"
          onClick={async () => {
            setSelectedSale(sale);
            router.push(`/description`);
          }}
        >
          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-blue-300">
            {sale.brand}
          </td>
          <td className="whitespace-nowrap px-6 py-4 text-sm text-green-400">
            ${sale.sale_amount.toLocaleString()}
          </td>
          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
            {groupByBrand
              ? new Date(sale.startDate!).toLocaleDateString() +
                " - " +
                new Date(sale.endDate!).toLocaleDateString()
              : new Date(sale.purchase_date).toLocaleDateString()}
          </td>
          <td className="whitespace-nowrap px-6 py-4 text-sm text-yellow-400">
            {sale.reward_points}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function TableControls() {
  return (
    <div className="bg-gray-750 p-4">
      <div className="mb-4 flex items-center justify-between">
        <SearchInput />
        <DatePickerWithRange />
        <CustomSwitch />
        <CustomSelect placeholder="Select a brand" />
        <SortSelect />
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-700 bg-gray-800 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-400">
            Showing page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex items-center gap-2 -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="icon"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            {[...Array(totalPages).keys()].map((page) => (
              <Button
                key={page + 1}
                onClick={() => onPageChange(page + 1)}
                variant={currentPage === page + 1 ? "default" : "outline"}
                size="sm"
              >
                {page + 1}
              </Button>
            ))}
            <Button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              size="icon"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export function SalesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sales = useRecoilValue(filteredAndSortedSalesAtom);
  const totalPages = Math.ceil(sales.length / itemsPerPage);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return (
    <Card className="overflow-hidden border-none bg-gray-800 shadow-xl">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
          Sales History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <TableControls />
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <TableBody startIndex={startIndex} endIndex={endIndex} />
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
}
