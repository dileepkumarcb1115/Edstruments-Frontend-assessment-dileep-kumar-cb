import type { FilterFieldDefinition } from "../types";

export const usersFilterFields: FilterFieldDefinition[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "email", label: "Email", type: "text" },
  {
    key: "role",
    label: "Role",
    type: "select",
    options: [
      { label: "Admin", value: "Admin" },
      { label: "Editor", value: "Editor" },
      { label: "Viewer", value: "Viewer" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
  { key: "createdAt", label: "Created At", type: "date" },
  { key: "isVerified", label: "Verified", type: "boolean" },
  {
    key: "permissions",
    label: "Permissions",
    type: "multiselect",
    options: [
      { label: "Read", value: "read" },
      { label: "Write", value: "write" },
      { label: "Delete", value: "delete" },
      { label: "Manage Users", value: "manage-users" },
    ],
  },
];
