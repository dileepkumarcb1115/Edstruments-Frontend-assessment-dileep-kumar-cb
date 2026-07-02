import type { FieldType, FilterOperator } from "../types";

export const operatorsByType: Record<
  FieldType,
  { value: FilterOperator; label: string }[]
> = {
  text: [
    { value: "contains", label: "Contains" },
    { value: "equals", label: "Equals" },
    { value: "startsWith", label: "Starts With" },
    { value: "endsWith", label: "Ends With" },
    { value: "doesNotContain", label: "Does Not Contain" },
  ],
  number: [
    { value: "equals", label: "Equals" },
    { value: "greaterThan", label: "Greater Than" },
    { value: "lessThan", label: "Less Than" },
    { value: "greaterThanOrEqual", label: "Greater Than or Equal" },
    { value: "lessThanOrEqual", label: "Less Than or Equal" },
  ],
  date: [{ value: "between", label: "Between" }],
  amount: [{ value: "between", label: "Between" }],
  select: [
    { value: "is", label: "Is" },
    { value: "isNot", label: "Is Not" },
  ],
  multiselect: [
    { value: "in", label: "In" },
    { value: "notIn", label: "Not In" },
  ],
  boolean: [{ value: "is", label: "Is" }],
};
