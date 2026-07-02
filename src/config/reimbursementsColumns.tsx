import { Box, Chip } from "@mui/material";
import type { ColumnDefinition } from "../types";
import type { Reimbursement } from "../data/reimbursements";

const STATUS_COLOR: Record<Reimbursement["status"], "success" | "warning" | "error"> = {
  Approved: "success",
  Pending: "warning",
  Rejected: "error",
};

export const reimbursementsColumns: ColumnDefinition<Reimbursement>[] = [
  { key: "employeeName", label: "Employee" },
  { key: "category", label: "Category" },
  {
    key: "amount",
    label: "Amount",
    align: "right",
    render: (reimbursement) => `$${reimbursement.amount.toLocaleString()}`,
  },
  {
    key: "status",
    label: "Status",
    render: (reimbursement) => (
      <Chip label={reimbursement.status} color={STATUS_COLOR[reimbursement.status]} size="small" />
    ),
  },
  { key: "submittedOn", label: "Submitted On" },
  {
    key: "isUrgent",
    label: "Urgent",
    render: (reimbursement) =>
      reimbursement.isUrgent ? <Chip label="Urgent" color="error" size="small" variant="outlined" /> : "",
  },
  { key: "approver.name", label: "Approver" },
  { key: "approver.department", label: "Department" },
  {
    key: "expenseTypes",
    label: "Expense Types",
    sortAccessor: (reimbursement) => reimbursement.expenseTypes.length,
    render: (reimbursement) => (
      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
        {reimbursement.expenseTypes.map((type) => (
          <Chip key={type} label={type} size="small" variant="outlined" />
        ))}
      </Box>
    ),
  },
];
