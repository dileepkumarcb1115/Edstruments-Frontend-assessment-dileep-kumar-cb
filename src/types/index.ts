import type { ReactNode } from "react";

export type FieldType =
  | "text"
  | "number"
  | "date"
  | "amount"
  | "select"
  | "multiselect"
  | "boolean";

export type TextOperator =
  | "equals"
  | "contains"
  | "startsWith"
  | "endsWith"
  | "doesNotContain";
export type NumberOperator =
  | "equals"
  | "greaterThan"
  | "lessThan"
  | "greaterThanOrEqual"
  | "lessThanOrEqual";
export type RangeOperator = "between";
export type SelectOperator = "is" | "isNot";
export type MultiSelectOperator = "in" | "notIn";
export type BooleanOperator = "is";

export type FilterOperator =
  | TextOperator
  | NumberOperator
  | RangeOperator
  | SelectOperator
  | MultiSelectOperator
  | BooleanOperator;

export interface FilterFieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
}

export interface RangeValue {
  min: string;
  max: string;
}

export type FilterValue = string | string[] | boolean | RangeValue | null;

export interface FilterCondition {
  id: string;
  field: string;
  operator: FilterOperator | "";
  value: FilterValue;
}

export interface ColumnDefinition<T> {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (record: T) => ReactNode;
  sortAccessor?: (record: T) => string | number | boolean | null;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string;
  isActive: boolean;
  skills: string[];
  address: {
    city: string;
    state: string;
    country: string;
  };
  projects: number;
  lastReview: string;
  performanceRating: number;
}
