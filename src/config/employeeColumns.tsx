import { Box, Chip } from "@mui/material";
import type { ColumnDefinition, Employee } from "../types";

export const employeeColumns: ColumnDefinition<Employee>[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "department", label: "Department" },
  { key: "role", label: "Role" },
  {
    key: "salary",
    label: "Salary",
    align: "right",
    render: (employee) => `$${employee.salary.toLocaleString()}`,
  },
  { key: "joinDate", label: "Join Date" },
  {
    key: "isActive",
    label: "Status",
    render: (employee) => (
      <Chip
        label={employee.isActive ? "Active" : "Inactive"}
        color={employee.isActive ? "success" : "error"}
        size="small"
      />
    ),
  },
  {
    key: "skills",
    label: "Skills",
    sortAccessor: (employee) => employee.skills.length,
    render: (employee) => (
      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
        {employee.skills.slice(0, 2).map((skill) => (
          <Chip key={skill} label={skill} size="small" variant="outlined" />
        ))}
        {employee.skills.length > 2 && (
          <Chip label={`+${employee.skills.length - 2}`} size="small" />
        )}
      </Box>
    ),
  },
  { key: "address.city", label: "City" },
  { key: "projects", label: "Projects" },
  { key: "performanceRating", label: "Rating" },
];
