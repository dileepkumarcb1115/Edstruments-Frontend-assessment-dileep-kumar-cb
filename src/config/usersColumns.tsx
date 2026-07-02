import { Box, Chip } from "@mui/material";
import type { ColumnDefinition } from "../types";
import type { User } from "../data/users";

export const usersColumns: ColumnDefinition<User>[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  {
    key: "status",
    label: "Status",
    render: (user) => (
      <Chip
        label={user.status}
        color={user.status === "Active" ? "success" : "default"}
        size="small"
      />
    ),
  },
  { key: "createdAt", label: "Created At" },
  {
    key: "isVerified",
    label: "Verified",
    render: (user) => (
      <Chip
        label={user.isVerified ? "Yes" : "No"}
        color={user.isVerified ? "success" : "error"}
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    key: "permissions",
    label: "Permissions",
    sortAccessor: (user) => user.permissions.length,
    render: (user) => (
      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
        {user.permissions.map((permission) => (
          <Chip key={permission} label={permission} size="small" variant="outlined" />
        ))}
      </Box>
    ),
  },
];
