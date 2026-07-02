import type {
  FilterCondition,
  FilterFieldDefinition,
  FilterOperator,
  RangeValue,
} from "../../types";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Switch,
  FormControlLabel,
  InputAdornment,
  type SelectChangeEvent,
} from "@mui/material";
import { Trash2 } from "lucide-react";
import { operatorsByType } from "../../config/filterOperators";
import {
  getAmountRangeError,
  getDateRangeError,
  getNumberInputError,
} from "../../utils/validation";

interface FilterRowProps {
  filter: FilterCondition;
  fields: FilterFieldDefinition[];
  onChange: (filter: FilterCondition) => void;
  onRemove: (id: string) => void;
}

const EMPTY_RANGE: RangeValue = { min: "", max: "" };

export const FilterRow = ({ filter, fields, onChange, onRemove }: FilterRowProps) => {
  const selectedField = fields.find((f) => f.key === filter.field);
  const operators = selectedField ? operatorsByType[selectedField.type] : [];

  const handleFieldChange = (event: SelectChangeEvent) => {
    const fieldKey = event.target.value;
    const field = fields.find((f) => f.key === fieldKey);
    const defaultOperator = field ? operatorsByType[field.type][0].value : "";
    onChange({
      ...filter,
      field: fieldKey,
      operator: defaultOperator as FilterOperator,
      value: null,
    });
  };

  const handleOperatorChange = (event: SelectChangeEvent) => {
    onChange({ ...filter, operator: event.target.value as FilterOperator, value: null });
  };

  const renderValueInput = () => {
    if (!selectedField) return null;
    switch (selectedField.type) {
      case "text": {
        return (
          <TextField
            size="small"
            type="text"
            placeholder="Enter value"
            value={(filter.value as string) ?? ""}
            onChange={(e) => onChange({ ...filter, value: e.target.value })}
            sx={{ minWidth: 180 }}
          />
        );
      }
      case "number": {
        const value = (filter.value as string) ?? "";
        const error = getNumberInputError(value);
        return (
          <TextField
            size="small"
            type="number"
            placeholder="Enter value"
            value={value}
            error={Boolean(error)}
            helperText={error}
            onChange={(e) => onChange({ ...filter, value: e.target.value })}
            sx={{ minWidth: 180 }}
          />
        );
      }
      case "date": {
        const range = (filter.value as RangeValue) ?? EMPTY_RANGE;
        const error = getDateRangeError(range);
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              size="small"
              type="date"
              label="From"
              slotProps={{ inputLabel: { shrink: true } }}
              value={range.min}
              onChange={(e) => onChange({ ...filter, value: { ...range, min: e.target.value } })}
            />
            <TextField
              size="small"
              type="date"
              label="To"
              slotProps={{ inputLabel: { shrink: true } }}
              value={range.max}
              error={Boolean(error)}
              helperText={error}
              onChange={(e) => onChange({ ...filter, value: { ...range, max: e.target.value } })}
            />
          </Box>
        );
      }
      case "amount": {
        const range = (filter.value as RangeValue) ?? EMPTY_RANGE;
        const error = getAmountRangeError(range);
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              size="small"
              type="number"
              label="Min"
              placeholder="0"
              value={range.min}
              onChange={(e) => onChange({ ...filter, value: { ...range, min: e.target.value } })}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              sx={{ width: 140 }}
            />
            <TextField
              size="small"
              type="number"
              label="Max"
              placeholder="999,999"
              value={range.max}
              error={Boolean(error)}
              helperText={error}
              onChange={(e) => onChange({ ...filter, value: { ...range, max: e.target.value } })}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              sx={{ width: 140 }}
            />
          </Box>
        );
      }
      case "select": {
        return (
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Value</InputLabel>
            <Select
              label="Value"
              value={(filter.value as string) ?? ""}
              onChange={(e) => onChange({ ...filter, value: e.target.value })}
            >
              {selectedField.options?.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
      case "multiselect": {
        const selected = (filter.value as string[]) ?? [];
        return (
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Values</InputLabel>
            <Select
              multiple
              label="Values"
              value={selected}
              onChange={(e) =>
                onChange({
                  ...filter,
                  value: typeof e.target.value === "string" ? [e.target.value] : e.target.value,
                })
              }
              renderValue={(value) => value.join(", ")}
            >
              {selectedField.options?.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  <Checkbox checked={selected.includes(opt.value)} />
                  <ListItemText primary={opt.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
      case "boolean": {
        const checked = filter.value === true;
        return (
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={(e) => onChange({ ...filter, value: e.target.checked })}
              />
            }
            label={checked ? "True" : "False"}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
        p: 1.5,
        borderRadius: 2,
        bgcolor: "#f7f8fb",
      }}
    >
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Field</InputLabel>
        <Select label="Field" value={filter.field} onChange={handleFieldChange}>
          {fields.map((f) => (
            <MenuItem key={f.key} value={f.key}>
              {f.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedField && (
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Operator</InputLabel>
          <Select label="Operator" value={filter.operator} onChange={handleOperatorChange}>
            {operators.map((op) => (
              <MenuItem key={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {renderValueInput()}

      <IconButton onClick={() => onRemove(filter.id)} color="error" size="small">
        <Trash2 size={18} />
      </IconButton>
    </Box>
  );
};
