import { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import type { ColumnDefinition } from "../../types";
import { getNestedValue } from "../../utils/objectPath";

type SortDirection = "asc" | "desc";

interface DataTableProps<T> {
  data: T[];
  totalCount: number;
  columns: ColumnDefinition<T>[];
  getRowId: (record: T) => string | number;
}

// Nulls always sort to the end regardless of sort direction, so reversing
// the direction never buries missing values in the middle of the table.
const compareValues = (
  a: string | number | boolean | null,
  b: string | number | boolean | null,
): number => {
  if (a === b) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
};

export function DataTable<T>({ data, totalCount, columns, getRowId }: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const column = columns.find((c) => c.key === sortKey);
    const accessor =
      column?.sortAccessor ??
      ((record: T) => getNestedValue(record, sortKey) as string | number | boolean | null);
    const sorted = [...data].sort((a, b) => compareValues(accessor(a), accessor(b)));
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [data, sortKey, sortDirection, columns]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing <strong>{data.length}</strong> of <strong>{totalCount}</strong> records
        </Typography>
      </Box>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} align={column.align}>
                  <TableSortLabel
                    active={sortKey === column.key}
                    direction={sortKey === column.key ? sortDirection : "asc"}
                    onClick={() => handleSort(column.key)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No results found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((record) => (
                <TableRow key={getRowId(record)} hover>
                  {columns.map((column) => (
                    <TableCell key={column.key} align={column.align}>
                      {column.render
                        ? column.render(record)
                        : String(getNestedValue(record, column.key) ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
