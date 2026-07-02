import { Box, Button, Typography, Paper } from "@mui/material";
import { Plus, Trash2 } from "lucide-react";
import type { FilterCondition, FilterFieldDefinition } from "../../types";
import { FilterRow } from "./FilterRow";
import { generateId } from "../../utils/filterUtils";

interface FilterPanelProps {
  filters: FilterCondition[];
  fields: FilterFieldDefinition[];
  onChange: (filters: FilterCondition[]) => void;
}

export const FilterPanel = ({
  filters,
  fields,
  onChange,
}: FilterPanelProps) => {
  const addFilter = () => {
    const newFilter: FilterCondition = {
      id: generateId(),
      field: "",
      operator: "",
      value: null,
    };
    onChange([...filters, newFilter]);
  };

  const updateFilter = (updated: FilterCondition) => {
    onChange(filters.map((f) => (f.id === updated.id ? updated : f)));
  };

  const removeFilter = (id: string) => {
    onChange(filters.filter((f) => f.id !== id));
  };

  const clearAll = () => onChange([]);

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: filters.length ? 2.5 : 0,
        }}
      >
        <Typography variant="h6">Filters</Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Plus size={16} />}
            onClick={addFilter}
          >
            Add Filter
          </Button>
          {filters.length > 0 && (
            <Button
              variant="text"
              color="error"
              size="small"
              startIcon={<Trash2 size={16} />}
              onClick={clearAll}
            >
              Clear All
            </Button>
          )}
        </Box>
      </Box>

      {filters.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No filters applied. Click "Add Filter" to get started.
        </Typography>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {filters.map((filter) => (
          <FilterRow
            key={filter.id}
            filter={filter}
            fields={fields}
            onChange={updateFilter}
            onRemove={removeFilter}
          />
        ))}
      </Box>
    </Paper>
  );
};
