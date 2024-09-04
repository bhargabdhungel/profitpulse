import {
  type Sale,
  type SelectOption,
  type Session,
  SortBy,
  SortOrder,
  type User,
} from "@/app/types";
import { filterSales } from "@/utils/filterSales";
import { getOptions } from "@/utils/getBrandOptions";
import { getUserData } from "@/utils/getUserData";
import { sortSales } from "@/utils/sortSales";
import { type DateRange } from "react-day-picker";
import { atom, selector } from "recoil";

export const sessionAtom = atom<Session>({
  key: "sessionAtom",
  default: {
    email: "johndoe@gmail.com",
    password: "password",
    user_data: {
      name: "John Doe",
      image: "https://cdn-icons-png.flaticon.com/512/3607/3607444.png",
      designation: "Affiliate Marketer",
    },
  },
});

export const userInfoAtom = selector<{ user: User; salesCount: number }>({
  key: "userInfoAtom",
  get: ({ get }) => {
    const session = get(sessionAtom);
    const sales = get(salesAtom);
    const selectedOption = get(selectedOptionAtom);
    return getUserData(session, sales, selectedOption);
  },
});

export const searchTermAtom = atom<string>({
  key: "searchTermAtom",
  default: "",
});

export const sortByAtom = atom<SortBy>({
  key: "sortByAtom",
  default: SortBy.DATE,
});

export const sortOrderAtom = atom<SortOrder>({
  key: "sortOrderAtom",
  default: SortOrder.DESCENDING,
});

export const dateRangeAtom = atom<DateRange | undefined>({
  key: "dateRangeAtom",
  default: undefined,
});

export const groupByBrandAtom = atom<boolean>({
  key: "groupByBrandAtom",
  default: false,
});

export const selectedOptionAtom = atom<SelectOption | undefined>({
  key: "selectedOptionAtom",
  default: {
    value: "all",
    label: "all",
  },
});

export const salesAtom = atom<Sale[]>({
  key: "salesAtom",
  default: [],
});

// this depends on salesAtom
export const uniqueBrandsOptionsAtom = selector<SelectOption[]>({
  key: "uniqueBrandsOptionsAtom",
  get: ({ get }) => {
    const sales = get(salesAtom);
    return getOptions(sales);
  },
});

// this depends on salesAtom
export const filteredAndSortedSalesAtom = selector<Sale[]>({
  key: "filteredAndSortedSalesAtom",
  get: ({ get }) => {
    const sales = get(salesAtom);
    const sortBy = get(sortByAtom);
    const sortOrder = get(sortOrderAtom);
    const searchTerm = get(searchTermAtom);
    const dateRange = get(dateRangeAtom);
    const selectedOption = get(selectedOptionAtom);
    const groupByBrand = get(groupByBrandAtom);
    const filteredSales = filterSales(
      sales,
      searchTerm,
      dateRange,
      selectedOption,
      groupByBrand,
    );
    const sortedSales = sortSales(filteredSales, sortBy, sortOrder);
    return sortedSales;
  },
});

export const selectedSaleAtom = atom<Sale | undefined>({
  key: "selectedSaleAtom",
  default: undefined,
});
