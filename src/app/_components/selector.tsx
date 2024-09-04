import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectedOptionAtom, uniqueBrandsOptionsAtom } from "@/store";
import { useRecoilState, useRecoilValue } from "recoil";

export function CustomSelect({ placeholder }: { placeholder: string }) {
  const [selectedOption, setSelectedOption] =
    useRecoilState(selectedOptionAtom);
  const options = useRecoilValue(uniqueBrandsOptionsAtom);

  return (
    <Select
      value={selectedOption?.value}
      onValueChange={(value) => {
        const selectedOption = options.find((option) => option.value === value);
        if (selectedOption) setSelectedOption(selectedOption);
      }}
    >
      <SelectTrigger className="w-[180px] rounded-full border-gray-600 bg-gray-700 text-sm text-white focus:ring-2 focus:ring-purple-500">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="border-gray-700 bg-gray-800 text-white">
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
