import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import type { ColumnDefinition, FilterCondition, FilterFieldDefinition } from "../types";
import { FilterPanel } from "./filters/FilterPanel";
import { DataTable } from "./table/DataTable";
import { applyFilters } from "../utils/filterUtils";

interface TableExplorerProps<T> {
  data: T[];
  fields: FilterFieldDefinition[];
  columns: ColumnDefinition<T>[];
  getRowId: (record: T) => string | number;
}

/**
 * Composes the reusable filter + table primitives for one schema. Every
 * table in the app (Employees, Users, Transactions, Reimbursements) renders
 * through this same component with a different `fields`/`columns`/`data`
 * triple — none of FilterPanel, DataTable, or applyFilters know which table
 * they're serving.
 */
export function TableExplorer<T extends object>({ data, fields, columns, getRowId }: TableExplorerProps<T>) {
  const [filters, setFilters] = useState<FilterCondition[]>([]);

  const filteredData = useMemo(() => applyFilters(data, filters, fields), [data, filters, fields]);

  return (
    <Box>
      <FilterPanel filters={filters} fields={fields} onChange={setFilters} />
      <DataTable data={filteredData} totalCount={data.length} columns={columns} getRowId={getRowId} />
    </Box>
  );
}
