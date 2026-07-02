import type {
  BooleanOperator,
  FieldType,
  FilterCondition,
  FilterFieldDefinition,
  FilterOperator,
  FilterValue,
  MultiSelectOperator,
  NumberOperator,
  RangeValue,
  SelectOperator,
  TextOperator,
} from "../types";
import { getNestedValue } from "./objectPath";

const toComparableString = (value: unknown): string =>
  (value ?? "").toString().toLowerCase();

const isRangeValue = (value: FilterValue): value is RangeValue =>
  typeof value === "object" && value !== null && "min" in value && "max" in value;

const evaluateText = (
  value: unknown,
  operator: TextOperator,
  filterValue: string,
): boolean => {
  const val = toComparableString(value);
  const fVal = filterValue.trim().toLowerCase();
  switch (operator) {
    case "equals":
      return val === fVal;
    case "contains":
      return val.includes(fVal);
    case "startsWith":
      return val.startsWith(fVal);
    case "endsWith":
      return val.endsWith(fVal);
    case "doesNotContain":
      return !val.includes(fVal);
  }
};

const evaluateNumber = (
  value: unknown,
  operator: NumberOperator,
  filterValue: string,
): boolean => {
  const num = Number(value);
  const fNum = Number(filterValue);
  if (Number.isNaN(num) || Number.isNaN(fNum)) return false;
  switch (operator) {
    case "equals":
      return num === fNum;
    case "greaterThan":
      return num > fNum;
    case "lessThan":
      return num < fNum;
    case "greaterThanOrEqual":
      return num >= fNum;
    case "lessThanOrEqual":
      return num <= fNum;
  }
};

const evaluateNumberRange = (value: unknown, range: RangeValue): boolean => {
  const num = Number(value);
  if (Number.isNaN(num)) return false;
  const min = range.min !== "" ? Number(range.min) : -Infinity;
  const max = range.max !== "" ? Number(range.max) : Infinity;
  return num >= min && num <= max;
};

// "To" dates are entered without a time, so treat them as inclusive of the whole day
// (otherwise a "To: 2024-01-15" bound would exclude records timestamped that same day).
const END_OF_DAY_MS = 24 * 60 * 60 * 1000 - 1;

const evaluateDateRange = (value: unknown, range: RangeValue): boolean => {
  const date = new Date(String(value)).getTime();
  if (Number.isNaN(date)) return false;
  const min = range.min ? new Date(range.min).getTime() : -Infinity;
  const max = range.max ? new Date(range.max).getTime() + END_OF_DAY_MS : Infinity;
  return date >= min && date <= max;
};

const evaluateSelect = (
  value: unknown,
  operator: SelectOperator,
  filterValue: string,
): boolean => {
  const val = toComparableString(value);
  const fVal = filterValue.toLowerCase();
  return operator === "is" ? val === fVal : val !== fVal;
};

const evaluateMultiSelect = (
  value: unknown,
  operator: MultiSelectOperator,
  filterValue: string[],
): boolean => {
  const values = Array.isArray(value) ? value.map(toComparableString) : [];
  const selected = filterValue.map((v) => v.toLowerCase());
  const hasOverlap = selected.some((sv) => values.includes(sv));
  return operator === "in" ? hasOverlap : !hasOverlap;
};

const evaluateBoolean = (
  value: unknown,
  _operator: BooleanOperator,
  filterValue: boolean,
): boolean => value === filterValue;

const evaluateCondition = (
  value: unknown,
  fieldType: FieldType,
  operator: FilterOperator,
  filterValue: FilterValue,
): boolean => {
  switch (fieldType) {
    case "text":
      return evaluateText(value, operator as TextOperator, filterValue as string);
    case "number":
      return evaluateNumber(value, operator as NumberOperator, filterValue as string);
    case "date":
      return isRangeValue(filterValue) ? evaluateDateRange(value, filterValue) : true;
    case "amount":
      return isRangeValue(filterValue) ? evaluateNumberRange(value, filterValue) : true;
    case "select":
      return evaluateSelect(value, operator as SelectOperator, filterValue as string);
    case "multiselect":
      return evaluateMultiSelect(
        value,
        operator as MultiSelectOperator,
        filterValue as string[],
      );
    case "boolean":
      return evaluateBoolean(value, operator as BooleanOperator, filterValue as boolean);
    default:
      return true;
  }
};

const isFilterValueEmpty = (value: FilterValue): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (isRangeValue(value)) return value.min === "" && value.max === "";
  return false;
};

/**
 * Filters `data` against `filters`, resolving each condition's evaluation
 * strategy from `fields` (its declared FieldType) rather than the field key
 * itself, so the same function works unmodified for any table schema.
 * Conditions on the same field are OR'd together; distinct fields are AND'd.
 */
export const applyFilters = <T extends object>(
  data: T[],
  filters: FilterCondition[],
  fields: FilterFieldDefinition[],
): T[] => {
  const activeFilters = filters.filter(
    (filter) => filter.field && filter.operator && !isFilterValueEmpty(filter.value),
  );
  if (!activeFilters.length) return data;

  const fieldTypeByKey = new Map(fields.map((field) => [field.key, field.type]));

  const groupedByField = new Map<string, FilterCondition[]>();
  for (const filter of activeFilters) {
    const group = groupedByField.get(filter.field) ?? [];
    group.push(filter);
    groupedByField.set(filter.field, group);
  }

  return data.filter((record) =>
    Array.from(groupedByField.entries()).every(([fieldKey, group]) => {
      const fieldType = fieldTypeByKey.get(fieldKey);
      if (!fieldType) return true;
      const value = getNestedValue(record, fieldKey);
      return group.some((filter) =>
        evaluateCondition(value, fieldType, filter.operator as FilterOperator, filter.value),
      );
    }),
  );
};

export const generateId = (): string => Math.random().toString(36).slice(2, 11);
