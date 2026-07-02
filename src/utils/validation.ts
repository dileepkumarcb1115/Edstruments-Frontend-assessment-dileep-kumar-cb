import type { RangeValue } from "../types";

export const getAmountRangeError = (range: RangeValue): string | null => {
  if (range.min === "" || range.max === "") return null;
  if (Number.isNaN(Number(range.min)) || Number.isNaN(Number(range.max))) {
    return "Enter valid numbers";
  }
  return Number(range.min) > Number(range.max)
    ? "Min must be less than or equal to Max"
    : null;
};

export const getDateRangeError = (range: RangeValue): string | null => {
  if (!range.min || !range.max) return null;
  return new Date(range.min).getTime() > new Date(range.max).getTime()
    ? "From date must be before To date"
    : null;
};

export const getNumberInputError = (value: string): string | null => {
  if (value === "") return null;
  return Number.isNaN(Number(value)) ? "Enter a valid number" : null;
};
